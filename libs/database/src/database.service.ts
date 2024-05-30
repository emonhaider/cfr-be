import { Injectable } from '@nestjs/common';
import { CFRItem } from './model/cfr-item';
import { ConfigService } from '@nestjs/config';
import {
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandInput,
  QueryCommand,
  QueryCommandInput,
} from '@aws-sdk/client-dynamodb';

@Injectable()
export class DatabaseService {
  client: DynamoDBClient;
  tableName = 'CFR';
  constructor(private configService: ConfigService) {
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

  public async getItemsById(id: string): Promise<CFRItem[] | null> {
    console.log('getItemsById', id);
    const params: QueryCommandInput = {
      TableName: this.tableName,
      KeyConditionExpression: 'parentId = :parentId',
      ExpressionAttributeValues: { ':parentId': { S: id } },
    };

    const data = await this.client.send(new QueryCommand(params));
    return data.Items.map((element) => {
      const data = JSON.parse(element.data.S) as CFRItem;
      return {
        id: element.id.S,
        parentId: element.parentId.S,
        type: data.type,
        name: data.name,
        attribs: data.attribs,
        data: data.data,
        ignore: data.ignore,
      };
    });
  }
}
