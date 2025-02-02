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

  async getEventInfo(request)
  {
  console.log("🚀 ~ ESignUsecase ~ request:", request)
  // const role2signed = request.signer.name;
  // console.log("🚀 ~ ESignUsecase ~ role2signed:", role2signed)
  // if(request.event == 'signed' && role2signed == 'Divyaa0' )
  // {
  //   console.log("trigger another mail .....")
  //   // this.addRole3ToWorkflow(request.objectId , 'divyasai19@svvv.edu.in')
  // }
  }

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

  async  addRole3ToWorkflow(documentId, role3Email) {
    console.log("🚀 ~ ESignUsecase ~ addRole3ToWorkflow ~ role3Email:", role3Email)
    console.log("🚀 ~ ESignUsecase ~ addRole3ToWorkflow ~ documentId:", documentId)

    const data_ = JSON.stringify({ 
      title:'eSignWorkflow',
      signers: [
        {
          role: 'role3',
          email: role3Email,
          name: 'Role 3 User',
          widgets: [
            {
              type: 'signature',
              page: 1,
              x: 300,
              y: 100,
              w: 38,
              h: 46,
            },

          ],
        },
      ]
    })

    const config = {
      method: 'put',
      url: `https://sandbox.opensignlabs.com/api/v1/document/${documentId}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-token': 'test.3ZxKSzbAxB17jcgpV9lbjF',
      },
      data: data_,
      maxBodyLength: Infinity,
    };

    
    const addSigner = await firstValueFrom(this.httpService.request(config));
    console.log("🚀 ~ ESignUsecase ~ addRole3ToWorkflow ~ addSigner:", addSigner)

  }
  
}
