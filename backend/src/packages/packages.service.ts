import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreatePackageDto, UpdatePackageDto } from './dto/package.dto'

@Injectable()
export class PackagesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreatePackageDto) {
    return this.prisma.package.create({ data: dto })
  }

  findAll(residenceId: string, skip = 0, take = 20) {
    return this.prisma.package.findMany({
      where: { residenceId },
      orderBy: { receivedAt: 'desc' },
      skip,
      take,
    })
  }

  findOne(id: string) {
    return this.prisma.package.findUniqueOrThrow({ where: { id } })
  }

  update(id: string, dto: UpdatePackageDto) {
    return this.prisma.package.update({
      where: { id },
      data: {
        ...dto,
        deliveredAt: dto.deliveredAt ? new Date(dto.deliveredAt) : undefined,
      },
    })
  }

  remove(id: string) {
    return this.prisma.package.delete({ where: { id } })
  }
}
