import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFiltereDto } from './dto/getTasksfiltered.dto';
import { Task } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = []

  getAllTasks(): Task[] {
    return this.tasks
  }

  getTasksWithFilters(filterDto: GetTasksFiltereDto): Task[] {
    const {status, search} = filterDto
    let tasks =this.getAllTasks()

    if (status) {
      tasks = tasks.filter(task => task.status ===status)
    }
    if (search) {
      tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))
    }

    return tasks
  }

  getTaskById(id: string): Task {
    const task =  this.tasks.find((task) => task.id === id)
    if (!task) {
      throw new NotFoundException(`Task with id: ${id} does not exist`)
    }
    return task
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

  deleteTaskById(id: string): Task {
    const task  = this.getTaskById(id)
    const taskIndex = this.tasks.indexOf(task)

    this.tasks.splice(taskIndex, 1)

    return task
  }
}
