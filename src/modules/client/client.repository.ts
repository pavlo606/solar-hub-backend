import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@/generated/prisma/client';

@Injectable()
export class ClientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ClientCreateInput) {
    return this.prisma.client.create({ data });
  }

  async getMany(where: Prisma.ClientWhereInput, skip: number, take: number) {
    return this.prisma.client.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: { projects: true },
    });
  }

  async count(where: Prisma.ClientWhereInput) {
    return this.prisma.client.count({ where });
  }

  async getById(id: string) {
    return this.prisma.client.findUniqueOrThrow({
      where: { id },
      include: { projects: true },
    });
  }

  async update(id: string, data: Prisma.ClientUpdateInput) {
    return this.prisma.client.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.client.delete({ where: { id } });
  }
}
