import { Controller, Post, Body,Get,Param, Request } from '@nestjs/common';
import { request } from 'http';
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
    @Get('getTemplate/:templateId')
    async getTemplateById(@Param('templateId') templateId: string) {
        return this.ESignUsecase.getTemplateById(templateId)
    }

    // create document from template id
    @Get('createDocument/:templateId')
    async createDocumentFromTemplate(@Param('templateId') templateId: string)
    {
        return this.ESignUsecase.createDocumentFromTemplate(templateId);
    }
    //  webhook to get all events
    @Post('/webhook')
    async GetEventInfo(@Body () body)
    {
        console.log("🚀 ~ ESignController ~ GetEventInfo:")
        return this.ESignUsecase.getEventInfo(body);
    }
    //  create document
    @Post('createDocument')
    async createDocument(@Body() body)
    {
        return this.ESignUsecase.createDocument(body);
    }
}
