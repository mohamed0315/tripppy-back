import { ApiProperty } from '@nestjs/swagger';

export class BaseAccommodationDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  address: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  zipcode: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  descriptionDestination: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  isAvailable: boolean;
}
