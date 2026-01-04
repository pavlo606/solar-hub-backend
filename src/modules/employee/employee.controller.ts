import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { type Request } from 'express';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { QueryEmployeeDto } from './dto/query-employee.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/roles.enum';

@ApiTags('Employee')
@Controller('employee')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.USER)
export class EmployeeController {
  constructor(private service: EmployeeService) {}

  @ApiOperation({ summary: 'Create employee' })
  @ApiResponse({ status: 201, description: 'Returns created employee data' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @Post()
  async create(@Body() dto: CreateEmployeeDto, @Req() req: Request) {
    const user = req.user as { userId: string };
    return this.service.create(dto, user.userId);
  }

  @ApiOperation({ summary: 'Get many employees with search and pagination' })
  @ApiResponse({ status: 200, description: 'Returns employees data' })
  @Get()
  async getMany(@Query() query: QueryEmployeeDto) {
    return this.service.getMany(query);
  }

  @ApiOperation({ summary: 'Get employee by id' })
  @ApiResponse({ status: 200, description: 'Returns employee data' })
  @ApiResponse({ status: 404, description: 'No such employee' })
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @ApiOperation({ summary: 'Update employee' })
  @ApiResponse({ status: 200, description: 'Updated successfuly' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @ApiResponse({ status: 404, description: 'No such employee' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateEmployeeDto) {
    return this.service.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete employee' })
  @ApiResponse({ status: 200, description: 'Deleted successfuly' })
  @ApiResponse({ status: 404, description: 'No such employee' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @ApiOperation({ summary: 'Set employee not active(soft delete)' })
  @ApiResponse({ status: 200, description: 'Softly deleted successfuly' })
  @ApiResponse({ status: 404, description: 'No such employee' })
  @Delete('soft/:id')
  async deleteSoft(@Param('id') id: string) {
    return this.service.deleteSoft(id);
  }
}
