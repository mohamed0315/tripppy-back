import { ApiProperty } from '@nestjs/swagger';

export class BaseDestinationDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  country: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  description: string;

  @ApiProperty()
  imageUrl?: string;

  @ApiProperty()
  latitude?: string;

  @ApiProperty()
  longitude?: string;
}
