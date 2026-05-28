import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CoursesService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: { code: string; title: string; departmentId: number }) {
        return this.prisma.course.create({ data });
    }

    async findAll() {
        return this.prisma.course.findMany({
            include: { department: true },
            orderBy: { id: 'asc' },
        });
    }

    async addTags(courseId: number, tagNames: string[]) {
        // upsert tags
        const tags = await Promise.all(
            tagNames.map((name) =>
                this.prisma.tag.upsert({
                    where: { name },
                    update: {},
                    create: { name },
                }),
            ),
        );
        // conectar tags al curso
        const updated = await this.prisma.course.update({
            where: { id: courseId },
            data: {
                tags: {
                    connect: tags.map((t) => ({ id: t.id })),
                },
            },
            include: { tags: true },
        });
        return updated;
    }

    async detail(courseId: number) {
        const course = await this.prisma.course.findUnique({
            where: { id: courseId },
            include: { tags: true, department: true },
        });
        if (!course) throw new NotFoundException(`Course ${courseId} no existe`);
        return course;
    }
}