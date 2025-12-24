import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDecimal, IsEnum, IsOptional, IsString } from 'class-validator';
import { ProjectStatus as ProjectStatus } from '../domain/project-status.enum';

export class CreateProjectDto {
  @ApiProperty({ example: 'Some name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Some name' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'DRAFT' })
  @IsEnum(ProjectStatus)
  status: ProjectStatus;

  @ApiProperty({ example: 'id' })
  @IsString()
  clientId: string;

  @ApiPropertyOptional({ example: '15.50' })
  @IsDecimal()
  @IsOptional()
  totalPrice?: string;
}
