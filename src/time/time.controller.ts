import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { TimeService } from './time.service';

@ApiTags('time')
@Controller('time')
export class TimeController {
  constructor(private readonly timeService: TimeService) {}

  @Get()
  @ApiQuery({ name: 'timezone', required: false })
  getTime(@Query('timezone') timezone?: string) {
    return this.timeService.getCurrentTime(timezone);
  }
}
