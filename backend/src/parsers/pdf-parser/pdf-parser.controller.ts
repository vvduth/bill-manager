/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Body,
  Controller,
  ParseFilePipeBuilder,
  Post,
  UnprocessableEntityException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { PdfParserService } from './pdf-parser.service';
import {
  PdfParserUploadResultDto,
  PdfParserUrlresultDto,
} from './dto/pdf-parser-result.dto';
import { PdfParserRequestDto } from './dto/pdf-parser-request.dto';
import { PdfNotParsedError } from './exceptions/exceptions';

const uploadSchema = {
  type: 'object',
  properties: {
    file: {
      type: 'string',
      format: 'binary',
    },
  },
};

const pdfPipe = new ParseFilePipeBuilder()
  .addFileTypeValidator({
    fileType: 'pdf',
  })
  .addMaxSizeValidator({
    maxSize: 1024 * 1024 * 5, // 5 MB
  })
  .build({
    fileIsRequired: true,
  });

@ApiSecurity('apiKey')
@ApiTags('parsers')
@Controller({ path: 'parsers/pdf', version: '1' })
export class PdfParsersController {
  constructor(private readonly pdfparserService: PdfParserService) {}
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: uploadSchema })
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async parsePdfFromUpload(
    @UploadedFile(pdfPipe) file: Express.Multer.File,
  ): Promise<PdfParserUploadResultDto> {
    try {
      const text = await this.pdfparserService.parsePdf(file.buffer);
      return {
        originalFileName: file.originalname,
        content: text,
      };
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  @Post('url')
  async parsePdfFromUrl(
    @Body() requestDto: PdfParserRequestDto,
  ): Promise<PdfParserUrlresultDto> {
    try {
      const file = await this.pdfparserService.loadPdfFromUrl(requestDto.url);
      const text = await this.pdfparserService.parsePdf(file);

      return {
        originalUrl: requestDto.url,
        content: text,
      };
    } catch (error) {
      if (error instanceof PdfNotParsedError) {
        throw new UnprocessableEntityException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }
}
