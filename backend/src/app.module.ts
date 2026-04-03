import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './prisma/prisma.module'
import { VisitorsModule } from './visitors/visitors.module'
import { PackagesModule } from './packages/packages.module'
import { PaymentsModule } from './payments/payments.module'
import { PQRSModule } from './pqrs/pqrs.module'
import { AnnouncementsModule } from './announcements/announcements.module'
import { ReservationsModule } from './reservations/reservations.module'

@Module({
  imports: [
    PrismaModule,
    VisitorsModule,
    PackagesModule,
    PaymentsModule,
    PQRSModule,
    AnnouncementsModule,
    ReservationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
