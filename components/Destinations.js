'use client';

import { useEffect, useRef } from 'react';

const destinations = [
  {
    name: 'Norv\u00e8ge',
    mood: 'Fjords & silence',
    image: 'https://images.unsplash.com/photo-1520769669658-f07657f5a307?w=600&q=80',
  },
  {
    name: 'Japon',
    mood: 'Temples & saisons',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80',
  },
  {
    name: 'Portugal',
    mood: 'Lumi\u00e8re & oc\u00e9an',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&q=80',
  },
  {
    name: '\u00c9cosse',
    mood: 'Landes & brume',
    image: 'https://images.unsplash.com/photo-1506377585622-bedcbb5f6740?w=600&q=80',
  },
  {
    name: 'Islande',
    mood: 'Terre & feu',
    image: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=600&q=80',
  },
  {
    name: 'Gr\u00e8ce',
    mood: '\u00celes & douceur',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80',
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
