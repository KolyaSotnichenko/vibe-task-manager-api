import { IsString } from 'class-validator';

export class GoogleOauthCallbackDto {
  @IsString()
  code!: string;
}
