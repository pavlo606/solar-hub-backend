import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@/generated/prisma/client';

@Injectable()
export class {{Name}}Repository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.{{Name}}CreateInput) {
    return this.prisma.{{name}}.create({ data });
  }

  async getMany(where: Prisma.{{Name}}WhereInput, skip: number, take: number) {
    return this.prisma.{{name}}.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: {  },
    });
  }

  async count(where: Prisma.{{Name}}WhereInput) {
    return this.prisma.{{name}}.count({ where });
  }

  async getById(id: string) {
    return this.prisma.{{name}}.findUniqueOrThrow({ where: { id } });
  }

  async update(id: string, data: Prisma.{{Name}}UpdateInput) {
    return this.prisma.{{name}}.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.{{name}}.delete({ where: { id } });
  }
}
