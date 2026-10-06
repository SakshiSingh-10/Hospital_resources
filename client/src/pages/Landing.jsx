import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustIntro from '../components/TrustIntro';
import Features from '../components/Features';
import CapacitySection from '../components/CapacitySection';
import HowItWorks from '../components/HowItWorks';
import DashboardPreview from '../components/DashboardPreview';
import ForecastSection from '../components/ForecastSection';
import SimulationPreview from '../components/SimulationPreview';
import WhyCareFlow from '../components/WhyCareFlow';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      <Navbar />
      <main>
        <Hero />
        <TrustIntro />
        <Features />
        <CapacitySection />
        <HowItWorks />
        <DashboardPreview />
        <ForecastSection />
        <SimulationPreview />
        <WhyCareFlow />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
