import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IESignConfig } from 'src/useCases/repositories/esign.repository';

// ESignConfig class responsible for interacting with open sign labs
@Injectable()

export class OenSignLabConfig implements IESignConfig {
  constructor(
    private readonly ConfigService: ConfigService,
  ) { }

  // Constructs the configuration for creating a template.
  async getTemplateCreationUrl(base64File) {

    const templateData = JSON.stringify({
      file: base64File, // Base64-encoded file
      title: 'eSignWorkflow',
      signers: [
        {
          role: 'role1', 
          email: 'divyasoni1515@gmail.com',
          name: 'role1',
          phone: '',
          widgets: [
            {
              type: 'signature',
              page: 1,
              x: 244,
              y: 71,
              w: 38,
              h: 46,
            },
          ],
        },

      ],
      sendInOrder: true,
      enableOTP: false,
      enableTour: true,
      redirect_url: '',
      email_sender_name: 'opensign™',
      allow_modifications: true,
    });
    const url = this.ConfigService.get('BASE_OPENSIGN_URL')
    const apiToken = this.ConfigService.get('API_TOKEN')

    const config = {
      method: 'post',
      url: `${url}/createtemplate`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-token': apiToken,
      },
      data: templateData,
      maxBodyLength: Infinity,
    };

    return { config }
  }


  // Constructs the configuration for fetching a template by its ID.
  async getTemplateByIdConfig(templateId) {
    const url = this.ConfigService.get('BASE_OPENSIGN_URL')
    const apiToken = this.ConfigService.get('API_TOKEN')

    const config = {
      method: 'get',
      url: `${url}template/${templateId}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-token': apiToken,
      },
      maxBodyLength: Infinity,
    };
    return { config }
  }

  // create document from templateId config
  async createDocumentFromTemplateConfig(templateId: string) {

    const templateData = JSON.stringify({
      "signers": [
        {
          "role": "role1",
          "email": "divyasoni1515@gmail.com",
          "name": "role1",
          "phone": "8959304444"
        }
      ],
      "folderId": "",
      "send_email": true,
      "email_subject": "Signing Request",
      "email_body": "Signing Request",
      "sendInOrder": true,
      "enableOTP": false,
      "enableTour": true,
      "email_sender_name": 'opensign™',
      "allow_modifications": true,
    });

    const url = this.ConfigService.get('BASE_OPENSIGN_URL')
    const apiToken = this.ConfigService.get('API_TOKEN')


    const configDoc = {
      method: 'post',
      url: `${url}createdocument/${templateId}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-token': apiToken,
      },
      data: templateData,
      maxBodyLength: Infinity,
    };
    return {configDoc}


  }

 async createDocumentConfig(base64File , body)
 {


  const {  title , signers } = body;

  const templateData = JSON.stringify({
    file: base64File, // Base64-encoded file
    title: title || 'eSignWorkflow',
    signers: signers.map((signer, index) => ({
      role: signer.role,
      email: signer.email,
      name: signer.name,
      phone: signer.phone || '',
      widgets: [
        {
          type: signer.type || 'signature', 
          page: 1, 
          x: 244 + index * 50, 
          y: 10,
          w: 38,
          h: 46,
        },
      ],
    })),
    sendInOrder: true,
    enableOTP: false,
    enableTour: true,
    redirect_url: '',
    email_sender_name: 'opensign™',
    allow_modifications: true,
  });
  
  const url = this.ConfigService.get('BASE_OPENSIGN_URL')
  const apiToken = this.ConfigService.get('API_TOKEN')

  const config = {
    method: 'post',
    url: `${url}createdocument`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-api-token': apiToken,
    },
    data: templateData,
    maxBodyLength: Infinity,
  };

  return { config }
 }
}
