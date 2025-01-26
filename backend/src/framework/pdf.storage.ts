import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';

@Injectable()

// PDFStorage class responsible for managing file operations,
export class PDFStorage {

   // Retrieves a PDF file by its ID and returns the file in base64 format
  async getFile(pdfId: string) : Promise<string> 
  {
    
    
        const uploadsDir = path.resolve('./uploadedFiles')
    
        const files = fs.readdirSync(uploadsDir);
    
        // Find file matching `*_name` format
        const file = files.find((filename) => {
          return filename.includes(`${pdfId}`)
        })
    
        const filePath = path.join(uploadsDir, file ? file : ''); // Full file path
        const pdfBuffer = fs.readFileSync(filePath);
        const base64File = pdfBuffer.toString('base64');

        return base64File
  }

}