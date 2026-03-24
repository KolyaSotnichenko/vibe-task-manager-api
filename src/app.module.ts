import { Module } from '@nestjs/common';
import { TimeController } from './time/time.controller';
import { TimeService } from './time/time.service';

@Module({
  imports: [],
  controllers: [TimeController],
  providers: [TimeService],
})
export class AppModule {}
