import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common'
import { ReservationsService } from './reservations.service'
import { CreateReservationDto, UpdateReservationDto } from './dto/reservation.dto'

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(@Body() dto: CreateReservationDto) {
    return this.reservationsService.create(dto)
  }

  @Get()
  findAll(
    @Query('commonAreaId') commonAreaId: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    return this.reservationsService.findAll(
      commonAreaId,
      skip ? parseInt(skip, 10) : 0,
      take ? parseInt(take, 10) : 20,
    )
  }

  @Get('user/:userId')
  findByUser(
    @Param('userId') userId: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    return this.reservationsService.findByUser(
      userId,
      skip ? parseInt(skip, 10) : 0,
      take ? parseInt(take, 10) : 20,
    )
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateReservationDto) {
    return this.reservationsService.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(id)
  }
}
