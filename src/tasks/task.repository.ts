import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto

    const task: Task = new Task()
    task.title = title
    task.description = description
    task.status = 'OPEN'
    await task.save()

    return task
  }

}