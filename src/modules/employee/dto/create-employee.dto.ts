import { SalaryType } from '@/generated/prisma/enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDecimal, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @ApiPropertyOptional({ example: 'Some' })
  @IsString()
  firstName: string;

  @ApiPropertyOptional({ example: 'name' })
  @IsString()
  lastName: string;

  @ApiPropertyOptional({ example: '+380123456789' })
  @IsOptional()
  @IsString()
  phone?: string;
  
  @ApiPropertyOptional({ example: 'example@gmail.com' })
  @IsOptional()
  @IsString()
  email?: string;
  
  @ApiPropertyOptional({ example: 'Manager' })
  @IsString()
  position: string;
  
  @ApiPropertyOptional({ example: 'FIXED' })
  @IsEnum(SalaryType)
  salaryType: SalaryType;
  
  @ApiPropertyOptional({ example: '15000.0' })
  @IsDecimal()
  salaryRate: string;
}
