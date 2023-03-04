import { ApiProperty } from '@nestjs/swagger';

export class BaseUserDto {
  @ApiProperty()
  nom: string;
  @ApiProperty()
  prenom: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  dateNaiss?: Date;
}
