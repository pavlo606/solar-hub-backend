import { IsEnum } from "class-validator";
import { ProjectStatus } from "../domain/project-status.enum";
import { ApiProperty } from "@nestjs/swagger";

export class ChangeProjectStatusDto {
  @ApiProperty({ example: 'DRAFT' })
  @IsEnum(ProjectStatus)
  status: ProjectStatus;
}