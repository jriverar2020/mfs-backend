import { Test, TestingModule } from '@nestjs/testing';
import { PanCocoController } from './pan-coco.controller';

describe('PanCocoController', () => {
  let controller: PanCocoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PanCocoController],
    }).compile();

    controller = module.get<PanCocoController>(PanCocoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
