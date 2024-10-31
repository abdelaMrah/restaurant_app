import { Test, TestingModule } from '@nestjs/testing';
import { AbdcenceService } from './absence.service';

describe('AbdcenceService', () => {
  let service: AbdcenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AbdcenceService],
    }).compile();

    service = module.get<AbdcenceService>(AbdcenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
