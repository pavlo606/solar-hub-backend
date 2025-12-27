import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { type Request } from 'express';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { QueryInventoryDto } from './dto/query-inventory.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/roles.enum';
import { ActionInventoryDto } from './dto/action-inventory.dto';

@ApiTags('Inventory')
@Controller('inventory')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.USER)
export class InventoryController {
  constructor(private service: InventoryService) {}

  @ApiOperation({ summary: 'Create inventory' })
  @ApiResponse({ status: 201, description: 'Returns created inventory data' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @Post()
  async create(@Body() dto: CreateInventoryDto, @Req() req: Request) {
    const user = req.user as { userId: string };
    return this.service.create(dto, user.userId);
  }

  @ApiOperation({ summary: 'Get many inventorys with search and pagination' })
  @ApiResponse({ status: 200, description: 'Returns inventorys data' })
  @Get()
  async getMany(@Query() query: QueryInventoryDto) {
    return this.service.getMany(query);
  }

  @ApiOperation({ summary: 'Get inventory by id' })
  @ApiResponse({ status: 200, description: 'Returns inventory data' })
  @ApiResponse({ status: 404, description: 'No such inventory' })
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @ApiOperation({ summary: 'Update inventory' })
  @ApiResponse({ status: 200, description: 'Updated successfuly' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @ApiResponse({ status: 404, description: 'No such inventory' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateInventoryDto) {
    return this.service.update(id, dto);
  }

  @ApiOperation({ summary: 'Update inventory' })
  @ApiResponse({ status: 200, description: 'Updated successfuly' })
  @ApiResponse({ status: 400, description: 'Invalid body data' })
  @ApiResponse({ status: 404, description: 'No such inventory' })
  @Patch('update/quntity')
  async updateQuantity(@Body() dto: ActionInventoryDto) {
    return this.service.updateQuantity(dto.itemId, dto.quantity);
  }

  @ApiOperation({ summary: 'Delete inventory' })
  @ApiResponse({ status: 200, description: 'Deleted successfuly' })
  @ApiResponse({ status: 404, description: 'No such inventory' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @ApiOperation({ summary: 'Set inventory not active(soft delete)' })
  @ApiResponse({ status: 200, description: 'Softly deleted successfuly' })
  @ApiResponse({ status: 404, description: 'No such inventory' })
  @Delete('soft/:id')
  async deleteSoft(@Param('id') id: string) {
    return this.service.deleteSoft(id);
  }

  // @ApiOperation({ summary: 'Reserve some quantity of item' })
  // @ApiResponse({ status: 200, description: 'Reserved successfuly' })
  // @ApiResponse({ status: 400, description: 'Insufficient stock of item' })
  // @Post('reserve')
  // async reserve(@Body() dto: ActionInventoryDto) {
  //   return this.service.reserve(dto.itemId, dto.quantity);
  // }

  // @ApiOperation({ summary: 'Consume reserved item' })
  // @ApiResponse({ status: 200, description: 'Consumed successfuly' })
  // @ApiResponse({ status: 400, description: 'Not enough reserved stock' })
  // @Post('consume')
  // async consume(@Body() dto: ActionInventoryDto) {
  //   return this.service.consume(dto.itemId, dto.quantity);
  // }
}
