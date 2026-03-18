import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  googleCalendarEventId?: string;
}

export enum TaskStatus {
  Pending = 'pending',
  InProgress = 'in_progress',
  Done = 'done',
}

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private idSeq = 1;

  constructor(
    private readonly calendarClient: import('../google-calendar/google-calendar-client.service').GoogleCalendarClientService,
  ) {}

  create(dto: CreateTaskDto): Task {
    const task: Task = {
      id: this.idSeq++,
      title: dto.title,
      description: dto.description,
      status: TaskStatus.Pending,
      googleCalendarEventId: dto.googleCalendarEventId,
    };
    this.tasks.push(task);
    // side-effect after persistence
    this.calendarClient
      .createEventFromTask('default-user', {
        id: String(task.id),
        title: task.title,
        description: task.description,
      })
      .then((eventId) => {
        task.googleCalendarEventId = eventId;
      })
      .catch(() => undefined);
    return task;
  }

  findAll(filter?: { status?: TaskStatus }): Task[] {
    if (filter?.status) {
      return this.tasks.filter((t) => t.status === filter.status);
    }
    return this.tasks;
  }

  findOne(id: number): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) throw new NotFoundException({ error: 'Task not found', code: 'TASK_NOT_FOUND' });
    return task;
  }

  update(id: number, dto: UpdateTaskDto): Task {
    const task = this.findOne(id);
    if (dto.title !== undefined) task.title = dto.title;
    if (dto.description !== undefined) task.description = dto.description;
    if (dto.googleCalendarEventId !== undefined)
      task.googleCalendarEventId = dto.googleCalendarEventId;
    this.calendarClient
      .updateEventFromTask('default-user', {
        id: String(task.id),
        title: task.title,
        description: task.description,
        googleCalendarEventId: task.googleCalendarEventId,
      })
      .catch(() => undefined);
    return task;
  }

  remove(id: number): void {
    const idx = this.tasks.findIndex((t) => t.id === id);
    if (idx === -1)
      throw new NotFoundException({ error: 'Task not found', code: 'TASK_NOT_FOUND' });
    const [task] = this.tasks.splice(idx, 1);
    this.calendarClient
      .deleteEventByTask('default-user', {
        id: String(task.id),
        title: task.title,
        description: task.description,
        googleCalendarEventId: task.googleCalendarEventId,
      })
      .catch(() => undefined);
  }
}
