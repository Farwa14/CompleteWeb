import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PhilosophySection from "@/components/PhilosophySection";
import ProtocolSection from "@/components/ProtocolSection";
import ForPatientsSection from "@/components/ForPatientsSection";
import ForDoctorsSection from "@/components/ForDoctorsSection";
import AIAssistantSection from "@/components/AIAssistantSection";
import Footer from "@/components/Footer";

const NoiseOverlay = () => (
  <svg className="noise-overlay" xmlns="http://www.w3.org/2000/svg">
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise)" />
  </svg>
);

const Index = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <NoiseOverlay />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <PhilosophySection />
      <ProtocolSection />
      <ForPatientsSection />
      <AIAssistantSection />
      <ForDoctorsSection />
      <Footer />
    </div>
  );
};

export default Index;