import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from './employee.repository';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { QueryEmployeeDto } from './dto/query-employee.dto';
import { Prisma } from '@/generated/prisma/client';

@Injectable()
export class EmployeeService {
  constructor(private readonly repo: EmployeeRepository) {}
  
  async create(dto: CreateEmployeeDto, userId: string) {
    return this.repo.create({
      ...dto,
      // createdBy: userId,
    });
  }

  async getMany(query: QueryEmployeeDto) {
    const where: Prisma.EmployeeWhereInput = {
      isActive: true,
      ...(query.search && {
        OR: [
          { firstName: { contains: query.search, mode: 'insensitive' } },
          { lastName: { contains: query.search, mode: 'insensitive' } },
          { email: { contains: query.search } },
          { phone: { contains: query.search } },
        ],
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

  async update(id: string, data: UpdateEmployeeDto) {
    return this.repo.update(id, data);
  }

  async delete(id: string) {
    return this.repo.delete(id);
  }

  async deleteSoft(id: string) {
    return this.repo.update(id, { isActive: false })
  }
}
