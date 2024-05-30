import { DatabaseService } from '@app/database';
import { CFRItem } from '@app/database/model/cfr-item';
import { FileStorageService } from '@app/file-storage';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CfrService {
  constructor(
    private databaseService: DatabaseService,
    private fileStoragService: FileStorageService,
  ) {}
  async findAll(parentId: string): Promise<CFRItem> {
    return this.databaseService.getItemsById(parentId);
  }

  async getFileDownloadSignedUrl() {
    const fileKey = '1716862267520.txt';
    return {
      key: fileKey,
      url: await this.fileStoragService.getDownloadFileSignedUrl(fileKey),
      extension: 'txt',
    };
  }
}
