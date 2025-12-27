import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@/generated/prisma/client';

@Injectable()
export class InventoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.InventoryItemCreateInput) {
    return this.prisma.inventoryItem.create({ data });
  }

  async getMany(where: Prisma.InventoryItemWhereInput, skip: number, take: number) {
    return this.prisma.inventoryItem.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: {  },
    });
  }

  async count(where: Prisma.InventoryItemWhereInput) {
    return this.prisma.inventoryItem.count({ where });
  }

  async getById(id: string) {
    return this.prisma.inventoryItem.findUniqueOrThrow({ where: { id } });
  }

  async update(id: string, data: Prisma.InventoryItemUpdateInput) {
    return this.prisma.inventoryItem.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.inventoryItem.delete({ where: { id } });
  }
}
