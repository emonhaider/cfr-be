import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { bootstrap } from './bootstrap';
import * as dotenv from 'dotenv';

dotenv.config();
async function init() {
  const app = await NestFactory.create(ApiModule);
  await bootstrap(app);
  console.log('Started API: http://localhost:3000');
  await app.listen(3000);
}
init();
