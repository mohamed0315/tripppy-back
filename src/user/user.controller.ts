import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @Get()
  async index() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(FirebaseAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Authentification',
  })
  async find(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Post()
  @ApiUnauthorizedResponse({ description: 'Non autorisé' })
  @ApiResponse({ status: 201, description: "L'utilisateur a bien été crée" })
  @ApiResponse({
    status: 400,
    description: "L'utilisateur existe déja en base de données",
  })
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Put(':id')
  @UseGuards(FirebaseAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Authentification',
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(FirebaseAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Authentification',
  })
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
