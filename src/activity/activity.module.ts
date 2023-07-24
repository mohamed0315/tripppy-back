import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Activity, ActivitySchema } from './schemas/activity.schema';
import {
  Destination,
  DestinationSchema,
} from '../destination/schemas/destination.schema';
import { S3Service } from '../s3-service/s3-service.service';

@Module({
  providers: [ActivityService, S3Service],
  controllers: [ActivityController],
  imports: [
    MongooseModule.forFeature([
      { name: Activity.name, schema: ActivitySchema },
    ]),
    MongooseModule.forFeature([
      { name: Destination.name, schema: DestinationSchema },
    ]),
  ],
})
export class ActivityModule {}
