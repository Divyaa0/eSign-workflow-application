import { Controller, Post, Body, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PDFUseCase } from 'src/useCases/pdf.usecase';
import { ParseFilePipe,  FileTypeValidator } from '@nestjs/common';
import { diskStorage } from 'multer';
@Controller()
export class PDFController {
    constructor(private PDFUseCase: PDFUseCase) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {     
        storage: diskStorage({
            destination: './uploadedFiles',
            filename: (req, file, callback) => {
                const originalName = file.originalname.replace(/\s/g, ''); // Remove spaces
                const uniqueSuffix = `${Date.now()}`;
                const customFileName = `${uniqueSuffix}-${originalName}`;

                callback(null, customFileName);
            }
        })
    }))
    async UploadPDF(@UploadedFile(new ParseFilePipe({
        validators: [
            new FileTypeValidator({ fileType: 'pdf' }),
        ]
    }),
    ) file: Express.Multer.File, @Body() body: any) {
        return this.PDFUseCase.uploadPDFUseCase(file)
    }
}