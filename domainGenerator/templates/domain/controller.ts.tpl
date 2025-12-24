import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { type Request } from 'express';
import { {{Name}}Service } from './{{name}}.service';
import { Create{{Name}}Dto } from './dto/create-{{name}}.dto';
import { Update{{Name}}Dto } from './dto/update-{{name}}.dto';
import { Query{{Name}}Dto } from './dto/query-{{name}}.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/roles.enum';

@ApiTags('{{Name}}')
@Controller('{{name}}')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.USER)
export class {{Name}}Controller {
  constructor(private service: {{Name}}Service) {}

  @ApiOperation({ summary: 'Create {{name}}' })
  @ApiResponse({ status: 201, description: 'Returns created {{name}} data' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @Post()
  async create(@Body() dto: Create{{Name}}Dto, @Req() req: Request) {
    const user = req.user as { userId: string };
    return this.service.create(dto, user.userId);
  }

  @ApiOperation({ summary: 'Get many {{name}}s with search and pagination' })
  @ApiResponse({ status: 200, description: 'Returns {{name}}s data' })
  @Get()
  async getMany(@Query() query: Query{{Name}}Dto) {
    return this.service.getMany(query);
  }

  @ApiOperation({ summary: 'Get {{name}} by id' })
  @ApiResponse({ status: 200, description: 'Returns {{name}} data' })
  @ApiResponse({ status: 404, description: 'No such {{name}}' })
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @ApiOperation({ summary: 'Update {{name}}' })
  @ApiResponse({ status: 200, description: 'Updated successfuly' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @ApiResponse({ status: 404, description: 'No such {{name}}' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: Update{{Name}}Dto) {
    return this.service.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete {{name}}' })
  @ApiResponse({ status: 200, description: 'Deleted successfuly' })
  @ApiResponse({ status: 404, description: 'No such {{name}}' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @ApiOperation({ summary: 'Set {{name}} not active(soft delete)' })
  @ApiResponse({ status: 200, description: 'Softly deleted successfuly' })
  @ApiResponse({ status: 404, description: 'No such {{name}}' })
  @Delete('soft/:id')
  async deleteSoft(@Param('id') id: string) {
    return this.service.deleteSoft(id);
  }
}
