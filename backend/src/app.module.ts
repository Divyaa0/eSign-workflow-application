import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { PDFController } from './interfaceAdapters/pdf.controller';
import { PDFUseCase } from './useCases/pdf.usecase';
import { PDFStorage } from './framework/pdf.storage';
import { HttpModule } from '@nestjs/axios';
import { ESignController } from './interfaceAdapters/esign.controller';
import { ESignUsecase } from './useCases/esign.usecase';
import { ConfigModule } from '@nestjs/config';
import { OenSignLabConfig } from './framework/openSignLabs';
@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  controllers: [PDFController,ESignController],
  providers: [
  PDFUseCase,ESignUsecase,
  {
    provide:'IPDFRepository',
    useClass:PDFStorage
  },
  {
    provide:'IESignConfig',
    useClass:OenSignLabConfig
  },
  
],
})
export class AppModule {}
