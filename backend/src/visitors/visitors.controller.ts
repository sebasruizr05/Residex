import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common'
import { VisitorsService } from './visitors.service'
import { CreateVisitorDto, UpdateVisitorDto } from './dto/visitor.dto'

@Controller('visitors')
export class VisitorsController {
  constructor(private readonly visitorsService: VisitorsService) {}

  @Post()
  create(@Body() dto: CreateVisitorDto) {
    return this.visitorsService.create(dto)
  }

  @Get()
  findAll(
    @Query('residenceId') residenceId: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    return this.visitorsService.findAll(
      residenceId,
      skip ? parseInt(skip, 10) : 0,
      take ? parseInt(take, 10) : 20,
    )
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.visitorsService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateVisitorDto) {
    return this.visitorsService.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visitorsService.remove(id)
  }
}
