import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { google, calendar_v3 } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { GOOGLE_OAUTH_SCOPES } from './google-calendar.constants';
import { GoogleTokenPayload } from './types/google-token.types';

@Injectable()
export class GoogleCalendarService {
  private readonly oauthClient: OAuth2Client;

  constructor() {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI;

    if (!clientId || !clientSecret || !redirectUri) {
      throw new InternalServerErrorException({
        error: 'Google OAuth configuration missing',
        code: 'GOOGLE_OAUTH_CONFIG_ERROR',
      });
    }

    this.oauthClient = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
  }

  buildAuthUrl(): string {
    return this.oauthClient.generateAuthUrl({
      access_type: 'offline',
      scope: GOOGLE_OAUTH_SCOPES,
      prompt: 'consent',
    });
  }

  async exchangeCodeForToken(code: string): Promise<GoogleTokenPayload> {
    try {
      const { tokens } = await this.oauthClient.getToken(code);
      return {
        accessToken: tokens.access_token as string,
        refreshToken: tokens.refresh_token,
        expiryDate: tokens.expiry_date,
      };
    } catch (error: unknown) {
      throw new InternalServerErrorException({
        error: 'Failed to exchange Google OAuth code',
        code: 'GOOGLE_OAUTH_EXCHANGE_FAILED',
      });
    }
  }

  private getCalendarClient(token: GoogleTokenPayload): calendar_v3.Calendar {
    this.oauthClient.setCredentials({
      access_token: token.accessToken,
      refresh_token: token.refreshToken,
      expiry_date: token.expiryDate,
    });

    return google.calendar({ version: 'v3', auth: this.oauthClient });
  }

  async createEvent(token: GoogleTokenPayload, event: calendar_v3.Schema$Event): Promise<string> {
    const calendar = this.getCalendarClient(token);
    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    });

    return response.data.id as string;
  }

  async updateEvent(
    token: GoogleTokenPayload,
    eventId: string,
    event: calendar_v3.Schema$Event,
  ): Promise<void> {
    const calendar = this.getCalendarClient(token);
    await calendar.events.update({
      calendarId: 'primary',
      eventId,
      requestBody: event,
    });
  }

  async deleteEvent(token: GoogleTokenPayload, eventId: string): Promise<void> {
    const calendar = this.getCalendarClient(token);
    await calendar.events.delete({
      calendarId: 'primary',
      eventId,
    });
  }
}
