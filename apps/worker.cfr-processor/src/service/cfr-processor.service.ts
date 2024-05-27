// import fs from 'fs';
import { promises as fs } from 'fs';
import { Injectable } from '@nestjs/common';
import { Parser } from 'htmlparser2';
import { v4 as uuidv4 } from 'uuid';
import { DomHandler, Element, Node, DataNode } from 'domhandler';
import * as path from 'path';

@Injectable()
export class CFRProcessService {
  public async process() {
    const html = await this.getHtml();
    const handler = new DomHandler((error, dom) => {
      if (error) {
        console.error('Error parsing HTML:', error);
      } else {
        console.log(new Date().getTime());
        const json = dom.map((d) => this.convertDomToJson(d, null)).filter((d) => !d.ignore);
        console.log(new Date().getTime());
        console.log(JSON.stringify(json));
        console.log('Done');
      }
    });

    const parser = new Parser(handler);
    parser.write(html);
    parser.end();
  }

  private async getHtml() {
    // TODO: Read html content using axios
    const filePath = path.join(__dirname, '/data/test.html');
    console.log(filePath);
    return fs.readFile(filePath, 'utf8');
  }

  private convertDomToJson(node: Node, parentId: string | null): CFRItemDto {
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
    const jsonNode: CFRItemDto = {
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
