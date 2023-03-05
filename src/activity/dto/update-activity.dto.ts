import { BaseActivityDto } from './base-activity.dto';

export class UpdateActivityDto extends BaseActivityDto {
  completedAt: Date;
}
