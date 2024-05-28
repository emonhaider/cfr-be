// import fs from 'fs';
import { promises as fs } from 'fs';
import { Injectable } from '@nestjs/common';
import { Parser } from 'htmlparser2';
import { v4 as uuidv4 } from 'uuid';
import { DomHandler, Element, Node, DataNode } from 'domhandler';
import * as path from 'path';
import { DatabaseService } from '@app/database';
import { CFRItem } from '@app/database/model/cfr-item';
import { FileStorageService } from '@app/file-storage';

@Injectable()
export class CFRProcessService {
  constructor(
    private databaseService: DatabaseService,
    private fileStorageService: FileStorageService,
  ) {}

  public async process() {
    const html = await this.getHtml();
    const handler = new DomHandler(async (error, dom) => {
      if (error) console.error('Error parsing HTML:', error);
      const json = dom.map((d) => this.convertDomToJson(d, null)).filter((d) => !d.ignore);
      console.log('Done converting to JSON');
      await this.writeToDatabase(json);
      await this.saveFile(json);
    });

    const parser = new Parser(handler);
    parser.write(html);
    parser.end();
  }

  async writeToDatabase(json: CFRItem[]) {
    for (const item of json) {
      console.log('Setting up for database entry');
      await this.databaseService.createItem({ ...item, children: null });
      console.log('Sucessfully wrote to database');
      if (!item.children || item.children.length === 0) continue;
      console.log('Processing children');
      await this.writeToDatabase(item.children);
    }
  }

  async saveFile(json: CFRItem[]) {
    console.log('Saving file');
    const fileName = new Date().getTime().toString();
    await this.fileStorageService.uploadFile(JSON.stringify(json), fileName);
    console.log(`File saved. Filename: ${fileName}`);
  }

  private async getHtml() {
    // TODO: Read html content using axios
    console.log('Fetching html');
    const filePath = path.join(__dirname, '/data/title-49.html');
    console.log(filePath);
    return fs.readFile(filePath, 'utf8');
  }

  private convertDomToJson(node: Node, parentId: string | null): CFRItem {
    const id = uuidv4();
    if (node.type === 'text') {
      const dataNode = node as DataNode;
      const text = dataNode.data.trim();
      return {
        id,
        parentId,
        type: node.type,
        data: text,
        //if empty text, the node will be ignored
        ignore: !text ? true : false,
      };
    }

    const elementNode = node as Element;
    const jsonNode: CFRItem = {
      id,
      parentId: parentId,
      type: node.type,
      name: elementNode.name,
      attribs: elementNode.attribs,
      ignore: false,
      children: elementNode.children
        ? elementNode.children.map((d) => this.convertDomToJson(d, id)).filter((d) => !d.ignore)
        : [],
    };
    return jsonNode;
  }
}
