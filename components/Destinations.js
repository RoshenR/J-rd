import Image from 'next/image';
import Reveal from './Reveal';

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
  return (
    <section id="destinations" className="section destinations">
      <Reveal>
        <span className="section-tag">Inspirations</span>
        <h2 className="section-heading">
          Quelques terres<br />qui nous appellent
        </h2>
      </Reveal>

      <div className="dest-grid">
        {destinations.map((d, i) => (
          <Reveal
            key={i}
            tag="figure"
            className="dest-card"
            delay={i * 0.1}
            threshold={0.08}
            rootMargin="0px 0px -40px 0px"
          >
            <div className="dest-img">
              <Image
                src={d.image}
                alt={`${d.name} \u2014 ${d.mood}`}
                fill
                loading="lazy"
                quality={80}
                sizes="(max-width: 580px) 100vw, (max-width: 900px) 50vw, 33vw"
              />
            </div>
            <figcaption className="dest-caption">
              <span className="dest-name">{d.name}</span>
              <span className="dest-mood">{d.mood}</span>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
