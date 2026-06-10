import { Controller, Get, Post, Param, Query, Body, Delete } from '@nestjs/common';

interface AdCampaignDto {
  title: string;
  destinationUrl: string;
  placement: string;
  targetCalculator?: string;
  active: boolean;
}

@Controller('ads')
export class AdsController {
  private adList: any[] = [
    {
      id: 'db-ad-1',
      title: 'Axis Atlas Credit Card - Get 5,000 Welcome Miles!',
      destinationUrl: 'https://www.axisbank.com',
      placement: 'home_top',
      active: true,
      clicks: 142,
      impressions: 4850,
    },
    {
      id: 'db-ad-2',
      title: 'HDFC Home Loans - Interest rates starting at 8.35% p.a.',
      destinationUrl: 'https://www.hdfcbank.com',
      placement: 'calc_inline',
      targetCalculator: 'emi',
      active: true,
      clicks: 98,
      impressions: 3200,
    },
  ];

  @Get()
  getAds(@Query('placement') placement: string, @Query('calculator') calculator?: string) {
    let list = this.adList.filter((ad) => ad.active && ad.placement === placement);
    if (calculator) {
      const targeted = list.filter((ad) => ad.targetCalculator === calculator);
      if (targeted.length > 0) return targeted;
    }
    return list;
  }

  @Post('impression/:id')
  logImpression(@Param('id') id: string) {
    this.adList = this.adList.map((ad) => {
      if (ad.id === id) return { ...ad, impressions: ad.impressions + 1 };
      return ad;
    });
    return { success: true };
  }

  @Post('click/:id')
  logClick(@Param('id') id: string) {
    this.adList = this.adList.map((ad) => {
      if (ad.id === id) return { ...ad, clicks: ad.clicks + 1 };
      return ad;
    });
    return { success: true };
  }

  @Post('create')
  createAd(@Body() dto: AdCampaignDto) {
    const newAd = {
      id: 'db-ad-' + Math.random().toString(36).substring(2, 9),
      ...dto,
      clicks: 0,
      impressions: 0,
    };
    this.adList.unshift(newAd);
    return { success: true, ad: newAd };
  }

  @Delete(':id')
  deleteAd(@Param('id') id: string) {
    this.adList = this.adList.filter((ad) => ad.id !== id);
    return { success: true };
  }
}
