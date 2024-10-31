import { Test, TestingModule } from '@nestjs/testing';
import { AbdcenceController } from './absence.controller';
import { AbdcenceService } from './absence.service';

describe('AbdcenceController', () => {
  let controller: AbdcenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AbdcenceController],
      providers: [AbdcenceService],
    }).compile();

    controller = module.get<AbdcenceController>(AbdcenceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
