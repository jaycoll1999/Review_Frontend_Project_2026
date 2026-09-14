import type { Metadata } from 'next';

type Props = {
  params: { businessId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const businessId = params.businessId;
  return {
    title: `Leave a Review & Share Your Experience | Customer Review Hub`,
    description: `Submit your verified customer rating and review for location #${businessId}. Your feedback helps our team maintain 5-star service excellence.`,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `Official Customer Review Hub | Share Your Feedback`,
      description: `Rate your experience in seconds. Your honest opinion helps us improve every day.`,
    },
    twitter: {
      card: 'summary',
      title: `Customer Review Portal`,
      description: `Leave your feedback and help us serve you better.`,
    },
  };
}

export default function ReviewFunnelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
