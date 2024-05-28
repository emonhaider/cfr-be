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

  public async createItem(item: CFRItem, cfrName: string) {
    console.log(item);
    // we only need to store top level data, no children
    delete item.children;
    const id = `${item.parentId ?? 'root'}#${item.id}`;
    const params: PutItemCommandInput = {
      TableName: this.tableName,
      Item: {
        id: { S: id },
        Cfr: { S: cfrName },
        Data: {
          S: JSON.stringify(item),
        },
        CreateAt: { S: new Date().getTime().toString() },
        UpdateAt: { S: new Date().getTime().toString() },
      },
    };
    console.log('Creating database entry');
    return this.client.send(new PutItemCommand(params));
  }
}
