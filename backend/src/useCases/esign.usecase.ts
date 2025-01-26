// import { eSignTag } from "src/entities/esignTag.entity"
import { HttpService } from "@nestjs/axios";
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ESignUsecase {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  async submitForEsignUseCase(body) {

    const { pdfId } = body;
    console.log("🚀 ~ pdfId:", pdfId)


    const uploadsDir = path.resolve('./uploadedFiles')
    console.log("🚀 ~ uploadsDir:", uploadsDir)

    const files = fs.readdirSync(uploadsDir);
    console.log("🚀 ~ files:", files)

    // Find file matching `*_name` format
    const file = files.find((filename) => {
      return filename.includes(`${pdfId}`)
    })
    console.log("🚀 ~ file:", file)

    const filePath = path.join(uploadsDir, file ? file : ''); // Full file path
    console.log("🚀 ~ filePath:", filePath)
    const pdfBuffer = fs.readFileSync(filePath);
    const base64File = pdfBuffer.toString('base64');

    const templateData = JSON.stringify({
      file: base64File, // Base64-encoded file
      title : 'eSignWorkflow',
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
        // {
        //   role: 'public', // Default public 
        //   email: 'divyaasoni0@gmail.com',
        //   name: '',
        //   phone: '',
        //   widgets: [
        //     {
        //       type: 'checkbox',
        //       page: 1,
        //       x: 100, // Default x-coordinate
        //       y: 100, // Default y-coordinate
        //       w: 150, // Default width
        //       h: 50,  // Default height
        //     },
        //   ],
        // },
      ],
      sendInOrder: true,
      enableOTP: false,
      enableTour: true,
      redirect_url: '',
      email_sender_name: 'Divya Soni',
      allow_modifications: true,
    });

    const config = {
      method: 'post',
      url: 'https://sandbox.opensignlabs.com/api/v1/createtemplate',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-token': 'test.3ZxKSzbAxB17jcgpV9lbjF',
      },
      data: templateData,
      maxBodyLength: Infinity,
    };

    try {
      const create_template = await firstValueFrom(this.httpService.request(config));


      console.log("🚀 ~ create_template:", create_template.data)
    }
    catch (e) {
      console.log("🚀 ~ e:", e)

    }





















    try {
      const config_ = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://sandbox.opensignlabs.com/api/v1/webhook',
        headers: {
          'Accept': 'application/json',
          'x-api-token': 'test.3ZxKSzbAxB17jcgpV9lbjF'
        }
      }
      const get_webhook = await firstValueFrom(this.httpService.request(config_));
      console.log("🚀 ~ get_webhook:", get_webhook.data)



    }
    catch (e) {
      console.log("🚀 ~ e:", e)

    }




  }
}
