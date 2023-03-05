import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DestinationService } from './destination.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Destination } from './schemas/destination.schema';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';

@ApiTags('destinations')
@Controller('destination')
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}

  @ApiOperation({ summary: 'Get all destinations' })
  @Get()
  async index() {
    return await this.destinationService.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<Destination> {
    return await this.destinationService.findOne(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'La destination a bien été crée' })
  @ApiBody({ type: CreateDestinationDto })
  async create(@Body() createDestinationDto: CreateDestinationDto) {
    return await this.destinationService.create(createDestinationDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDestinationDto: UpdateDestinationDto,
  ) {
    return await this.destinationService.update(id, updateDestinationDto);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.destinationService.delete(id);
  }
}
