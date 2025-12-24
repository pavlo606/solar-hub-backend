import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@/generated/prisma/client';

@Injectable()
export class {{Name}}Repository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.{{Name}}CreateInput) {
    return this.prisma.{{camelName}}.create({ data });
  }

  async getMany(where: Prisma.{{Name}}WhereInput, skip: number, take: number) {
    return this.prisma.{{camelName}}.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: {  },
    });
  }

  async count(where: Prisma.{{Name}}WhereInput) {
    return this.prisma.{{camelName}}.count({ where });
  }

  async getById(id: string) {
    return this.prisma.{{camelName}}.findUniqueOrThrow({ where: { id } });
  }

  async update(id: string, data: Prisma.{{Name}}UpdateInput) {
    return this.prisma.{{camelName}}.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.{{camelName}}.delete({ where: { id } });
  }
}
