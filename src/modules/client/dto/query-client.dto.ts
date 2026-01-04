import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class QueryClientDto {
  @ApiPropertyOptional({
    type: String,
    description: 'Search query',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;

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

  @ApiPropertyOptional({
    type: String,
    description: 'SortBy',
    required: false,
  })
  @IsOptional()
  @IsString()
  sortBy: string;

  @ApiPropertyOptional({
    type: String,
    description: 'SortOrder',
    required: false,
  })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortOrder: 'asc' | 'desc' = 'asc';
}
