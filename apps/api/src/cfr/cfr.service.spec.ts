import { Test, TestingModule } from '@nestjs/testing';
import { CfrService } from './cfr.service';

describe('CfrService', () => {
  let service: CfrService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CfrService],
    }).compile();

    service = module.get<CfrService>(CfrService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
