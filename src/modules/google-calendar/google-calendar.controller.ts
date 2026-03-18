import { Controller, Get, Query, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { GoogleOAuthService } from './google-oauth.service';
import { OAuthCallbackQueryDto } from './dto/oauth-callback-query.dto';

@ApiTags('google-calendar')
@Controller('google/oauth')
export class GoogleCalendarController {
  constructor(private readonly oauthService: GoogleOAuthService) {}

  @Get('start')
  start(@Res() res: Response): void {
    const url = this.oauthService.getAuthUrl();
    res.redirect(url);
  }

  @Get('callback')
  async callback(@Query() query: OAuthCallbackQueryDto, @Res() res: Response): Promise<void> {
    await this.oauthService.handleCallback(query.code);
    res.status(200).send('Google account linked');
  }
}
