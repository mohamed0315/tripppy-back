import {
  Body,
  Controller,
  Delete,
  Get,
  Param, Patch,
  Post,
  Put, Req,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
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
import { Request } from "express";

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
    @Req() request: Request,
  ) {
    const userEmail = request['user'].email;
    console.log('from accommodation', request['user'].email);
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
      userEmail,
    );
  }

  @Put(':id')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateAccommodationDto: UpdateAccommodationDto,
  ) {
    return await this.accommodationService.update(id, updateAccommodationDto);
  }

  @Patch(':id/image')
  async addImage(
    @Param('id') id: string,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Accommodation> {
    const { buffer, originalname, mimetype } = image;
    const fileKey = await this.s3Service.uploadFile(
      buffer,
      originalname,
      mimetype,
    );
    console.log(fileKey);
    console.log(await this.s3Service.downloadLink(fileKey));
    return this.accommodationService.addImageToAccommodation(id, fileKey);
  }

  @Delete(':id')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  async delete(@Param('id') id: string) {
    return await this.accommodationService.delete(id);
  }
}
