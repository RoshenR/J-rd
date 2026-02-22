'use client';

import { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';

const IntroWave = dynamic(() => import('./IntroWave'), { ssr: false });
const Cursor = dynamic(() => import('./Cursor'), { ssr: false });

export default function IntroShell() {
  const [showIntro, setShowIntro] = useState(true);

  const handleComplete = useCallback(() => {
    document.documentElement.classList.add('intro-done');
    setShowIntro(false);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('intro-done');
      setShowIntro(false);
    }
  }, []);

  return (
    <>
      {showIntro && (
        <div aria-hidden="true" role="presentation">
          <IntroWave onComplete={handleComplete} />
        </div>
      )}
      <Cursor />
    </>
  );
}
