import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Accommodation,
  AccommodationDocument,
} from './schemas/accommodation.schema';
import { Model } from 'mongoose';
import { CreateAccommodationDto } from './dto/create-accommodation.dto';
import { UpdateAccommodationDto } from './dto/update-accommodation.dto';

@Injectable()
export class AccommodationService {
  constructor(
    @InjectModel(Accommodation.name)
    private readonly model: Model<AccommodationDocument>,
  ) {}
  async findAll(): Promise<Accommodation[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<Accommodation> {
    return await this.model.findById(id).exec();
  }

  async create(
    createAccommodationDto: CreateAccommodationDto,
  ): Promise<Accommodation | HttpException> {
    return await new this.model({
      ...createAccommodationDto,
      createdAt: new Date(),
    }).save();
  }

  async update(
    id: string,
    updateAccommodationDto: UpdateAccommodationDto,
  ): Promise<Accommodation> {
    return this.model.findByIdAndUpdate(id, updateAccommodationDto, {
      new: true,
    });
  }
  async delete(id: string): Promise<Accommodation> {
    return this.model.findByIdAndRemove(id);
  }
}
