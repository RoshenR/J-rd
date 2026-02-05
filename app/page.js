'use client';

import { useState, useCallback } from 'react';
import IntroWave from '../components/IntroWave';
import Hero from '../components/Hero';
import Offers from '../components/Offers';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
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
      <main className={introComplete ? 'main--visible' : 'main--hidden'}>
        <Hero visible={introComplete} />
        <Offers />
        <About />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
