import IntroShell from '../components/IntroShell';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Offers from '../components/Offers';
import Divider from '../components/Divider';
import Process from '../components/Process';
import Destinations from '../components/Destinations';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <IntroShell />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Offers />
        <Divider />
        <Process />
        <Divider />
        <About />
        <Divider />
        <Destinations />
        <Divider />
        <Pricing />
        <Divider />
        <Testimonials />
        <Divider />
        <FAQ />
        <Divider />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
