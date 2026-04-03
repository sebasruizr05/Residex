import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common'
import { PackagesService } from './packages.service'
import { CreatePackageDto, UpdatePackageDto } from './dto/package.dto'

@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Post()
  create(@Body() dto: CreatePackageDto) {
    return this.packagesService.create(dto)
  }

  @Get()
  findAll(
    @Query('residenceId') residenceId: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    return this.packagesService.findAll(
      residenceId,
      skip ? parseInt(skip, 10) : 0,
      take ? parseInt(take, 10) : 20,
    )
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.packagesService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePackageDto) {
    return this.packagesService.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packagesService.remove(id)
  }
}
