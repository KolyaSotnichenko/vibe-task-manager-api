export interface GoogleTokenPayload {
  accessToken: string;
  refreshToken?: string;
  expiryDate?: number;
}
