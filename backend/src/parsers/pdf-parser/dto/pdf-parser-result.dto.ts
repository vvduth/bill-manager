/* eslint-disable prettier/prettier */
import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { IsUrl } from "class-validator";


class UploadResultDto{
    @ApiProperty()
    originalFileName: string;
}
export class PdfParserResultDto{

    // @ApiProperty()
    // originalFileName: string

    @ApiProperty()
    content: string
}

class UrlResultDto {
    
    @ApiProperty()
    @IsUrl()
    originalUrl : string; 

}

export class PdfParserUploadResultDto extends IntersectionType(
    PdfParserResultDto, 
    UploadResultDto
) {

}

export class PdfParserUrlresultDto extends IntersectionType(
    PdfParserResultDto,
    UrlResultDto,
) {
    
}