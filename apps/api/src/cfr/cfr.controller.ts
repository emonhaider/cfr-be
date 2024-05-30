import { Controller, Get, Param, Query } from '@nestjs/common';
import { CfrService } from './cfr.service';

@Controller('')
export class CfrController {
  constructor(private readonly cfrService: CfrService) {}

  @Get('cfr')
  async findAll(@Query('parentId') parentId: string) {
    return this.cfrService.findAll(parentId);
  }
}
