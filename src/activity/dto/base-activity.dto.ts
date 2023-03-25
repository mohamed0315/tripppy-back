import { ApiProperty } from '@nestjs/swagger';

export class BaseActivityDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;

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
}
