import { Callback, Context, Handler } from 'aws-lambda';
import serverlessExpress from '@codegenie/serverless-express';
import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { bootstrap } from './bootstrap';

let server: Handler;

async function bootstrapLambda(): Promise<Handler> {
  const app = await NestFactory.create(ApiModule);
  await bootstrap(app);
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
  console.log('Starting lambda');
  server = server ?? (await bootstrapLambda());
  return server(event, context, callback);
};
