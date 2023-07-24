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
  user: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  isAvailable: boolean;
}
