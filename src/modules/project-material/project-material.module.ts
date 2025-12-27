import { Module } from '@nestjs/common';
import { ProjectMaterialController } from './project-material.controller';
import { ProjectMaterialService } from './project-material.service';
import { ProjectMaterialRepository } from './project-material.repository';
import { InventoryModule } from '../inventory/inventory.module';
import { ProjectModule } from '../project/project.module';

@Module({
  imports: [InventoryModule, ProjectModule],
  controllers: [ProjectMaterialController],
  providers: [ProjectMaterialService, ProjectMaterialRepository],
  exports: [ProjectMaterialService],
})
export class ProjectMaterialModule {}
