import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common'
import { PaymentsService } from './payments.service'
import { CreatePaymentDto, UpdatePaymentDto } from './dto/payment.dto'

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(@Body() dto: CreatePaymentDto) {
    return this.paymentsService.create(dto)
  }

  @Get()
  findAll(
    @Query('residenceId') residenceId: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    return this.paymentsService.findAll(
      residenceId,
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
    return this.paymentsService.findByUser(
      userId,
      skip ? parseInt(skip, 10) : 0,
      take ? parseInt(take, 10) : 20,
    )
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePaymentDto) {
    return this.paymentsService.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(id)
  }
}
