import path from "path";
import { PDF } from "src/entities/pdf.entity";
import { Injectable } from '@nestjs/common';

@Injectable()
export class PDFUseCase
{

    async uploadPDFUseCase(file)
    {
    console.log("🚀 ~ file:", file)
    const fileName = file.filename;
    const uniqueId = fileName.split('-')[0]; // Extract unique ID from filename
    console.log("🚀 ~ uniqueId:", uniqueId)
    return { message : `Congratulations! your file ${file.originalName} has been uploaded successfully` ,pdfId : uniqueId }; // Return unique ID to the user

    }

}
