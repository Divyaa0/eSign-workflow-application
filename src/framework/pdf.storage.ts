import { BadRequestException, Injectable } from '@nestjs/common';

export class PDFStorage {
    // async saveFile(file: Express.Multer.File) {
    //     console.log("🚀 ~ PDFStorage ~ saveFile ~ file:", file)
    //     if (!file) {
    //         throw new BadRequestException('no file uploaded');
    //     }

    //     // validate file type
    //     const allowedMimeTypes = ['application/pdf'];
    //     if (!allowedMimeTypes.includes(file.mimetype)) {
    //         throw new BadRequestException('invalid file type');
    //     }

    //     return { message: 'File uploaded successfully', filePath: file.path };

    // }


    async saveFile() {
        console.log("🚀 ~ PDFStorage ~ saveFile ~ saveFile:")
        

    }
}