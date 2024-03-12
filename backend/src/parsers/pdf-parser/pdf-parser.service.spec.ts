/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { PdfParserService } from './pdf-parser.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

describe('PdfParserService', () => {
  let service: PdfParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PdfParserService],
      imports: [ConfigModule.forRoot(), HttpModule]
    }).compile();

    service = module.get<PdfParserService>(PdfParserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("postProcessedText", () => {
    it("should trim the lines and remove excess inner whitesoace to keep a maximum of 3", () => {
      const input = '       a            b                  c d         ';
      const expected = 'a   b   c d';
      const actual = service['postProcessText'](input)
      expect(actual).toEqual(expected);
    })

    it('should keep only one empty line if mulyiple lines are empty', ()  => {
      const input = 'a\n\n\nb\n\n\n\nc\nd';
      const expected = 'a\n\nb\n\nc\nd';
      const actual = service['postProcessText'](input)
      expect(actual).toEqual(expected);
    });

    describe('loadPdfFromUrl()', () => {
      it("should load the pdf from url and parse it", async () => {
        const url =
        'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
        const buffer = await service.loadPdfFromUrl(url);

        const expected = 'Dummy PDF file';
        const actual = await service.parsePdf(buffer)

        expect(actual).toEqual(expected)
      })

      it("should throw an error if the file extension is not pdf", async () => {
        const url =
        'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.jpg';
        
        await expect(service.loadPdfFromUrl(url)).rejects.toThrowError(
          'The file extension is not .pdf'
        )
      })

      it("should throw an error if the file does not have the pdf magic number", async () => {
        const url =
        'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.jpg';
        
        await expect(service.loadPdfFromUrl(url)).rejects.toThrowError(
          'The file extension is not .pdf'
        )
      })
    })

    
  })
});
