import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AIChatWidget from "@/components/chat/AIChatWidget";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://reviewflowai.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#6366f1",
};

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "ReviewFlow AI | #1 Google Reputation Management & Local SEO Automation",
    template: "%s | ReviewFlow AI",
  },
  description:
    "Automate Google reviews, protect your rating with smart review gating, generate high-converting Magic QR posters, and skyrocket local Google Maps rankings with our autonomous trilingual AI Agent in English, Hindi & Marathi.",
  keywords: [
    "Google review automation",
    "reputation management software",
    "local SEO software",
    "Google business profile optimization",
    "GMB ranking boost",
    "review gating funnel",
    "Magic QR review poster",
    "AI review response generator",
    "5 star google reviews",
    "trilingual voice ai assistant",
    "local business SEO marketing",
    "customer feedback management",
    "Google Maps 3 pack ranking",
    "automated Google updates",
    "ReviewFlow AI 2026",
  ],
  authors: [{ name: "ReviewFlow AI Team", url: APP_URL }],
  creator: "ReviewFlow AI",
  publisher: "ReviewFlow AI Inc.",
  category: "Business & Productivity Software",
  applicationName: "ReviewFlow AI",
  generator: "Next.js",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    siteName: "ReviewFlow AI",
    title: "ReviewFlow AI | Automate Google Reviews & Dominate Local Search",
    description:
      "Automate Google reviews, filter negative customer feedback with smart review gating, generate Magic QR posters, and boost Google Maps rankings.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ReviewFlow AI Dashboard - Automated Google Reputation Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ReviewFlow AI | Google Reputation Management & Local SEO Automation",
    description:
      "Collect 4x more 5-star Google reviews and automate customer responses in English, Hindi & Marathi.",
    creator: "@reviewflowai",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data Schema for Google Rich Snippets (SoftwareApplication + Organization + FAQ)
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${APP_URL}/#software`,
        name: "ReviewFlow AI",
        operatingSystem: "Web-based, iOS, Android, macOS, Windows",
        applicationCategory: "BusinessApplication",
        url: APP_URL,
        description:
          "Autonomous AI reputation management platform for Google Business Profiles, featuring smart review gating, Magic QR generators, and trilingual customer assistance.",
        offers: {
          "@type": "Offer",
          price: "49.00",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "2500",
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@type": "Organization",
        "@id": `${APP_URL}/#organization`,
        name: "ReviewFlow AI",
        url: APP_URL,
        logo: `${APP_URL}/favicon.ico`,
        sameAs: [
          "https://twitter.com/reviewflowai",
          "https://linkedin.com/company/reviewflowai",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Customer Support",
          email: "support@reviewflowai.com",
          availableLanguage: ["English", "Hindi", "Marathi"],
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${APP_URL}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "How does ReviewFlow AI get my business more 5-star Google reviews?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ReviewFlow AI combines smart Review Gating funnels with printable Magic QR posters. Satisfied customers giving 4-5 stars are routed directly to your official Google Maps review form, while customers with concerns are guided to a private internal feedback form to resolve issues privately.",
            },
          },
          {
            "@type": "Question",
            name: "What languages does the Voice & Text AI Assistant support?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ReviewFlow AI natively understands and speaks English, Hindi (हिंदी), and Marathi (मराठी) with automated real-time regional language detection.",
            },
          },
          {
            "@type": "Question",
            name: "Is ReviewFlow AI compliant with Google Business Profile guidelines?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, 100%. ReviewFlow AI complies with Google policies and FTC transparency guidelines by empowering genuine customer expression while giving business owners an internal resolution channel.",
            },
          },
          {
            "@type": "Question",
            name: "How does AI review response improve local SEO ranking?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Google's algorithm prioritizes active business profiles that respond promptly with relevant keywords. ReviewFlow AI automatically crafts responses with local SEO keywords to boost map visibility.",
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${inter.className} antialiased selection:bg-indigo-500 selection:text-white`}>
        {children}
        <AIChatWidget />
      </body>
    </html>
  );
}
