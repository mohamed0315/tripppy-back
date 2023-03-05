import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ActivityService } from './activity.service';
import { Activity } from './schemas/activity.schema';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@ApiTags('activities')
@Controller('activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @ApiOperation({ summary: 'Get all activities' })
  @Get()
  async index() {
    return await this.activityService.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<Activity> {
    return await this.activityService.findOne(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: "L'activité a bien été crée" })
  @ApiBody({ type: CreateActivityDto })
  async create(@Body() createActivityDto: CreateActivityDto) {
    return await this.activityService.create(createActivityDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    return await this.activityService.update(id, updateActivityDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.activityService.delete(id);
  }
}
