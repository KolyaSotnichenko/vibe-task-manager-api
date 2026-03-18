import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TasksService, Task } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create task' })
  @ApiResponse({ status: 201, type: Object })
  create(@Body() dto: CreateTaskDto): Task {
    return this.tasksService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List tasks' })
  @ApiResponse({ status: 200, type: [Object] })
  findAll(): Task[] {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get task by id' })
  @ApiResponse({ status: 200, type: Object })
  findOne(@Param('id') id: string): Task {
    return this.tasksService.findOne(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update task' })
  @ApiResponse({ status: 200, type: Object })
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto): Task {
    return this.tasksService.update(Number(id), dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete task' })
  @ApiResponse({ status: 204 })
  remove(@Param('id') id: string): void {
    this.tasksService.remove(Number(id));
  }
}
