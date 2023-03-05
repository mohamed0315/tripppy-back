import { BaseDestinationDto } from './base-destination.dto';

export class UpdateDestinationDto extends BaseDestinationDto {
  completedAt: Date;
}
