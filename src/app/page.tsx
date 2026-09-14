'use client';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import WhySection from '@/components/WhySection';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <main id="main-content">
        {/* HERO: The Hook with Primary H1 */}
        <Hero />
        
        {/* SOCIAL PROOF & FEATURES: Core Value & Keyword Signals */}
        <Features />
        
        {/* WHY REVIEWFLOW: Value Proposition & Authority */}
        <WhySection />
        
        {/* PROCESS: How it Works (Reducing Friction) */}
        <HowItWorks />
        
        {/* SOCIAL PROOF: Real Results (Emotional Resonance) */}
        <Testimonials />
        
        {/* PRICING: Transparent SaaS Tier Comparison */}
        <Pricing />

        {/* FREQUENTLY ASKED QUESTIONS: SEO Schema & High-Intent Answers */}
        <FAQ />

        {/* CONTACT: B2B Enterprise & Lead Inquiries */}
        <Contact />
        
        {/* FINAL CTA: Conversion Push */}
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
