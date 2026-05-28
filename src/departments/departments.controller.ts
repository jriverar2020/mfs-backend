import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { DepartmentsService } from './departments.service';

@Controller('departments')
export class DepartmentsController {
    constructor(private readonly service: DepartmentsService) { }

    @Post()
    async create(@Body() body: { name: string }) {
        return this.service.create(body.name);
    }

    @Get()
    async findAll() {
        return this.service.findAll();
    }
    
    @Get(':id/courses')
    async findOneWithCourses(@Param('id', ParseIntPipe) id: number) {
        return this.service.findOneWithCourses(id);
    }
}