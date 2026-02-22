'use client';

import { useEffect, useRef } from 'react';

const destinations = [
  {
    name: 'Portugal',
    mood: 'Lumi\u00e8re & oc\u00e9an',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&q=80',
  },
  {
    name: 'France',
    mood: 'Art & \u00e9l\u00e9gance',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80',
  },
  {
    name: 'Cor\u00e9e',
    mood: 'Tradition & modernit\u00e9',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80',
  },
];

export default function Destinations() {
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    refs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="destinations" className="section destinations">
      <div className="reveal" ref={(el) => (refs.current[0] = el)}>
        <span className="section-tag">Inspirations</span>
        <h2 className="section-heading">
          Quelques terres<br />qui nous appellent
        </h2>
      </div>

      <div className="dest-grid">
        {destinations.map((d, i) => (
          <figure
            key={i}
            className="dest-card reveal"
            ref={(el) => (refs.current[i + 1] = el)}
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div
              className="dest-img"
              style={{ backgroundImage: `url(${d.image})` }}
            />
            <figcaption className="dest-caption">
              <span className="dest-name">{d.name}</span>
              <span className="dest-mood">{d.mood}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
