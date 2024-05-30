import { DatabaseService } from '@app/database';
import { CFRItem } from '@app/database/model/cfr-item';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CfrService {
  constructor(private databaseService: DatabaseService) {}
  async findAll(parentId: string): Promise<CFRItem> {
    return this.databaseService.getItemsById(parentId);
  }
}
