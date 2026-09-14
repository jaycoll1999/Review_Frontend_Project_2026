import type { Metadata } from 'next';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const siteId = params.id;
  return {
    title: `Official Business Showcase & Verified Customer Reviews`,
    description: `Discover top-rated services, customer ratings, and Google-verified reviews for location #${siteId}. Proudly delivering 5-star customer experiences.`,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `Official Business Showcase | Verified 5-Star Reputation`,
      description: `Explore customer testimonials, location updates, and community highlights.`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Official Business Showcase & Reviews`,
      description: `Explore customer ratings, reviews, and latest updates.`,
    },
  };
}

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
