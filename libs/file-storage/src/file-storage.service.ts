import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileStorageService {
  // TODO: read from envrionment variables
  bucketName = 'mancomm-exercise';
  client: S3Client;
  constructor(configService: ConfigService) {
    this.client = new S3Client({ region: configService.get('AWS_REGION') });
  }

  public async uploadFile(body: string, fileName: string) {
    const uploadParams = {
      Bucket: this.bucketName,
      Key: `${fileName}.txt`, // File name you want to save as in S3
      Body: body,
      ContentType: 'text/plain',
    };
    await this.client.send(new PutObjectCommand(uploadParams));
  }
}
