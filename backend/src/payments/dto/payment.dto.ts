import { IsEnum, IsOptional, IsString, IsDateString, IsNumber } from 'class-validator'
import { PaymentStatus, PaymentType } from '../../../generated/prisma/client.js'

export class CreatePaymentDto {
  @IsNumber()
  amount: number

  @IsEnum(PaymentType)
  type: PaymentType

  @IsDateString()
  dueDate: string

  @IsOptional()
  @IsString()
  description?: string

  @IsString()
  userId: string

  @IsString()
  residenceId: string
}

export class UpdatePaymentDto {
  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus

  @IsOptional()
  @IsDateString()
  paidAt?: string

  @IsOptional()
  @IsString()
  reference?: string
}
