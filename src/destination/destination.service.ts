import { Injectable } from '@nestjs/common';
import { Destination, DestinationDocument } from './schemas/destination.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';

@Injectable()
export class DestinationService {
  constructor(
    @InjectModel(Destination.name)
    private readonly model: Model<DestinationDocument>,
  ) {}

  async create(
    createDestinationDto: CreateDestinationDto,
  ): Promise<Destination> {
    return await new this.model({
      ...createDestinationDto,
      createdAt: new Date(),
    }).save();
  }

  async findAll(): Promise<Destination[]> {
    return this.model.find().exec();
  }

  async findOne(id: string): Promise<Destination> {
    return this.model.findById(id).exec();
  }

  async update(
    id: string,
    updateDestinationDto: UpdateDestinationDto,
  ): Promise<Destination> {
    return this.model.findByIdAndUpdate(id, updateDestinationDto, {
      new: true,
    });
  }

  async delete(id: string): Promise<Destination> {
    return this.model.findByIdAndRemove(id);
  }
}
