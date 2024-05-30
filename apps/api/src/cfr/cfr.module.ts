import { Module } from '@nestjs/common';
import { CfrService } from './cfr.service';
import { CfrController } from './cfr.controller';
import { DatabaseService } from '@app/database';
import { ConfigService } from '@nestjs/config';
import { FileStorageService } from '@app/file-storage';

@Module({
  controllers: [CfrController],
  providers: [CfrService, DatabaseService, ConfigService, FileStorageService],
})
export class CfrModule {}
