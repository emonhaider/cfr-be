import { NestFactory } from '@nestjs/core';
import { WorkerCfrProcessorModule } from './worker.cfr-processor.module';
import { CFRProcessService } from './service/cfr-processor.service';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(WorkerCfrProcessorModule);
  const cfrProcessorService = appContext.get(CFRProcessService);
  cfrProcessorService.process();
}
bootstrap();
