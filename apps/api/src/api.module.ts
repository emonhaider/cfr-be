import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { CfrModule } from './cfr/cfr.module';

@Module({
  imports: [CfrModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
