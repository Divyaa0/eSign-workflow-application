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
          role: 'developer', // Add your specific role
          email: 'divyasoni1515@gmail.com',
          name: 'Divya Soni',
          phone: '8959304444',
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
      allow_modifications: false,
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
  async createDocumentConfig(templateId: string) {

    const templateData = JSON.stringify({
      "signers": [
        {
          "role": "developer",
          "email": "divyasoni1515@gmail.com",
          "name": "Divya Soni",
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
      "allow_modifications": false,
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
    console.log("🚀 ~ OenSignLabConfig ~ createDocumentConfig ~ configDoc:", configDoc)
    return configDoc


  }


}