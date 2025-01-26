import path from "path";
import { Injectable } from '@nestjs/common';
import { IPDF } from "src/entities/pdf.entity";

@Injectable()
export class PDFUseCase
{

    async uploadPDFUseCase(file:IPDF)
    {
    const fileName = file.filename;
    const uniqueId = fileName.split('-')[0]; 
    console.log("🚀 ~ uniqueId:", uniqueId)
    return { message : `Congratulations! your file ${file.originalname} has been uploaded successfully` ,pdfId : uniqueId }; // Return unique ID to the user
    }

}
