import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFiltereDto } from "./dto/getTasksfiltered.dto";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getAllTasks(filterDto: GetTasksFiltereDto): Promise<Task[]> {
    const { status, search } = filterDto
    const query = this.createQueryBuilder('task')

    if (status) {
      query.andWhere('task.status = :status', { status })
    }
    if (search) {
      query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` })
    }

    const tasks = await query.getMany()
    return tasks
  }

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