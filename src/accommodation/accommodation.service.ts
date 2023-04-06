import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Accommodation,
  AccommodationDocument,
} from './schemas/accommodation.schema';
import { Model } from 'mongoose';
import { CreateAccommodationDto } from './dto/create-accommodation.dto';
import { UpdateAccommodationDto } from './dto/update-accommodation.dto';
import {
  Destination,
  DestinationDocument,
} from '../destination/schemas/destination.schema';
import { S3Service } from '../s3-service/s3-service.service';
import { User, UserDocument } from '../user/schemas/user.schema';

@Injectable()
export class AccommodationService {
  constructor(
    @InjectModel(Accommodation.name)
    private readonly model: Model<AccommodationDocument>,
    @InjectModel(Destination.name)
    private readonly destinationModel: Model<DestinationDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly s3Service: S3Service,
  ) {}
  async findAll(): Promise<Accommodation[]> {
    const accommodations = await this.model
      .find()
      .populate('destination')
      .exec();
    const updatedAccommodations = await Promise.all(
      accommodations.map(async (accommodation) => {
        // Check if the images property exists before modifying it
        if (accommodation.images) {
          accommodation.images = await Promise.all(
            accommodation.images.map((image) => {
              return this.s3Service.downloadLink(image);
            }),
          );
        }
        return accommodation;
      }),
    );
    return updatedAccommodations;
  }

  async findByZipCode(zipcode: string): Promise<Accommodation[]> {
    const accommodations = await this.model
      .find()
      .populate('destination')
      .exec();
    const updatedAccommodations = await Promise.all(
      accommodations.map(async (accommodation) => {
        // Check if the images property exists before modifying it
        if (accommodation.images) {
          accommodation.images = await Promise.all(
            accommodation.images.map((image) => {
              return this.s3Service.downloadLink(image);
            }),
          );
        }
        return accommodation;
      }),
    );

    const filteredAccommodations = updatedAccommodations.filter(
      (accommodation) => {
        return (
          accommodation.destination &&
          accommodation.destination.zipcode === zipcode
        );
      },
    );
    return filteredAccommodations;
  }

  async findOne(id: string): Promise<Accommodation> {
    const accommodation = await this.model
      .findById(id)
      .populate('destination')
      .exec();
    if (accommodation.images) {
      accommodation.images = await Promise.all(
        accommodation.images.map(
          async (image) => await this.s3Service.downloadLink(image),
        ),
      );
    }

    return accommodation;
  }

  async create(
    createAccommodationDto: CreateAccommodationDto,
    fileKey: string,
    userEmail: string,
  ): Promise<Accommodation | HttpException> {
    let destination: DestinationDocument;
    const existedDestination = await this.destinationModel.findOne({
      zipcode: createAccommodationDto.zipcode,
    });

    const newDestination = new this.destinationModel({
      name: createAccommodationDto.address,
      country: createAccommodationDto.country,
      city: createAccommodationDto.city,
      zipcode: createAccommodationDto.zipcode,
      description: createAccommodationDto.descriptionDestination,
      createdAt: new Date(),
    });

    if (!existedDestination) {
      destination = await newDestination.save();
    } else {
      destination = existedDestination;
    }

    const newAccommodation = new this.model({
      ...createAccommodationDto,
      destination: destination._id,
      images: [fileKey],
      createdAt: new Date(),
    });

    const savedAccommodation = await newAccommodation.save();

    await this.destinationModel
      .findByIdAndUpdate(destination._id, {
        $push: { accommodations: savedAccommodation._id },
      })
      .exec();

    const user = await this.userModel.findOne({ email: userEmail }).exec();

    await this.userModel
      .findByIdAndUpdate(user._id, {
        $push: { accommodations: savedAccommodation._id },
      })
      .exec();

    return savedAccommodation;
  }

  async update(
    id: string,
    updateAccommodationDto: UpdateAccommodationDto,
  ): Promise<Accommodation> {
    return this.model.findByIdAndUpdate(id, updateAccommodationDto, {
      new: true,
    });
  }

  async addImageToAccommodation(
    id: string,
    image: string,
  ): Promise<Accommodation> {
    const accommodation = await this.model.findByIdAndUpdate(
      id,
      { $addToSet: { images: image } },
      { new: true },
    );

    if (!accommodation) {
      throw new Error(`Accommodation with id ${id} not found`);
    }

    return accommodation;
  }

  async delete(id: string): Promise<Accommodation> {
    return this.model.findByIdAndRemove(id);
  }
}
