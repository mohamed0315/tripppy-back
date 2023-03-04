import { ApiProperty } from '@nestjs/swagger';

export class BaseAccommodationDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  isAvailable: boolean;
}
