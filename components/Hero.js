'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Hero() {
  const photoRef = useRef(null);
  const overlayRef = useRef(null);
  const sectionRef = useRef(null);

  /* Parallax scroll effect */
  useEffect(() => {
    function onScroll() {
      if (!photoRef.current || !sectionRef.current) return;

      const scrollY = window.scrollY;
      const h = sectionRef.current.offsetHeight;
      const progress = Math.min(scrollY / (h * 1.3), 1);

      const translateY = scrollY * 0.15;
      const scale = 1.05 + progress * 0.1;
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

  /* Pause Ken Burns when hero is off-screen */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const photo = photoRef.current;
        if (!photo) return;
        photo.style.animationPlayState = entry.isIntersecting
          ? 'running'
          : 'paused';
      },
      { threshold: 0 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero" ref={sectionRef}>
      <div className="hero-photo" ref={photoRef}>
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
          alt="Paysage montagneux avec ciel lumineux"
          fill
          priority
          quality={85}
          sizes="100vw"
        />
      </div>
      <div className="hero-overlay" ref={overlayRef} aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />

      <div className="hero-content">
        <span className="hero-kicker">Travel planner sensible</span>
        <h1 className="hero-title">
          J&ouml;r&eth;
          <span className="hero-title-sep" aria-hidden="true">
            &nbsp;&mdash;&nbsp;
          </span>
          <em className="hero-title-by">by</em>
        </h1>
        <div className="hero-line" aria-hidden="true" />
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

      <div className="scroll-cue" aria-hidden="true">
        <span className="scroll-cue-text">d&eacute;filer</span>
        <div className="scroll-cue-line" />
      </div>
    </section>
  );
}
