import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  console.log('Started API: http://localhost:3000');
  await app.listen(3000);
}
bootstrap();
