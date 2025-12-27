import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class ActionInventoryDto {
  @ApiPropertyOptional({ example: 'id' })
  @IsString()
  itemId: string;

  @ApiPropertyOptional({ example: 1 })
  @IsInt()
  @Min(0)
  quantity: number;
}
