import About from '@/components/sections/About';
import CTA from '@/components/sections/CTA';
import EmergencyStrip from '@/components/sections/EmergencyStrip';
import FAQ from '@/components/sections/FAQ';
import Features from '@/components/sections/Features';
import Footer from '@/components/sections/Footer';
import Hero from '@/components/sections/Hero';
import HowItWorks from '@/components/sections/HowItWorks';
import Languages from '@/components/sections/Languages';
import Navbar from '@/components/sections/Navbar';
import OfflineCapabilities from '@/components/sections/OfflineCapabilities';
import PlatformComparison from '@/components/sections/PlatformComparison';

export default function Home(): React.JSX.Element {
  return (
    <main>
      <Navbar />
      <Hero />
      <EmergencyStrip />

      <Features />

      <PlatformComparison />

      <HowItWorks />

      <Languages />
      <OfflineCapabilities />

      <section id="about">
        <About />
      </section>

      <section id="faq">
        <FAQ />
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
