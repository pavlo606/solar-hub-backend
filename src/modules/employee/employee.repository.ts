import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@/generated/prisma/client';

@Injectable()
export class EmployeeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.EmployeeCreateInput) {
    return this.prisma.employee.create({ data });
  }

  async getMany(where: Prisma.EmployeeWhereInput, skip: number, take: number) {
    return this.prisma.employee.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });
  }

  async count(where: Prisma.EmployeeWhereInput) {
    return this.prisma.employee.count({ where });
  }

  async getById(id: string) {
    return this.prisma.employee.findUniqueOrThrow({ where: { id } });
  }

  async update(id: string, data: Prisma.EmployeeUpdateInput) {
    return this.prisma.employee.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.employee.delete({ where: { id } });
  }
}
