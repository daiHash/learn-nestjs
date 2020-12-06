import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFiltereDto } from './dto/getTasksfiltered.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { taskStatuses } from './taskStatus.types';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}

  async getTaskById(id: number):Promise<Task> {
    const task = await this.taskRepository.findOne(id)
    if (!task) {
      throw new NotFoundException(`Task with id: ${id} does not exist`)
    }
    return task
  }
  // getAllTasks(): Task[] {
  //   return this.tasks
  // }

  // getTasksWithFilters(filterDto: GetTasksFiltereDto): Task[] {
  //   const {status, search} = filterDto
  //   let tasks =this.getAllTasks()

  //   if (status) {
  //     tasks = tasks.filter(task => task.status ===status)
  //   }
  //   if (search) {
  //     tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))
  //   }

  //   return tasks
  // }

  // getTaskById(id: string): Task {
  //   const task =  this.tasks.find((task) => task.id === id)
  //   if (!task) {
  //     throw new NotFoundException(`Task with id: ${id} does not exist`)
  //   }
  //   return task
  // }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto)
  }

  // updateTaskStatus(id: string, status: Task['status']): Task {
  //   const task = this.getTaskById(id)
  //   task['status'] = status
  //   return task
  // }

  async deleteTaskById(id: number): Promise<string> {
    // const task  = await this.getTaskById(id)
    const result = await this.taskRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id: ${id} does not exist`)
    }
    return `Task with id: ${id} was deleted`
  }
}
