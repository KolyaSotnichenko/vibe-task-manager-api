import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { GoogleCalendarModule } from './modules/google-calendar/google-calendar.module';

@Module({
  imports: [HealthModule, TasksModule, GoogleCalendarModule],
})
export class AppModule {}
