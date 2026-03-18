import { Module } from '@nestjs/common';
import { GoogleCalendarController } from './google-calendar.controller';
import { GoogleOAuthService } from './google-oauth.service';
import { GoogleCalendarClientService } from './google-calendar-client.service';
import { GoogleTokenStorageService } from './google-token-storage.service';

@Module({
  controllers: [GoogleCalendarController],
  providers: [GoogleOAuthService, GoogleCalendarClientService, GoogleTokenStorageService],
  exports: [GoogleCalendarClientService],
})
export class GoogleCalendarModule {}
