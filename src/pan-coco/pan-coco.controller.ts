import { Controller, Get, Post, Body, Param, ParseIntPipe, Patch, Delete, HttpCode } from '@nestjs/common';
import { PanCocoService } from './pan-coco.service';
import { CreatePanCocoDto } from './dto/create-pan-coco.dto';
import { UpdatePanCocoDto } from './dto/update-pan-coco.dto';

@Controller('pan-coco')
export class PanCocoController {

    constructor(private readonly panCocoService: PanCocoService) { }

    @Get()
    list() {
        return this.panCocoService.findAll();
    }

    @Post()
    create(@Body() dto: CreatePanCocoDto) {
        return this.panCocoService.create(dto);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.panCocoService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdatePanCocoDto
    ) {
        return this.panCocoService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(
        @Param('id', ParseIntPipe) id: number,
    ) {
        this.panCocoService.remove(id);
    }
}
