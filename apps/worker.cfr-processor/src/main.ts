import { NestFactory } from '@nestjs/core';
import { WorkerCfrProcessorModule } from './worker.cfr-processor.module';
import { CFRProcessService } from './service/cfr-processor.service';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(WorkerCfrProcessorModule);
  const cfrProcessorService = appContext.get(CFRProcessService);
  cfrProcessorService.process();
}
bootstrap();
