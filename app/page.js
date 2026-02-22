'use client';

import { useState, useCallback } from 'react';
import IntroWave from '../components/IntroWave';
import Cursor from '../components/Cursor';
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
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <>
      <IntroWave onComplete={handleIntroComplete} />
      <Cursor />
      <Navbar visible={introComplete} />
      <main className={introComplete ? 'main--visible' : 'main--hidden'}>
        <Hero visible={introComplete} />
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
