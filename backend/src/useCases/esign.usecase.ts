// import { eSignTag } from "src/entities/esignTag.entity"
import { HttpService } from "@nestjs/axios";
import { Injectable , Inject} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { IPDFRepository } from "./repositories/pdf.repository";
import { IESignConfig } from "./repositories/esign.repository";
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ESignUsecase {

  constructor(
    private readonly httpService: HttpService,
    @Inject('IPDFRepository') private readonly IPDFRepository:IPDFRepository,
    @Inject('IESignConfig') private readonly IESignConfig:IESignConfig

  ) { }

   // Submit for e-sign use case
  async submitForEsignUseCase(body) {

    const { pdfId } = body;
    const base64File = await this.IPDFRepository.getFile(pdfId);

    const  {config }= await this.IESignConfig.getTemplateCreationUrl(base64File);

    try {
      const createTemplate = await firstValueFrom(this.httpService.request(config));
      return createTemplate.data
    }
    catch (e) {
      console.log("🚀 ~ e:", e)
      return { message : 'Failed to create Template ',  error : e.data}
    }

  }
  // Get template by ID use case
  async getTemplateById(templateId:string)
  {
    const  {config}= await this.IESignConfig.getTemplateByIdConfig(templateId);
    try {
      const createTemplate = await firstValueFrom(this.httpService.request(config));
      return createTemplate.data
    }
    catch (e) {
      console.log("🚀 ~ e:", e)
      return { message : 'Failed to create Template ',  error : e.data}


    }
  }

  // create document from templateId
  async createDocumentFromTemplate(templateId:string)
  {
    const  {configDoc}= await this.IESignConfig.createDocumentFromTemplateConfig(templateId); 
    try {
      const createTemplate = await firstValueFrom(this.httpService.request(configDoc));
      return createTemplate.data
    }


    catch (e) {
      console.log("🚀 ~ e:", e)
      return { message : 'Failed to create Template ',  error : e.data}


    }
  }
  // get log of all events
  async getEventInfo(request)
  {
  console.log("🚀 ~ ESignUsecase ~ request:", request)
  }
  
  // create document
  async createDocument(body)
  {
    const {pdfId }=body;
    const base64File = await this.IPDFRepository.getFile(pdfId);

    const {config} = await this.IESignConfig.createDocumentConfig( base64File , body);

    try {
      const createDocument = await firstValueFrom(this.httpService.request(config));
      return createDocument.data
    }
    catch (e) {
      console.log("🚀 ~ e:", e)
      return { message : 'Failed to  createDocument ',  error : e.data}
    }
    
  }


  
}
