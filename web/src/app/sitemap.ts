import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';


export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://zeroemi.in';
  const currentDate = new Date();

  const routes = [
    '',
    '/calculators/emi',
    '/calculators/sip',
    '/calculators/loan-eligibility',
    '/calculators/tax',
    '/calculators/cc-rewards',
    '/calculators/construction',
    '/calculators/tiles',
    '/calculators/no-cost-emi',
    '/calculators/in-hand-salary',
    '/calculators/hra',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));
}
