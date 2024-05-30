import { Module } from '@nestjs/common';
import { CfrService } from './cfr.service';
import { CfrController } from './cfr.controller';
import { DatabaseService } from '@app/database';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [CfrController],
  providers: [CfrService, DatabaseService, ConfigService],
})
export class CfrModule {}
