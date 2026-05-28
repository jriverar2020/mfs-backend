import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentsService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: { fullName: string; email: string }) {
        return this.prisma.student.create({ data });
    }

    async findAll() {
        return this.prisma.student.findMany({ orderBy: { id: 'asc' } });
    }

    async createOrUpdateProfile(studentId: number, data: { phone?: string; address?: string }) {
        // Verifica estudiante
        const student = await this.prisma.student.findUnique({ where: { id: studentId } });
        if (!student) throw new NotFoundException(`Student ${studentId} no existe`);
        return this.prisma.studentProfile.upsert({
            where: { studentId },
            update: data,
            create: { studentId, ...data },
        });
    }

    async detail(studentId: number) {
        const student = await this.prisma.student.findUnique({
            where: { id: studentId },
            include: { Profile: true },
        });
        if (!student) throw new NotFoundException(`Student ${studentId} no existe`);
        return student;
    }

    // N:M explícita: enroll student in a course
    async enroll(studentId: number, courseId: number) {
        // transacción simple
        return this.prisma.enrollment.create({
            data: { studentId, courseId },
            include: { course: true, student: true },
        });
    }

    async studentEnrollments(studentId: number) {
        const student = await this.prisma.student.findUnique({
            where: { id: studentId },
            include: {
                enrollments: {
                    include: { course: true },
                    orderBy: { enrolledAt: 'desc' },
                },
            },
        });
        if (!student) throw new NotFoundException(`Student ${studentId} no existe`);
        return student;
    }
}