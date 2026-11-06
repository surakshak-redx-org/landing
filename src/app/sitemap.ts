import type { MetadataRoute } from 'next';

import { SITE } from '@/constants';

const SUB_PAGES = ['/emergency', '/contact', '/report-problem', '/privacy', '/terms'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...SUB_PAGES.map((path) => ({
      url: `${SITE.url}${path}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    })),
  ];
}
