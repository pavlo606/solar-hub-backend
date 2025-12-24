import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ProjectStatus } from '../domain/project-status.enum';

export class QueryProjectDto {
  @ApiPropertyOptional({
    type: String,
    description: 'Client id',
    required: false,
  })
  @IsString()
  @IsOptional()
  clientId?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Project Status',
    required: false,
  })
  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @ApiPropertyOptional({
    type: Number,
    description: 'Page',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @ApiPropertyOptional({
    type: Number,
    description: 'Limit',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit = 20;
}
