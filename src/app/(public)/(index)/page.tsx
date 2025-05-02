// Page.tsx
import AboutSection from "./AboutSection";
import BlogSection from "./AboutSection";
import ConsultationSection from "./Consultation";
import Hero from "./Hero";
import ServicesSection from "./Services";

export default function Page() {
  return (
    <main>
      <div className="flex relative flex-col pb-40"> 
        <Hero />
          <ServicesSection />
          <AboutSection />
          <BlogSection />
          <ConsultationSection />
      </div>
    </main>
  );
}
