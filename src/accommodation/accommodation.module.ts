import { Module } from '@nestjs/common';
import { AccommodationService } from './accommodation.service';
import { AccommodationController } from './accommodation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Accommodation,
  AccommodationSchema,
} from './schemas/accommodation.schema';
import {
  Destination,
  DestinationSchema,
} from '../destination/schemas/destination.schema';

@Module({
  providers: [AccommodationService],
  controllers: [AccommodationController],
  imports: [
    MongooseModule.forFeature([
      { name: Accommodation.name, schema: AccommodationSchema },
    ]),
    MongooseModule.forFeature([
      { name: Destination.name, schema: DestinationSchema },
    ]),
  ],
})
export class AccommodationModule {}
