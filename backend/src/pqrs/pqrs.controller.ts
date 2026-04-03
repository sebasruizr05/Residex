import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common'
import { PQRSService } from './pqrs.service'
import { CreatePQRSDto, UpdatePQRSDto } from './dto/pqrs.dto'

@Controller('pqrs')
export class PQRSController {
  constructor(private readonly pqrsService: PQRSService) {}

  @Post()
  create(@Body() dto: CreatePQRSDto) {
    return this.pqrsService.create(dto)
  }

  @Get()
  findAll(
    @Query('residenceId') residenceId: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    return this.pqrsService.findAll(
      residenceId,
      skip ? parseInt(skip, 10) : 0,
      take ? parseInt(take, 10) : 20,
    )
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pqrsService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePQRSDto) {
    return this.pqrsService.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pqrsService.remove(id)
  }
}
