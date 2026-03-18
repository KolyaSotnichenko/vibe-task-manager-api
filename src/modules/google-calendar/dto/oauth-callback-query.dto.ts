import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OAuthCallbackQueryDto {
  @ApiProperty()
  @IsString()
  code!: string;
}
