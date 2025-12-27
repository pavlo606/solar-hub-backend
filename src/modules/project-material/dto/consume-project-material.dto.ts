import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class ConsumeProjectMaterialDto {
  @ApiPropertyOptional({ example: 'id' })
  @IsString()
  projectMaterialId: string;

  @ApiPropertyOptional({ example: 1 })
  @IsInt()
  @Min(1)
  quantity: number;
}
