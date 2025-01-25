import { PDF } from "src/entities/pdf.entity";
export class uploadPDFUseCase
{
    constructor(private readonly pdfRepository: PDF) {}
}