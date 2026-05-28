import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
    constructor(private readonly service: CoursesService) { }

    @Post()
    async create(@Body() body: { code: string; title: string; departmentId: number }) {
        return this.service.create(body);
    }

    @Get()
    async findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    async detail(@Param('id', ParseIntPipe) id: number) {
        return this.service.detail(id);
    }

    @Post(':id/tags')
    async addTags(@Param('id', ParseIntPipe) id: number, @Body() body: { tags: string[] }) {
        return this.service.addTags(id, body.tags);
    }
}