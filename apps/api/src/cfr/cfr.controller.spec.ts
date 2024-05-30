import { Test, TestingModule } from '@nestjs/testing';
import { CfrController } from './cfr.controller';
import { CfrService } from './cfr.service';

describe('CfrController', () => {
  let controller: CfrController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CfrController],
      providers: [CfrService],
    }).compile();

    controller = module.get<CfrController>(CfrController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
