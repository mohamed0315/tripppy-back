import { BaseAccommodationDto } from "./base-accommodation.dto";

export class UpdateAccommodationDto extends BaseAccommodationDto {
  completedAt: Date;
}
