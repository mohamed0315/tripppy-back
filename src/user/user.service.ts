import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return await this.model.findById(id).exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User | HttpException> {
    const existingUser = await this.model.findOne({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    return await new this.model({
      ...createUserDto,
      createdAt: new Date(),
    }).save();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.model.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async delete(id: string): Promise<User> {
    return this.model.findByIdAndRemove(id);
  }
}
