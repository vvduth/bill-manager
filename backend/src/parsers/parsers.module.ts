/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ParsersController } from './parsers.controller';
import { PdfParserService } from './pdf-parser/pdf-parser.service';
import { PdfParsersController } from './pdf-parser/pdf-parser.controller';
import { HttpModule } from '@nestjs/axios';


@Module({
    imports: [HttpModule] ,
    controllers: [ParsersController, PdfParsersController],
    providers: [PdfParserService]
})
export class ParsersModule {}
