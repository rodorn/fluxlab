import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import WhatToAutomate from "@/components/WhatToAutomate";
import AICapabilities from "@/components/AICapabilities";
import ExampleWorkflow from "@/components/ExampleWorkflow";
import PilotBanner from "@/components/PilotBanner";
import Services from "@/components/Services";
import Diagnosis from "@/components/Diagnosis";
import Pricing from "@/components/Pricing";
import Proof from "@/components/Proof";
import Process from "@/components/Process";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import SectionViewTracker from "@/components/SectionViewTracker";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <WhatToAutomate />
        <AICapabilities />
        <ExampleWorkflow />
        <PilotBanner />
        <Services />
        <Diagnosis />
        <Pricing />
        <Proof />
        <Process />
        <About />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <SectionViewTracker target="#cennik" eventName="pricing_view" />
      <SectionViewTracker target="#workflow" eventName="workflow_view" />
      <SectionViewTracker target="#ai" eventName="ai_view" />
      <SectionViewTracker
        target="#co-automatyzowac"
        eventName="what_to_automate_view"
      />
    </>
  );
}
