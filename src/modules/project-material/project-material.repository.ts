import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@/generated/prisma/client';

@Injectable()
export class ProjectMaterialRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ProjectMaterialCreateInput) {
    return this.prisma.projectMaterial.create({ data });
  }

  async getMany(
    where: Prisma.ProjectMaterialWhereInput,
    skip: number,
    take: number,
  ) {
    return this.prisma.projectMaterial.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: { inventoryItem: true },
    });
  }

  async count(where: Prisma.ProjectMaterialWhereInput) {
    return this.prisma.projectMaterial.count({ where });
  }

  async getById(id: string) {
    return this.prisma.projectMaterial.findUniqueOrThrow({
      where: { id },
      include: { inventoryItem: true },
    });
  }

  async getByProjectInventory(projectId: string, inventoryItemId: string) {
    console.log(projectId);
    console.log(inventoryItemId);
    return this.prisma.projectMaterial.findUnique({
      where: { projectId_inventoryItemId: { projectId, inventoryItemId } },
    });
  }

  async update(id: string, data: Prisma.ProjectMaterialUpdateInput) {
    return this.prisma.projectMaterial.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.projectMaterial.delete({ where: { id } });
  }
}
