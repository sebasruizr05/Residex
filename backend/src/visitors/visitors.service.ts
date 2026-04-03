import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateVisitorDto, UpdateVisitorDto } from './dto/visitor.dto'

@Injectable()
export class VisitorsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateVisitorDto) {
    const { hostId, ...rest } = dto
    return this.prisma.visitor.create({
      data: {
        ...rest,
        scheduledAt: rest.scheduledAt ? new Date(rest.scheduledAt) : undefined,
        hostId,
      },
    })
  }

  findAll(residenceId: string, skip = 0, take = 20) {
    return this.prisma.visitor.findMany({
      where: { residenceId },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    })
  }

  findOne(id: string) {
    return this.prisma.visitor.findUniqueOrThrow({ where: { id } })
  }

  update(id: string, dto: UpdateVisitorDto) {
    return this.prisma.visitor.update({
      where: { id },
      data: {
        ...dto,
        checkedInAt: dto.checkedInAt ? new Date(dto.checkedInAt) : undefined,
        checkedOutAt: dto.checkedOutAt ? new Date(dto.checkedOutAt) : undefined,
      },
    })
  }

  remove(id: string) {
    return this.prisma.visitor.delete({ where: { id } })
  }
}
