import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class AddProjectMaterialDto {
  @ApiPropertyOptional({ example: 'id' })
  @IsString()
  projectId: string;

  @ApiPropertyOptional({ example: 'id' })
  @IsString()
  inventoryItemId: string;

  @ApiPropertyOptional({ example: 1 })
  @IsInt()
  @Min(1)
  quantity: number;
}
