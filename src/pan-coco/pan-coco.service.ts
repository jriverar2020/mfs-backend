import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePanCocoDto } from './dto/create-pan-coco.dto';
import { UpdatePanCocoDto } from './dto/update-pan-coco.dto';
import { PanCoco } from './entities/pan-coco.entity';

@Injectable()
export class PanCocoService {

    private pancocos: PanCoco[] = [];
    private nextId = 1;

    create(dto: CreatePanCocoDto): PanCoco {
        const newPanCoco: PanCoco = {
            id: this.nextId++,
            code: dto.code,
            name: dto.name,
            isActive: true,
            createdAt: new Date().toISOString(),
        };
        this.pancocos.push(newPanCoco);
        return newPanCoco;
    }

    findAll(): PanCoco[] {
        return this.pancocos;
    }

    findOne(id: number): PanCoco {
        const found = this.pancocos.find(c => c.id === id);
        if (!found) throw new NotFoundException(`PanCoco ${id} no existe`);
        return found;
    }

    update(id: number, dto: UpdatePanCocoDto): PanCoco {
        const panCoco = this.findOne(id);
        Object.assign(panCoco, dto);
        return panCoco;
    }

    remove(id: number): void {
        const idx = this.pancocos.findIndex(c => c.id === id);
        if (idx === -1) throw new NotFoundException(`PanCoco ${id} no existe`);
        this.pancocos.splice(idx, 1);
    }
}

