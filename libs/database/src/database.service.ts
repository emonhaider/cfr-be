import { Injectable } from '@nestjs/common';
import { CFRItem } from './model/cfr-item';
import { ConfigService } from '@nestjs/config';
import { DynamoDBClient, PutItemCommand, PutItemCommandInput } from '@aws-sdk/client-dynamodb';

@Injectable()
export class DatabaseService {
  client: DynamoDBClient;
  tableName = 'CFR';
  constructor(configService: ConfigService) {
    this.client = new DynamoDBClient({ region: configService.get('AWS_REGION') });
  }

  public async createItem(item: CFRItem) {
    const params: PutItemCommandInput = {
      TableName: this.tableName,
      Item: {
        parentId: { S: item.parentId ?? 'root' },
        id: { S: item.id },
        data: {
          S: JSON.stringify(item),
        },
        createdAt: { S: new Date().getTime().toString() },
        updatedAt: { S: new Date().getTime().toString() },
      },
    };
    return this.client.send(new PutItemCommand(params));
  }
}
