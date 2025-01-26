import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { PDFController } from './interfaceAdapters/pdf.controller';
import { PDFUseCase } from './useCases/pdf.usecase';
import { PDFStorage } from './framework/pdf.storage';
import { diskStorage } from 'multer';
import { HttpModule } from '@nestjs/axios';
import { ESignController } from './interfaceAdapters/esign.controller';
import { ESignUsecase } from './useCases/esign.usecase';


@Module({
  imports: [
    MulterModule.register({dest: './uploadedPDFs'}),
    HttpModule
  ],
  controllers: [PDFController,ESignController],
  providers: [
  PDFUseCase,ESignUsecase
  
],
})
export class AppModule {}
