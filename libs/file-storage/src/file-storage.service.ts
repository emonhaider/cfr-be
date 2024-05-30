import { GetObjectCommand, GetObjectCommandInput, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileStorageService {
  // TODO: read from envrionment variables
  bucketName = 'mancomm-exercise';
  client: S3Client;
  constructor(private configService: ConfigService) {
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

  async getDownloadFileSignedUrl(key: string) {
    console.log(this.configService.get('AWS_PROFILE'));
    const params: GetObjectCommandInput = {
      Bucket: this.bucketName,
      Key: key,
    };
    const command = new GetObjectCommand(params);
    return getSignedUrl(this.client, command, { expiresIn: 3600 });
  }
}
