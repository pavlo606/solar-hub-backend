import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { type Request } from 'express';
import { ProjectMaterialService } from './project-material.service';
import { AddProjectMaterialDto } from './dto/add-project-material.dto';
import { ConsumeProjectMaterialDto } from './dto/consume-project-material.dto';
import { QueryProjectMaterialDto } from './dto/query-project-material.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/roles.enum';

@ApiTags('ProjectMaterial')
@Controller('project-material')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.USER)
export class ProjectMaterialController {
  constructor(private service: ProjectMaterialService) {}

  @ApiOperation({ summary: 'Add project material' })
  @ApiResponse({ status: 201, description: 'Returns created project-material data' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @Post("add")
  async addMaterial(@Body() dto: AddProjectMaterialDto) {
    return this.service.addMaterial(dto);
  }

  @ApiOperation({ summary: 'Consume project material' })
  @ApiResponse({ status: 201, description: 'Returns created project-material data' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @Post("consume")
  async consumeMaterial(@Body() dto: ConsumeProjectMaterialDto) {
    return this.service.consumeMaterial(dto.projectMaterialId, dto.quantity);
  }

  @ApiOperation({ summary: 'Consume project material' })
  @ApiResponse({ status: 201, description: 'Returns created project-material data' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @Post("cancelreserve")
  async cancelReserve(@Body() dto: ConsumeProjectMaterialDto) {
    return this.service.cancelReserve(dto.projectMaterialId, dto.quantity);
  }

  @ApiOperation({ summary: 'Get many project-materials with search and pagination' })
  @ApiResponse({ status: 200, description: 'Returns project-materials data' })
  @Get()
  async getMany(@Query() query: QueryProjectMaterialDto) {
    return this.service.getMany(query);
  }

  @ApiOperation({ summary: 'Get project-material by id' })
  @ApiResponse({ status: 200, description: 'Returns project-material data' })
  @ApiResponse({ status: 404, description: 'No such project-material' })
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @ApiOperation({ summary: 'Delete project-material' })
  @ApiResponse({ status: 200, description: 'Deleted successfuly' })
  @ApiResponse({ status: 404, description: 'No such project-material' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
