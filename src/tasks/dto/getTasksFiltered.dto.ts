import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus, taskStatuses } from "../tasks.model";

export class GetTasksFiltereDto {
  @IsOptional()
  @IsIn([...taskStatuses])
  status: TaskStatus

  @IsOptional()
  @IsNotEmpty()
  search: string
}