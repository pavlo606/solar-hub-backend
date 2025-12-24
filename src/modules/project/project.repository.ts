import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@/generated/prisma/client';

@Injectable()
export class ProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ProjectCreateInput) {
    return this.prisma.project.create({ data });
  }

  async getMany(where: Prisma.ProjectWhereInput, skip: number, take: number) {
    return this.prisma.project.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: { client: true },
    });
  }

  async count(where: Prisma.ProjectWhereInput) {
    return this.prisma.project.count({ where });
  }

  async getById(id: string) {
    return this.prisma.project.findUniqueOrThrow({ where: { id }, include: { client: true } });
  }

  async update(id: string, data: Prisma.ProjectUpdateInput) {
    return this.prisma.project.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.project.delete({ where: { id } });
  }
}
