import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ example: 'Some name' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiPropertyOptional({ example: '+380123456789' })
  @IsOptional()
  @IsString()
  phone?: string;
  
  @ApiPropertyOptional({ example: 'example@gmail.com' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ example: 'Halytska st.' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: 'Some notes' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
