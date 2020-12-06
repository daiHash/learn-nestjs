import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus, taskStatuses } from "src/tasks/taskStatus.types";

export class TaskStatusValidationPipe implements PipeTransform {
  transform(value: TaskStatus) {
    if (!this.isValidStatus(value)) {
      throw new BadRequestException(`${value} is an invalid status`)
    }
    return value
  }

  private isValidStatus(status: TaskStatus) {
    return taskStatuses.includes(status)
  }
}