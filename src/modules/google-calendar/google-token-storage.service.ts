import { Injectable } from '@nestjs/common';

export interface GoogleTokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class GoogleTokenStorageService {
  private readonly store = new Map<string, GoogleTokens>();

  async storeTokens(userId: string, tokens: GoogleTokens): Promise<void> {
    this.store.set(userId, tokens);
  }

  async getTokens(userId: string): Promise<GoogleTokens | null> {
    return this.store.get(userId) ?? null;
  }
}
