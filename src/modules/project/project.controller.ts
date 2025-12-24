import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { type Request } from 'express';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { QueryProjectDto } from './dto/query-project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/roles.enum';
import { ProjectStatus } from './domain/project-status.enum';
import { ChangeProjectStatusDto } from './dto/change-project-status.dto';

@ApiTags('Project')
@Controller('project')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.USER)
export class ProjectController {
  constructor(private service: ProjectService) {}

  @ApiOperation({ summary: 'Create project' })
  @ApiResponse({ status: 201, description: 'Returns created project data' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @Post()
  async create(@Body() dto: CreateProjectDto, @Req() req: Request) {
    const user = req.user as { userId: string };
    return this.service.create(dto, user.userId);
  }

  @ApiOperation({ summary: 'Get many projects with search and pagination' })
  @ApiResponse({ status: 200, description: 'Returns projects data' })
  @Get()
  async getMany(@Query() query: QueryProjectDto) {
    return this.service.getMany(query);
  }

  @ApiOperation({ summary: 'Get project by id' })
  @ApiResponse({ status: 200, description: 'Returns project data' })
  @ApiResponse({ status: 404, description: 'No such project' })
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @ApiOperation({ summary: 'Update project' })
  @ApiResponse({ status: 200, description: 'Updated successfuly' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @ApiResponse({ status: 404, description: 'No such project' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.service.update(id, dto);
  }

  @ApiOperation({ summary: 'Update project status' })
  @ApiResponse({ status: 200, description: 'Updated successfuly' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @ApiResponse({ status: 404, description: 'No such project' })
  @Patch(':id/status')
  async changeStatus(
    @Param('id') id: string,
    @Body() dto: ChangeProjectStatusDto,
  ) {
    return this.service.changeStatus(id, dto.status);
  }

  @ApiOperation({ summary: 'Delete project' })
  @ApiResponse({ status: 200, description: 'Deleted successfuly' })
  @ApiResponse({ status: 404, description: 'No such project' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @ApiOperation({ summary: 'Set project not active(soft delete)' })
  @ApiResponse({ status: 200, description: 'Softly deleted successfuly' })
  @ApiResponse({ status: 404, description: 'No such project' })
  @Delete('soft/:id')
  async deleteSoft(@Param('id') id: string) {
    return this.service.deleteSoft(id);
  }
}
