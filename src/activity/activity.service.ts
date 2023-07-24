import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Activity, ActivityDocument } from './schemas/activity.schema';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Model } from 'mongoose';
import {
  Destination,
  DestinationDocument,
} from '../destination/schemas/destination.schema';
import { S3Service } from '../s3-service/s3-service.service';

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(Activity.name)
    private readonly model: Model<ActivityDocument>,
    @InjectModel(Destination.name)
    @InjectModel(Destination.name)
    private readonly destinationModel: Model<DestinationDocument>,
    private readonly s3Service: S3Service,
  ) {}

  async findAll(): Promise<Activity[]> {
    const activities = await this.model.find().populate('destination').exec();
    const updatedActivities = await Promise.all(
      activities.map(async (activity) => {
        if (activity.image) {
          activity.image = await this.s3Service.downloadLink(activity.image);
        }
        return activity;
      }),
    );

    return updatedActivities;
  }

  async findOne(id: string): Promise<Activity> {
    const activity = await this.model
      .findById(id)
      .populate('destination')
      .exec();
    if (activity.image) {
      activity.image = await this.s3Service.downloadLink(activity.image);
    }
    return activity;
  }

  async create(
    createActivityDto: CreateActivityDto,
    fileKey: string,
  ): Promise<Activity | HttpException> {
    let destination: DestinationDocument;
    const existedDestination = await this.destinationModel.findOne({
      zipcode: createActivityDto.zipcode,
    });
    const newDestination = new this.destinationModel({
      name: createActivityDto.address,
      country: createActivityDto.country,
      city: createActivityDto.city,
      zipcode: createActivityDto.zipcode,
      description: createActivityDto.descriptionDestination,
      createdAt: new Date(),
    });
    if (!existedDestination) {
      destination = await newDestination.save();
    } else {
      destination = existedDestination;
    }

    const newActivity = new this.model({
      ...createActivityDto,
      destination: destination._id,
      image: fileKey,
      createdAt: new Date(),
    });

    const savedActivity = await newActivity.save();

    await this.destinationModel
      .findByIdAndUpdate(destination._id, {
        $push: { activities: savedActivity._id },
      })
      .exec();

    return savedActivity;
  }

  async update(
    id: string,
    updateActivityDto: UpdateActivityDto,
  ): Promise<Activity> {
    return this.model.findByIdAndUpdate(id, updateActivityDto, {
      new: true,
    });
  }

  async delete(id: string): Promise<Activity> {
    return this.model.findByIdAndRemove(id);
  }
}
