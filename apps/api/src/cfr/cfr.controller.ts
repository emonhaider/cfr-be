import { Controller, Get, Query } from '@nestjs/common';
import { CfrService } from './cfr.service';

@Controller('')
export class CfrController {
  constructor(private readonly cfrService: CfrService) {}

  @Get('cfr')
  async findAll(@Query('parentId') parentId: string) {
    return this.cfrService.findAll(parentId);
  }

  @Get('cfr/actions/get-download-signed-url')
  async getDownloadSignedUrl() {
    return this.cfrService.getFileDownloadSignedUrl();
  }
}
