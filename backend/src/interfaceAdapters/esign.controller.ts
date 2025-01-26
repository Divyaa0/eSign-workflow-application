import { Controller, Post, Body,Get,Param } from '@nestjs/common';
import { ESignUsecase } from 'src/useCases/esign.usecase';
@Controller()
export class ESignController {
    constructor( private readonly ESignUsecase : ESignUsecase) { }

    // submit a request for e-signature
    @Post('submit')
    async submitForEsign(@Body() body: { pdfId: string}) {
        return this.ESignUsecase.submitForEsignUseCase(body)
    }
    
    //  fetch a template by its ID
    @Get(':templateId')
    async getTemplateById(@Param('templateId') templateId: string) {
        return this.ESignUsecase.getTemplateById(templateId)
    }

}