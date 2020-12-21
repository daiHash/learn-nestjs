import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFiltereDto } from './dto/getTasksfiltered.dto'
import { TaskStatusValidationPipe } from './dto/pipes/taskStatusValidation.pipe'
import { Task } from './task.entity'
import { TasksService } from './tasks.service'

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFiltereDto) {
    return this.tasksService.getAllTasks(filterDto)
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto)
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: Task['status']
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status)
  }

  @Delete('/:id')
  deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.tasksService.deleteTaskById(id)
  }
}
