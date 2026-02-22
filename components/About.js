'use client';

import { useEffect, useRef } from 'react';

export default function About() {
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );
    refs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="sandra" className="section about">
      <div className="about-inner">
        <div className="reveal" ref={(el) => (refs.current[0] = el)}>
          <span className="section-tag">Qui suis-je</span>
        </div>

        <blockquote
          className="about-text reveal"
          ref={(el) => (refs.current[1] = el)}
        >
          <p>
            Je m&apos;appelle Sandra. J&apos;ai grandi entre les cartes
            d&eacute;pli&eacute;es sur la table et les r&eacute;cits de
            voyages lus &agrave; voix haute.
          </p>
          <p>
            Avant de cr&eacute;er J&ouml;r&eth;, j&apos;ai beaucoup
            voyag&eacute;&nbsp;&mdash; souvent seule, toujours lentement.
            J&apos;ai appris que les plus beaux itin&eacute;raires ne sont
            pas ceux qui cochent des lieux, mais ceux qui laissent le temps
            de s&apos;arr&ecirc;ter, d&apos;&eacute;couter,
            de se laisser surprendre.
          </p>
          <p>
            Aujourd&apos;hui, je compose des voyages comme on &eacute;crit
            des lettres&nbsp;: avec attention, avec sinc&eacute;rit&eacute;,
            en pensant &agrave; la personne qui les recevra.
          </p>
        </blockquote>

        <div
          className="about-signature reveal"
          ref={(el) => (refs.current[2] = el)}
        >
          <div className="about-sig-line" />
          <span className="about-sig-name">Sandra</span>
          <span className="about-sig-role">
          </span>
        </div>
      </div>
    </section>
  );
}
