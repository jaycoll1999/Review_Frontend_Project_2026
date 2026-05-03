'use client';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import Contact from '@/components/Contact';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />
      <main>
        {/* HERO: The Hook */}
        <Hero />
        
        {/* SOCIAL PROOF & FEATURES: Building Trust & Explaining Value */}
        <Features />
        
        {/* PROCESS: How it Works (Reducing Friction) */}
        <HowItWorks />
        
        {/* SOCIAL PROOF: Real Results (Emotional Resonance) */}
        <Testimonials />
        
        {/* PRICING: The Close */}
        <Pricing />

        {/* CONTACT: The Detail */}
        <Contact />
        
        {/* FINAL CTA: The Push */}
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
