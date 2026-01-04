import { Injectable } from '@nestjs/common';
import { ClientRepository } from './client.repository';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { QueryClientDto } from './dto/query-client.dto';
import { Prisma } from '@/generated/prisma/client';

@Injectable()
export class ClientService {
  constructor(private readonly repo: ClientRepository) {}

  async create(dto: CreateClientDto, userId: string) {
    return this.repo.create({
      ...dto,
      createdBy: userId,
    });
  }

  async getMany(query: QueryClientDto) {
    const where: Prisma.ClientWhereInput = {
      isActive: true,
      ...(query.search && {
        OR: [
          { name: { contains: query.search, mode: 'insensitive' } },
          { phone: { contains: query.search } },
        ],
      }),
    };

    const skip = (query.page - 1) * query.limit;

    const orderBy: Prisma.ClientOrderByWithAggregationInput = {
      ...(query.sortBy
        ? { [query.sortBy]: query.sortOrder }
        : { createdAt: 'desc' }),
    };

    const [items, total] = await Promise.all([
      this.repo.getMany(where, orderBy, skip, query.limit),
      this.repo.count(where),
    ]);

    return {
      items,
      meta: {
        total,
        page: query.page,
        limit: query.limit,
        totalPages: Math.ceil(total / query.limit),
      },
    };
  }

  async getById(id: string) {
    return this.repo.getById(id);
  }

  async update(id: string, data: UpdateClientDto) {
    return this.repo.update(id, data);
  }

  async delete(id: string) {
    return this.repo.delete(id);
  }

  async deleteSoft(id: string) {
    return this.repo.update(id, { isActive: false });
  }
}
