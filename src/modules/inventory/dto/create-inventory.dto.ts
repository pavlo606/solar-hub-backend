import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateInventoryDto {
  @ApiPropertyOptional({ example: 'Some name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'abc123' })
  @IsString()
  sku: string;

  @ApiPropertyOptional({ example: 'm' })
  @IsString()
  unit: string;

  @ApiPropertyOptional({ example: 5 })
  @IsInt()
  @Min(0)
  quantity: number;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsNumber()
  unitPrice?: number;
}
