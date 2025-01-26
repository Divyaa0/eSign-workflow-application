import { Controller, Post, Body } from '@nestjs/common';
import { eSignTag } from 'src/entities/esignTag.entity';
import { ESignUsecase } from 'src/useCases/esign.usecase';
@Controller()
export class ESignController {
    constructor( private readonly ESignUsecase : ESignUsecase) { }

    @Post('submit')
    async submitForEsign(@Body() body: { pdfId: string}): Promise<void> {
        console.log("🚀 ~ ESignController ~ submitForEsign ~ body:", body)
        await this.ESignUsecase.submitForEsignUseCase(body)
    }

}