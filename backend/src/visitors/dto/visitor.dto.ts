import { IsEnum, IsOptional, IsString, IsDateString } from 'class-validator'
import { VisitorStatus } from '../../../generated/prisma/client.js'

export class CreateVisitorDto {
  @IsString()
  name: string

  @IsString()
  documentId: string

  @IsOptional()
  @IsString()
  phone?: string

  @IsOptional()
  @IsDateString()
  scheduledAt?: string

  @IsString()
  residenceId: string

  @IsString()
  hostId: string
}

export class UpdateVisitorDto {
  @IsOptional()
  @IsEnum(VisitorStatus)
  status?: VisitorStatus

  @IsOptional()
  @IsDateString()
  checkedInAt?: string

  @IsOptional()
  @IsDateString()
  checkedOutAt?: string
}
