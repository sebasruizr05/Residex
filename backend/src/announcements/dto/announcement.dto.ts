import { IsOptional, IsString, IsDateString } from 'class-validator'

export class CreateAnnouncementDto {
  @IsString()
  title: string

  @IsString()
  content: string

  @IsOptional()
  @IsDateString()
  expiresAt?: string

  @IsString()
  residenceId: string
}

export class UpdateAnnouncementDto {
  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsString()
  content?: string

  @IsOptional()
  @IsDateString()
  expiresAt?: string
}
