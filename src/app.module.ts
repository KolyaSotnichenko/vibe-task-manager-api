import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [HealthModule, TasksModule],
})
export class AppModule {}
