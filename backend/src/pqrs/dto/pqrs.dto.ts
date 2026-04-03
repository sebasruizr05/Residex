import { IsEnum, IsOptional, IsString } from 'class-validator'
import { PQRSCategory, PQRSStatus } from '../../../generated/prisma/client.js'

export class CreatePQRSDto {
  @IsString()
  title: string

  @IsString()
  description: string

  @IsEnum(PQRSCategory)
  category: PQRSCategory

  @IsString()
  residenceId: string

  @IsString()
  authorId: string
}

export class UpdatePQRSDto {
  @IsOptional()
  @IsEnum(PQRSStatus)
  status?: PQRSStatus
}
