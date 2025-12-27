import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional, IsNumber } from "class-validator";

export class UpdateInventoryDto {
  @ApiPropertyOptional({ example: 'Some name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'abc123' })
  @IsOptional()
  @IsString()
  sku?: string;

  @ApiPropertyOptional({ example: 'm' })
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsNumber()
  unitPrice?: number;
}