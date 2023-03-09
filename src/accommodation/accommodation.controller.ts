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
import { AccommodationService } from './accommodation.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { Accommodation } from './schemas/accommodation.schema';
import { CreateAccommodationDto } from './dto/create-accommodation.dto';
import { UpdateAccommodationDto } from './dto/update-accommodation.dto';

@ApiTags('accommodations')
@Controller('accommodation')
export class AccommodationController {
  constructor(private readonly accommodationService: AccommodationService) {}

  @ApiOperation({ summary: 'Get all accommodations' })
  @Get()
  async index() {
    return await this.accommodationService.findAll();
  }

  @Get(':id')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Authentification',
  })
  async find(@Param('id') id: string): Promise<Accommodation> {
    return await this.accommodationService.findOne(id);
  }
  @Post()
  @ApiUnauthorizedResponse({ description: 'Non autorisé' })
  @ApiResponse({ status: 201, description: 'Le bien a bien été crée' })
  @ApiBody({ type: CreateAccommodationDto })
  async create(@Body() createAccommodationDto: CreateAccommodationDto) {
    return await this.accommodationService.create(createAccommodationDto);
  }

  @Put(':id')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Authentification',
  })
  async update(
    @Param('id') id: string,
    @Body() updateAccommodationDto: UpdateAccommodationDto,
  ) {
    return await this.accommodationService.update(id, updateAccommodationDto);
  }
  @Delete(':id')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Authentification',
  })
  async delete(@Param('id') id: string) {
    return await this.accommodationService.delete(id);
  }
}
