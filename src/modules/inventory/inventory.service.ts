import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InventoryRepository } from './inventory.repository';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { QueryInventoryDto } from './dto/query-inventory.dto';
import { Prisma } from '@/generated/prisma/client';
import { InsufficientStockException } from './exceptions/insufficient-stock.exception';

@Injectable()
export class InventoryService {
  constructor(private readonly repo: InventoryRepository) {}

  async create(dto: CreateInventoryDto, userId: string) {
    return this.repo.create({
      ...dto,
      // createdBy: userId,
    });
  }

  async getMany(query: QueryInventoryDto) {
    const where: Prisma.InventoryItemWhereInput = {
      isActive: true,
      ...(query.search && {
        OR: [{ name: { contains: query.search, mode: 'insensitive' } }],
      }),
    };

    const skip = (query.page - 1) * query.limit;

    const [items, total] = await Promise.all([
      this.repo.getMany(where, skip, query.limit),
      this.repo.count(where),
    ]);

    return {
      items,
      meta: {
        total,
        page: query.page,
        limit: query.limit,
      },
    };
  }

  async getById(id: string) {
    return this.repo.getById(id);
  }

  async update(id: string, data: UpdateInventoryDto) {
    return this.repo.update(id, data);
  }

  async updateQuantity(id: string, quantity: number) {
    const item = await this.repo.getById(id);

    if (quantity < item.reserved) {
      throw new BadRequestException('Quantity cannot be less then reserved');
    }

    return this.repo.update(id, { quantity });
  }

  async delete(id: string) {
    return this.repo.delete(id);
  }

  async deleteSoft(id: string) {
    return this.repo.update(id, { isActive: false });
  }

  async cancelReserve(itemId: string, quantity: number) {
    const item = await this.repo.getById(itemId);

    if (item.reserved < quantity) {
      return this.repo.update(itemId, {
        reserved: 0,
      });
    }

    return this.repo.update(itemId, {
      reserved: item.reserved - quantity,
    });
  }

  async reserve(itemId: string, quantity: number) {
    const item = await this.repo.getById(itemId);

    if (item.quantity - item.reserved < quantity) {
      throw new InsufficientStockException();
    }

    return this.repo.update(itemId, {
      reserved: item.reserved + quantity,
    });
  }

  async consume(itemId: string, quantity: number) {
    const item = await this.repo.getById(itemId);

    if (item.reserved < quantity) {
      throw new BadRequestException('Not enough reserved stock');
    }

    return this.repo.update(itemId, {
      quantity: item.quantity - quantity,
      reserved: item.reserved - quantity,
    });
  }
}
