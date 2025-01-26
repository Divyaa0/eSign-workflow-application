import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { PDFController } from './interfaceAdapters/pdf.controller';
import { PDFUseCase } from './useCases/pdf.usecase';
import { PDFRepository } from './useCases/repositories/pdf.repository';
import { PDFStorage } from './framework/pdf.storage';
import { diskStorage } from 'multer';
@Module({
  imports: [
    MulterModule.register({dest: './uploadedPDFs'})
  ],
  controllers: [PDFController],
  providers: [
  PDFUseCase
  
],
})
export class AppModule {}
