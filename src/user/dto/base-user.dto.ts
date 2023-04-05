import { ApiProperty } from '@nestjs/swagger';
import { isDate } from 'lodash';
import { Type } from 'class-transformer';

export class DateType extends Date {
  constructor(value: any) {
    super(value);
  }

  static fromJson(value: string): Date {
    const date = isDate(value) ? value : new Date(value);
    return new DateType(date);
  }
}

export function TransformToDate() {
  return Type(() => Date);
}

export class BaseUserDto {
  @ApiProperty()
  nom: string;
  @ApiProperty()
  prenom: string;
  @ApiProperty()
  email: string;

  @ApiProperty()
  dateNaiss?: string;
}
