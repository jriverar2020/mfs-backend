import { Controller, Get, Post, Body, Param, ParseIntPipe, Patch, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customers.dto';
import { UpdateCustomerDto } from './dto/update-customers.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customerService: CustomersService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async list(@CurrentUser() user: any) {
        return this.customerService.findAll();
    }

    @Post()
    async create(@Body() dto: CreateCustomerDto) {
        return this.customerService.create(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(
        @CurrentUser() user: any, 
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.customerService.findOne(id);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateCustomerDto
    ) {
        return this.customerService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(
        @Param('id', ParseIntPipe) id: number,
    ) {
         await this.customerService.remove(id);
    }

}
