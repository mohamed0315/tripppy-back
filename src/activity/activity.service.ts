import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Activity, ActivityDocument } from './schemas/activity.schema';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Model } from 'mongoose';
import { Destination, DestinationDocument } from "../destination/schemas/destination.schema";

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(Activity.name)
    private readonly model: Model<ActivityDocument>,    @InjectModel(Destination.name)
    private readonly destinationModel: Model<DestinationDocument>,

  ) {}

  async findAll(): Promise<Activity[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<Activity> {
    return await this.model.findById(id).exec();
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
