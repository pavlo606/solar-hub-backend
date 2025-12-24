import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { type Request } from 'express';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { QueryClientDto } from './dto/query-client.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/roles.enum';

@ApiTags('Client')
@Controller('client')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.USER)
export class ClientController {
  constructor(private service: ClientService) {}

  @ApiOperation({ summary: 'Create client' })
  @ApiResponse({ status: 201, description: 'Returns created client data' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @Post()
  async create(@Body() dto: CreateClientDto, @Req() req: Request) {
    const user = req.user as { userId: string };
    return this.service.create(dto, user.userId);
  }

  @ApiOperation({ summary: 'Get many clients with search and pagination' })
  @ApiResponse({ status: 200, description: 'Returns clients data' })
  @Get()
  async getAll(@Query() query: QueryClientDto) {
    return this.service.getMany(query);
  }

  @ApiOperation({ summary: 'Get client by id' })
  @ApiResponse({ status: 200, description: 'Returns client data' })
  @ApiResponse({ status: 404, description: 'No such client' })
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @ApiOperation({ summary: 'Update client' })
  @ApiResponse({ status: 200, description: 'Updated successfuly' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @ApiResponse({ status: 404, description: 'No such client' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateClientDto) {
    return this.service.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete client' })
  @ApiResponse({ status: 200, description: 'Deleted successfuly' })
  @ApiResponse({ status: 404, description: 'No such client' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @ApiOperation({ summary: 'Set client not active' })
  @ApiResponse({ status: 200, description: 'Softly deleted successfuly' })
  @ApiResponse({ status: 404, description: 'No such client' })
  @Delete('soft/:id')
  async deleteSoft(@Param('id') id: string) {
    return this.service.deleteSoft(id);
  }
}
