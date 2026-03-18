import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TasksService, Task } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() dto: CreateTaskDto): Task {
    return this.tasksService.create(dto);
  }

  @Get()
  findAll(): Task[] {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Task {
    return this.tasksService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto): Task {
    return this.tasksService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    this.tasksService.remove(Number(id));
  }
}
