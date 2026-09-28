import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import CohortPhases from './components/CohortPhases';
import TeamSection from './components/TeamSection';
import ContactSection from './components/ContactSection';
import useReveal from './hooks/useReveal';

export default function App() {
  useReveal();

  return (
    <>
      <a href="#hero" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <CohortPhases />
        <TeamSection />
        <ContactSection />
      </main>
    </>
  );
}
