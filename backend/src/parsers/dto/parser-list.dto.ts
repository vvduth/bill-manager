/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";


export class ParsersListDto {

    @ApiProperty({type: [String]})
    availableParsers: string[]
}