import { Module } from '@nestjs/common';
import { PanCocoController } from './pan-coco.controller';
import { PanCocoService } from './pan-coco.service';

@Module({
  controllers: [PanCocoController],
  providers: [PanCocoService]
})
export class PanCocoModule {}
