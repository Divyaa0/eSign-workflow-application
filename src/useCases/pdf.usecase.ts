import { PDF } from "src/entities/pdf.entity";
import { PDFRepository } from "./repositories/pdf.repository";
export class PDFUseCase
{
    constructor(private readonly pdfRepository: PDFRepository) {}

    async uploadPDFUseCase()
    {
     console.log("🚀 ~ file: --usecase")
    //  const answer = await this.pdfRepository.saveFile(file)   
    // const answer = await this.pdfRepository.saveFile()   

    //  console.log("🚀 ~ answer:", answer)
    }
}
