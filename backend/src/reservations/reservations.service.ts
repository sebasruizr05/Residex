import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateReservationDto, UpdateReservationDto } from './dto/reservation.dto'

@Injectable()
export class ReservationsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateReservationDto) {
    const { userId, ...rest } = dto
    return this.prisma.reservation.create({
      data: {
        ...rest,
        startTime: new Date(rest.startTime),
        endTime: new Date(rest.endTime),
        userId,
      },
    })
  }

  findAll(commonAreaId: string, skip = 0, take = 20) {
    return this.prisma.reservation.findMany({
      where: { commonAreaId },
      orderBy: { startTime: 'desc' },
      skip,
      take,
    })
  }

  findByUser(userId: string, skip = 0, take = 20) {
    return this.prisma.reservation.findMany({
      where: { userId },
      orderBy: { startTime: 'desc' },
      skip,
      take,
    })
  }

  findOne(id: string) {
    return this.prisma.reservation.findUniqueOrThrow({ where: { id } })
  }

  update(id: string, dto: UpdateReservationDto) {
    return this.prisma.reservation.update({ where: { id }, data: dto })
  }

  remove(id: string) {
    return this.prisma.reservation.delete({ where: { id } })
  }
}
