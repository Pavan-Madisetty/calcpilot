import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalculatorsController } from './calculators/calculators.controller';
import { AdsController } from './ads/ads.controller';
import { AnalyticsController } from './analytics/analytics.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    CalculatorsController,
    AdsController,
    AnalyticsController,
  ],
  providers: [AppService],
})
export class AppModule {}
