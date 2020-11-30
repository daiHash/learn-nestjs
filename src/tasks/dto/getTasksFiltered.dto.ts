import { TaskStatus } from "../tasks.model";

export class GetTasksFiltereDto {
  status: TaskStatus
  search: string
}