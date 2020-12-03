import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFiltereDto } from './dto/getTasksfiltered.dto';
import { TaskStatusValidationPipe } from './dto/pipes/taskStatusValidation.pipe';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFiltereDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto)
    }
    return this.tasksService.getAllTasks()
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto)
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: Task['status']
  ): Task {
    return this.tasksService.updateTaskStatus(id, status)
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Task {
    return this.tasksService.deleteTaskById(id)
  }
}
