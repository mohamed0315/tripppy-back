import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AccommodationService } from './accommodation.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { Accommodation } from './schemas/accommodation.schema';
import { CreateAccommodationDto } from './dto/create-accommodation.dto';
import { UpdateAccommodationDto } from './dto/update-accommodation.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from '../s3-service/s3-service.service';

@ApiTags('accommodations')
@Controller('accommodation')
export class AccommodationController {
  constructor(
    private readonly accommodationService: AccommodationService,
    private readonly s3Service: S3Service,
  ) {}

  @ApiOperation({ summary: 'Get all accommodations' })
  @Get()
  async index() {
    return await this.accommodationService.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<Accommodation> {
    return await this.accommodationService.findOne(id);
  }
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Non autorisé' })
  @ApiResponse({ status: 201, description: 'Le bien a bien été crée' })
  @ApiBody({ type: CreateAccommodationDto })
  async create(
    @Body() createAccommodationDto: CreateAccommodationDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { buffer, originalname, mimetype } = file;
    const fileKey = await this.s3Service.uploadFile(
      buffer,
      originalname,
      mimetype,
    );
    console.log(fileKey);
    console.log(await this.s3Service.downloadLink(fileKey));
    return await this.accommodationService.create(
      createAccommodationDto,
      fileKey,
    );
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
