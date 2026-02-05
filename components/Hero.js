'use client';

import { useEffect, useRef } from 'react';

export default function Hero({ visible }) {
  const photoRef = useRef(null);
  const overlayRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    function onScroll() {
      if (!photoRef.current || !sectionRef.current) return;

      const scrollY = window.scrollY;
      const h = sectionRef.current.offsetHeight;
      /* progress: 0 at top, 1 when ~1.3x hero height scrolled */
      const progress = Math.min(scrollY / (h * 1.3), 1);

      /* slow drift downward — image follows you gently */
      const translateY = scrollY * 0.15;
      /* slight zoom-in as you scroll */
      const scale = 1.05 + progress * 0.1;
      /* fade: starts at 40% scroll, gone at 100% */
      const opacity = 1 - Math.min(Math.max((progress - 0.4) / 0.6, 0), 1);

      photoRef.current.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
      photoRef.current.style.opacity = opacity;

      if (overlayRef.current) {
        overlayRef.current.style.opacity = 1 + progress * 0.6;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="hero" ref={sectionRef}>
      {/* Fixed photo — follows viewport */}
      <div
        className={`hero-photo ${visible ? 'hero-photo--animate' : ''}`}
        ref={photoRef}
      />
      <div className="hero-overlay" ref={overlayRef} />
      <div className="hero-grain" />

      <div className={`hero-content ${visible ? 'hero-content--visible' : ''}`}>
        <span className="hero-kicker">Travel planner sensible</span>
        <h1 className="hero-title">
          J&ouml;r&eth;
          <span className="hero-title-sep">&nbsp;&mdash;&nbsp;</span>
          <em className="hero-title-by">by</em>
        </h1>
        <div className="hero-line" />
        <p className="hero-baseline">
          L&agrave; o&ugrave; la terre murmure,<br />
          le voyage commence.
        </p>
        <div className="hero-buttons">
          <a
            href="mailto:sandra@jord-by.com?subject=Mon%20prochain%20voyage"
            className="btn btn-primary"
          >
            Me parler de ton voyage
          </a>
          <a href="#approche" className="btn btn-ghost">
            D&eacute;couvrir l&apos;approche
          </a>
        </div>
      </div>

      <div className={`scroll-cue ${visible ? 'scroll-cue--visible' : ''}`}>
        <span className="scroll-cue-text">d&eacute;filer</span>
        <div className="scroll-cue-line" />
      </div>
    </section>
  );
}
