import { BadRequestException, Injectable } from '@nestjs/common';
import { ProjectMaterialRepository } from './project-material.repository';
import { AddProjectMaterialDto } from './dto/add-project-material.dto';
import { QueryProjectMaterialDto } from './dto/query-project-material.dto';
import { Prisma } from '@/generated/prisma/client';
import { InventoryService } from '../inventory/inventory.service';
import { ProjectService } from '../project/project.service';
import { ProjectStatus } from '../project/domain/project-status.enum';

@Injectable()
export class ProjectMaterialService {
  constructor(
    private readonly repo: ProjectMaterialRepository,
    private readonly inventoryService: InventoryService,
    private readonly projectsService: ProjectService,
  ) {}

  async addMaterial(dto: AddProjectMaterialDto) {
    const project = await this.projectsService.getById(dto.projectId);

    if (project.status !== ProjectStatus.DRAFT) {
      throw new BadRequestException(
        'Materials can be added only in DRAFT status',
      );
    }

    const projectInventory = await this.repo.getByProjectInventory(
      dto.projectId,
      dto.inventoryItemId,
    );

    if (projectInventory) {
      await this.inventoryService.reserve(dto.inventoryItemId, dto.quantity);

      return this.repo.update(projectInventory.id, {
        quantity: dto.quantity + projectInventory.quantity,
        reserved: dto.quantity + projectInventory.reserved,
      });
    }

    await this.inventoryService.reserve(dto.inventoryItemId, dto.quantity);

    return this.repo.create({
      project: { connect: { id: dto.projectId } },
      inventoryItem: { connect: { id: dto.inventoryItemId } },
      quantity: dto.quantity,
      reserved: dto.quantity,
    });
  }

  async consumeMaterial(projectMaterialId: string, quantity: number) {
    const pm = await this.repo.getById(projectMaterialId);

    if (pm.quantity < quantity) {
      throw new BadRequestException('Not enough items in stock');
    }

    const pm_new = await this.repo.update(projectMaterialId, {
      consumed: pm.consumed + quantity,
      quantity: pm.reserved - quantity - pm.consumed,
    });

    await this.inventoryService.consume(pm_new.inventoryItemId, quantity);

    return pm_new;
  }

  async cancelReserve(projectMaterialId: string, quantity: number) {
    const pm = await this.repo.getById(projectMaterialId);

    if (pm.quantity < quantity || pm.reserved < quantity) {
      throw new BadRequestException('Not enough items to cancel reserve');
    }

    await this.inventoryService.cancelReserve(pm.inventoryItemId, quantity);
    return await this.repo.update(projectMaterialId, {
      reserved: pm.reserved - quantity,
      quantity: pm.quantity - quantity
    });
  }

  async getMany(query: QueryProjectMaterialDto) {
    const where: Prisma.ProjectMaterialWhereInput = {
      ...(query.projectId && { projectId: query.projectId }),
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

  async delete(id: string) {
    const pm = await this.repo.getById(id);

    await this.inventoryService.cancelReserve(pm.inventoryItemId, pm.quantity);

    return this.repo.delete(id);
  }
}
