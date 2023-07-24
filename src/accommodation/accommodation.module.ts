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
import { S3Service } from '../s3-service/s3-service.service';
import { User, UserSchema } from '../user/schemas/user.schema';

@Module({
  providers: [AccommodationService, S3Service],
  controllers: [AccommodationController],
  imports: [
    MongooseModule.forFeature([
      { name: Accommodation.name, schema: AccommodationSchema },
    ]),
    MongooseModule.forFeature([
      { name: Destination.name, schema: DestinationSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class AccommodationModule {}
