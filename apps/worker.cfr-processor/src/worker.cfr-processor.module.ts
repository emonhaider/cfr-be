import { DatabaseModule } from '@app/database';
import { FileStorageModule } from '@app/file-storage';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CFRProcessService } from './service/cfr-processor.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }), DatabaseModule, FileStorageModule],
  providers: [CFRProcessService],
})
export class WorkerCfrProcessorModule {}
