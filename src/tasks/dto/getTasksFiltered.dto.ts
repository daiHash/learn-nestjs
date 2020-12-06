import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { taskStatuses, TaskStatus } from "../taskStatus.types";

export class GetTasksFiltereDto {
  @IsOptional()
  @IsIn([...taskStatuses])
  status: TaskStatus

  @IsOptional()
  @IsNotEmpty()
  search: string
}