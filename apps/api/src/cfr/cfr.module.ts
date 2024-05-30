import { Module } from '@nestjs/common';
import { CfrService } from './cfr.service';
import { CfrController } from './cfr.controller';

@Module({
  controllers: [CfrController],
  providers: [CfrService],
})
export class CfrModule {}
