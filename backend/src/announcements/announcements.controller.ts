import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common'
import { AnnouncementsService } from './announcements.service'
import { CreateAnnouncementDto, UpdateAnnouncementDto } from './dto/announcement.dto'

@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Post()
  create(@Body() dto: CreateAnnouncementDto) {
    return this.announcementsService.create(dto)
  }

  @Get()
  findAll(
    @Query('residenceId') residenceId: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    return this.announcementsService.findAll(
      residenceId,
      skip ? parseInt(skip, 10) : 0,
      take ? parseInt(take, 10) : 20,
    )
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.announcementsService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAnnouncementDto) {
    return this.announcementsService.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.announcementsService.remove(id)
  }
}
