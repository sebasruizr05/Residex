import { IsEnum, IsOptional, IsString, IsDateString } from 'class-validator'
import { ReservationStatus } from '../../../generated/prisma/client.js'

export class CreateReservationDto {
  @IsDateString()
  startTime: string

  @IsDateString()
  endTime: string

  @IsOptional()
  @IsString()
  notes?: string

  @IsString()
  commonAreaId: string

  @IsString()
  userId: string
}

export class UpdateReservationDto {
  @IsOptional()
  @IsEnum(ReservationStatus)
  status?: ReservationStatus

  @IsOptional()
  @IsString()
  notes?: string
}
