import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DealsModule } from './deals/deals.module';
import { InterestModule } from './interest/interest.module';

@Module({
  imports: [AuthModule, DealsModule, InterestModule],
})
export class DomainsModule {}
