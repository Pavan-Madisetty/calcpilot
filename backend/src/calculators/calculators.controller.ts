import { Controller, Get, Post, Body, Delete, Patch, Param, Query } from '@nestjs/common';

interface SaveCalcDto {
  userId: string;
  name: string;
  type: string;
  inputs: any;
  outputs: any;
}

@Controller('calculators')
export class CalculatorsController {
  // In-memory mock database store mapping PostgreSQL operations
  private mockDb: any[] = [];

  @Get('saved')
  getSaved(@Query('userId') userId: string) {
    return this.mockDb.filter((item) => item.userId === userId || !item.userId);
  }

  @Post('save')
  save(@Body() dto: SaveCalcDto) {
    const newRecord = {
      id: 'db-calc-' + Math.random().toString(36).substring(2, 9),
      ...dto,
      createdAt: new Date().toISOString(),
    };
    this.mockDb.unshift(newRecord);
    return { success: true, record: newRecord };
  }

  @Patch('saved/:id')
  rename(@Param('id') id: string, @Body('name') name: string) {
    this.mockDb = this.mockDb.map((item) => {
      if (item.id === id) return { ...item, name };
      return item;
    });
    return { success: true };
  }

  @Delete('saved/:id')
  delete(@Param('id') id: string) {
    this.mockDb = this.mockDb.filter((item) => item.id !== id);
    return { success: true };
  }
}
