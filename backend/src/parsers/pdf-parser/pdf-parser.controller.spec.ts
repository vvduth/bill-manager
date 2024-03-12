/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { PdfParsersController } from './pdf-parser.controller';
import { PdfParserService } from './pdf-parser.service';
import { ConfigModule } from '@nestjs/config';

describe('PdfParserController', () => {
  let controller: PdfParsersController;
  let service: PdfParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PdfParsersController],
      providers: [PdfParserService],
      imports: [ConfigModule.forRoot()]
    }).compile();

    controller = module.get<PdfParsersController>(PdfParsersController);
    service  = module.get<PdfParserService>(PdfParserService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
