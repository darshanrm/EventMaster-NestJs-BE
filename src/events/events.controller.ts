import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Event } from './event.entity';
import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Like, MoreThan, MoreThanOrEqual } from 'typeorm';
import { take } from 'rxjs';

@Controller('/events')
export class EventsController {
  private readonly logger = new Logger(EventsController.name);

  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
  ) {}

  @Get('/practice')
  async practice() {
    return await this.repository.find({
      where: [
        {
          id: MoreThan(3),
          when: MoreThan(new Date('2021-02-12T13:00:00')),
        },
        {
          description: Like('%meet%'),
        },
      ],
      order: {
        id: 'DESC',
      },
      take: 2,
    });
  }

  @Get()
  async findAll() {
    this.logger.debug('hit findAll');
    return await this.repository.find();
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    const event = await this.repository.findOne({ where: { id } });

    if (!event) throw new NotFoundException();

    return event;
  }

  @Post()
  async create(@Body() input: CreateEventDto) {
    return await this.repository.save({
      ...input,
      when: new Date(input.when),
    });
  }

  @Patch(':id')
  async update(@Param('id') id, @Body() input: UpdateEventDto) {
    let event = await this.repository.findOne(id);

    if (!event) throw new NotFoundException();

    return await this.repository.save({
      ...event,
      ...input,
      when: input.when ? new Date(input.when) : event.when,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id) {
    let event = await this.repository.findOne(id);

    if (!event) throw new NotFoundException();

    return await this.repository.remove(event);
  }
}
