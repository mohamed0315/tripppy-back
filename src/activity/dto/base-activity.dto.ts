import { ApiProperty } from '@nestjs/swagger';

export class BaseActivityDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  imageUrl?: string;
}
