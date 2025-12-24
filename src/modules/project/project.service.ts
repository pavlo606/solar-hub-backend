import { BadRequestException, Injectable } from '@nestjs/common';
import { ProjectRepository } from './project.repository';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { QueryProjectDto } from './dto/query-project.dto';
import { Prisma } from '@/generated/prisma/client';
import { ProjectStatus } from './domain/project-status.enum';
import { canChangeStatus } from './domain/project-status-flow';

@Injectable()
export class ProjectService {
  constructor(private readonly repo: ProjectRepository) {}

  async create(dto: CreateProjectDto, userId: string) {
    const { clientId, ...data } = dto;

    return this.repo.create({
      ...data,
      client: { connect: { id: dto.clientId } },
      createdBy: userId,
    });
  }

  async getMany(query: QueryProjectDto) {
    const where: Prisma.ProjectWhereInput = {
      isActive: true,
      ...(query.clientId && { clientId: query.clientId }),
      ...(query.status && { status: query.status }),
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

  async update(id: string, data: UpdateProjectDto) {
    return this.repo.update(id, data);
  }

  async changeStatus(id: string, newStatus: ProjectStatus) {
    const project = await this.getById(id);
  
    if (!canChangeStatus(project.status as ProjectStatus, newStatus)) {
      throw new BadRequestException("Invalid project status")
    }

    const extra = {};
    if (newStatus === ProjectStatus.IN_PROGRESS) {
      extra['startDate'] = new Date();
    }
    if (newStatus === ProjectStatus.COMPLETED) {
      extra['endDate'] = new Date();
    }

    return this.repo.update(id, {
      status: newStatus,
      ...extra,
    });
  }

  async delete(id: string) {
    return this.repo.delete(id);
  }

  async deleteSoft(id: string) {
    const project = await this.getById(id);

    if (
      project.status === ProjectStatus.COMPLETED ||
      project.status === ProjectStatus.IN_PROGRESS
    ) {
      throw new BadRequestException(
        'Cannot deactivate active or completed project',
      );
    }

    return this.repo.update(id, { isActive: false });
  }
}
