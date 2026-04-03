import { IsEnum, IsOptional, IsString, IsDateString } from 'class-validator'
import { PackageStatus } from '../../../generated/prisma/client.js'

export class CreatePackageDto {
  @IsOptional()
  @IsString()
  trackingCode?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  carrier?: string

  @IsString()
  recipientId: string

  @IsString()
  residenceId: string
}

export class UpdatePackageDto {
  @IsOptional()
  @IsEnum(PackageStatus)
  status?: PackageStatus

  @IsOptional()
  @IsDateString()
  deliveredAt?: string
}
