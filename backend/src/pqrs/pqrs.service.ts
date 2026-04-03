import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreatePQRSDto, UpdatePQRSDto } from './dto/pqrs.dto'
import { PQRSStatus } from '../../generated/prisma/client.js'

@Injectable()
export class PQRSService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreatePQRSDto) {
    return this.prisma.pQRS.create({
      data: dto,
    })
  }

  findAll(residenceId: string, skip = 0, take = 20) {
    return this.prisma.pQRS.findMany({
      where: { residenceId },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    })
  }

  findOne(id: string) {
    return this.prisma.pQRS.findUniqueOrThrow({ where: { id } })
  }

  update(id: string, dto: UpdatePQRSDto) {
    return this.prisma.pQRS.update({
      where: { id },
      data: {
        ...dto,
        resolvedAt: dto.status === PQRSStatus.RESOLVED ? new Date() : undefined,
      },
    })
  }

  remove(id: string) {
    return this.prisma.pQRS.delete({ where: { id } })
  }
}
