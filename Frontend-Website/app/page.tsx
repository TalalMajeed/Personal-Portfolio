import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactBanner from "@/components/ContactBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-white">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactBanner />
      <Footer />
    </div>
  );
}
