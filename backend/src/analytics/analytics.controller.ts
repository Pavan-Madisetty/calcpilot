import { Controller, Get, Post, Body, Query } from '@nestjs/common';

interface LogEventDto {
  calculatorType: string;
  durationSeconds: number;
}

@Controller('analytics')
export class AnalyticsController {
  private events: any[] = [];

  @Post('log')
  logEvent(@Body() dto: LogEventDto) {
    const event = {
      id: 'evt-' + Math.random().toString(36).substring(2, 9),
      ...dto,
      timestamp: new Date().toISOString(),
    };
    this.events.push(event);
    return { success: true };
  }

  @Get('summary')
  getSummary() {
    const totalEvents = this.events.length;
    const calculatorCounts = this.events.reduce((acc, curr) => {
      acc[curr.calculatorType] = (acc[curr.calculatorType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalCalculations: totalEvents,
      calculatorUsage: calculatorCounts,
      dailyActiveUsersMock: Math.floor(Math.random() * 200) + 400,
      systemUptimeMock: '99.98%',
    };
  }
}
