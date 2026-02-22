import Reveal from './Reveal';

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
  return (
    <section id="approche" className="section offers">
      <Reveal>
        <span className="section-tag">L&apos;approche</span>
        <h2 className="section-heading">
          Trois fa&ccedil;ons de<br />voyager autrement
        </h2>
      </Reveal>

      <div className="offers-grid">
        {offers.map((offer, i) => (
          <Reveal key={i} tag="article" className="card" delay={i * 0.15}>
            <div className="card-head">
              <span className="card-num">{offer.number}</span>
              <div className="card-rule" aria-hidden="true" />
            </div>
            <h3 className="card-title">{offer.title}</h3>
            <p className="card-text">{offer.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
