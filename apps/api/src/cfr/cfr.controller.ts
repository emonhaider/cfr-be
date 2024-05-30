import { Controller } from '@nestjs/common';
import { CfrService } from './cfr.service';

@Controller('cfr')
export class CfrController {
  constructor(private readonly cfrService: CfrService) {}

  // get cfr by id
}
