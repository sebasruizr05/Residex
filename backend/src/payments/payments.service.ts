import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreatePaymentDto, UpdatePaymentDto } from './dto/payment.dto'

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreatePaymentDto) {
    return this.prisma.payment.create({
      data: {
        ...dto,
        dueDate: new Date(dto.dueDate),
      },
    })
  }

  findAll(residenceId: string, skip = 0, take = 20) {
    return this.prisma.payment.findMany({
      where: { residenceId },
      orderBy: { dueDate: 'desc' },
      skip,
      take,
    })
  }

  findByUser(userId: string, skip = 0, take = 20) {
    return this.prisma.payment.findMany({
      where: { userId },
      orderBy: { dueDate: 'desc' },
      skip,
      take,
    })
  }

  findOne(id: string) {
    return this.prisma.payment.findUniqueOrThrow({ where: { id } })
  }

  update(id: string, dto: UpdatePaymentDto) {
    return this.prisma.payment.update({
      where: { id },
      data: {
        ...dto,
        paidAt: dto.paidAt ? new Date(dto.paidAt) : undefined,
      },
    })
  }

  remove(id: string) {
    return this.prisma.payment.delete({ where: { id } })
  }
}
