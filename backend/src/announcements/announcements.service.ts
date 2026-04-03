import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateAnnouncementDto, UpdateAnnouncementDto } from './dto/announcement.dto'

@Injectable()
export class AnnouncementsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateAnnouncementDto) {
    return this.prisma.announcement.create({
      data: {
        ...dto,
        expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : undefined,
      },
    })
  }

  findAll(residenceId: string, skip = 0, take = 20) {
    return this.prisma.announcement.findMany({
      where: { residenceId },
      orderBy: { publishedAt: 'desc' },
      skip,
      take,
    })
  }

  findOne(id: string) {
    return this.prisma.announcement.findUniqueOrThrow({ where: { id } })
  }

  update(id: string, dto: UpdateAnnouncementDto) {
    return this.prisma.announcement.update({
      where: { id },
      data: {
        ...dto,
        expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : undefined,
      },
    })
  }

  remove(id: string) {
    return this.prisma.announcement.delete({ where: { id } })
  }
}
