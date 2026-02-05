'use client';

import { useEffect, useRef } from 'react';

const offers = [
  {
    number: '01',
    title: 'Itin\u00e9raire sur mesure',
    description:
      'Chaque voyage est pens\u00e9 \u00e0 partir de qui vous \u00eates. Vos envies, votre rythme, vos r\u00eaves de loin \u2014 tout est \u00e9cout\u00e9, rien n\u2019est impos\u00e9.',
  },
  {
    number: '02',
    title: 'Voyage lent & immersif',
    description:
      'Prendre le temps de sentir un lieu, d\u2019y revenir le matin, de s\u2019y perdre sans carte. Le voyage lent est celui qui laisse une empreinte.',
  },
  {
    number: '03',
    title: 'Exp\u00e9riences authentiques',
    description:
      'Rencontres locales, tables cach\u00e9es, chemins oubli\u00e9s. Ce qui ne se trouve pas dans les guides, mais dans les conversations.',
  },
];

export default function Offers() {
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    refs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="approche" className="section offers">
      <div className="reveal" ref={(el) => (refs.current[0] = el)}>
        <span className="section-tag">L&apos;approche</span>
        <h2 className="section-heading">
          Trois fa&ccedil;ons de<br />voyager autrement
        </h2>
      </div>

      <div className="offers-grid">
        {offers.map((offer, i) => (
          <article
            key={i}
            className="card reveal"
            ref={(el) => (refs.current[i + 1] = el)}
            style={{ transitionDelay: `${i * 0.15}s` }}
          >
            <div className="card-head">
              <span className="card-num">{offer.number}</span>
              <div className="card-rule" />
            </div>
            <h3 className="card-title">{offer.title}</h3>
            <p className="card-text">{offer.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
