import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFiltereDto } from './dto/getTasksfiltered.dto'
import { Task } from './task.entity'
import { TaskRepository } from './task.repository'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne(id)
    if (!task) {
      throw new NotFoundException(`Task with id: ${id} does not exist`)
    }
    return task
  }

  async getAllTasks(filterDto: GetTasksFiltereDto): Promise<Task[]> {
    return this.taskRepository.getAllTasks(filterDto)
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto)
  }

  async updateTaskStatus(id: number, status: Task['status']): Promise<Task> {
    const task = await this.getTaskById(id)
    task['status'] = status
    await task.save()
    return task
  }

  async deleteTaskById(id: number): Promise<string> {
    const result = await this.taskRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id: ${id} does not exist`)
    }
    return `Task with id: ${id} was deleted`
  }
}
