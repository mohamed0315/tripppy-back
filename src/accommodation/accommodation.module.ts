import { Module } from '@nestjs/common';
import { AccommodationService } from './accommodation.service';
import { AccommodationController } from './accommodation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Accommodation,
  AccommodationSchema,
} from './schemas/accommodation.schema';

@Module({
  providers: [AccommodationService],
  controllers: [AccommodationController],
  imports: [
    MongooseModule.forFeature([
      { name: Accommodation.name, schema: AccommodationSchema },
    ]),
  ],
})
export class AccommodationModule {}
