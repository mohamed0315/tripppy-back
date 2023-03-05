import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Activity, ActivityDocument } from './schemas/activity.schema';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Model } from 'mongoose';

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(Activity.name)
    private readonly model: Model<ActivityDocument>,
  ) {}

  async findAll(): Promise<Activity[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<Activity> {
    return await this.model.findById(id).exec();
  }

  async create(
    createActivityDto: CreateActivityDto,
  ): Promise<Activity | HttpException> {
    return await new this.model({
      ...createActivityDto,
      createdAt: new Date(),
    }).save();
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
