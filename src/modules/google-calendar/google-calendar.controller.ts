import { Controller, Get, Query, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { GoogleCalendarService } from './google-calendar.service';
import { GoogleOauthCallbackDto } from './dto/google-oauth-callback.dto';
import { GOOGLE_TOKEN_COOKIE } from './google-calendar.constants';

@ApiTags('google-calendar')
@Controller('google')
export class GoogleCalendarController {
  constructor(private readonly googleCalendarService: GoogleCalendarService) {}

  @Get('oauth/start')
  @ApiOperation({ summary: 'Start Google OAuth flow' })
  startOAuth(@Res() res: Response): void {
    const url = this.googleCalendarService.buildAuthUrl();
    res.redirect(url);
  }

  @Get('oauth/callback')
  @ApiOperation({ summary: 'Handle Google OAuth callback' })
  async oauthCallback(
    @Query() query: GoogleOauthCallbackDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ success: true }> {
    const token = await this.googleCalendarService.exchangeCodeForToken(query.code);

    const encoded = Buffer.from(JSON.stringify(token)).toString('base64');

    res.cookie(GOOGLE_TOKEN_COOKIE, encoded, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });

    return { success: true };
  }
}
