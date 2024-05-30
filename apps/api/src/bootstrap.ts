import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';

export async function bootstrap(app: INestApplication) {
  app.enableCors();
  app.use(helmet());
}
