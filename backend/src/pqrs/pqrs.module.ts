import { Module } from '@nestjs/common'
import { PQRSController } from './pqrs.controller'
import { PQRSService } from './pqrs.service'

@Module({
  controllers: [PQRSController],
  providers: [PQRSService],
})
export class PQRSModule {}
