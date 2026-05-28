import { Test, TestingModule } from '@nestjs/testing';
import { PanCocoService } from './pan-coco.service';

describe('PanCocoService', () => {
  let service: PanCocoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PanCocoService],
    }).compile();

    service = module.get<PanCocoService>(PanCocoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
