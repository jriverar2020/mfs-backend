import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
    constructor(private readonly service: StudentsService) { }

    @Post()
    async create(@Body() body: { fullName: string; email: string }) {
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

    @Post(':id/profile')
    async createOrUpdateProfile(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: { phone?: string; Address?: string },
    ) {
        return this.service.createOrUpdateProfile(id, body);
    }

    @Post(':id/enroll')
    async enroll(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: { courseId: number },
    ) {
        return this.service.enroll(id, body.courseId);
    }

    @Get(':id/enrollments')
    async studentEnrollments(@Param('id', ParseIntPipe) id: number) {
        return this.service.studentEnrollments(id);
    }
}