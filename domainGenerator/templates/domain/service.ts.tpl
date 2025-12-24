import { Injectable } from '@nestjs/common';
import { {{Name}}Repository } from './{{name}}.repository';
import { Create{{Name}}Dto } from './dto/create-{{name}}.dto';
import { Update{{Name}}Dto } from './dto/update-{{name}}.dto';
import { Query{{Name}}Dto } from './dto/query-{{name}}.dto';
import { Prisma } from '@/generated/prisma/client';

@Injectable()
export class {{Name}}Service {
  constructor(private readonly repo: {{Name}}Repository) {}
  
  async create(dto: Create{{Name}}Dto, userId: string) {
    return this.repo.create({
      ...dto,
      createdBy: userId,
    });
  }

  async getMany(query: Query{{Name}}Dto) {
    const where: Prisma.{{Name}}WhereInput = {
      isActive: true,
      ...(query.search && {
        OR: [
          { name: { contains: query.search, mode: 'insensitive' } },
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

  async update(id: string, data: Update{{Name}}Dto) {
    return this.repo.update(id, data);
  }

  async delete(id: string) {
    return this.repo.delete(id);
  }

  async deleteSoft(id: string) {
    return this.repo.update(id, { isActive: false })
  }
}
