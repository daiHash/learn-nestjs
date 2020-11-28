import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = []

  getAllTasks(): Task[] {
    return this.tasks
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id)
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto

    const task: Task = { id: '1', title, description, status: 'OPEN' }

    this.tasks.push(task)
    return task
  }

  updateTaskStatus(id: string, status: Task['status']): Task {
    const task = this.getTaskById(id)
    task['status'] = status
    return task
  }
}
