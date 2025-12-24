import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class Create{{Name}}Dto {
  @ApiPropertyOptional({ example: 'Some name' })
  @IsString()
  name: string;
}
