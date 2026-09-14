import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://reviewflowai.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/plans', '/login', '/register', '/r/*', '/site/*'],
        disallow: [
          '/dashboard/',
          '/admin-panel/',
          '/settings/',
          '/ai-agent/',
          '/audit/',
          '/automation/',
          '/posts/',
          '/qr/',
          '/profile/',
          '/website/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
