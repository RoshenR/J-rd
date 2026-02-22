import Reveal from './Reveal';

const testimonials = [
  {
    quote:
      'Sandra ne planifie pas un voyage, elle \u00e9coute un r\u00eave et le rend possible. Chaque matin au Japon, je me suis r\u00e9veill\u00e9e exactement l\u00e0 o\u00f9 je devais \u00eatre.',
    name: 'Camille',
    destination: 'Japon, 14\u00a0jours',
  },
  {
    quote:
      'On avait juste dit\u00a0: \u00ab\u00a0du silence et la mer.\u00a0\u00bb Elle a trouv\u00e9 une \u00eele en Norv\u00e8ge dont on ne conna\u00eessait m\u00eame pas le nom. C\u2019\u00e9tait parfait.',
    name: 'Thomas & In\u00e8s',
    destination: 'Norv\u00e8ge, 10\u00a0jours',
  },
  {
    quote:
      'Je voulais retrouver le go\u00fbt de voyager seule, sans l\u2019angoisse de tout organiser. Sandra m\u2019a donn\u00e9 un itin\u00e9raire et une confiance.',
    name: 'Margaux',
    destination: 'Portugal, 8\u00a0jours',
  },
];

export default function Testimonials() {
  return (
    <section className="section testimonials">
      <Reveal>
        <span className="section-tag">T&eacute;moignages</span>
        <h2 className="section-heading">Ce qu&apos;ils en disent</h2>
      </Reveal>

      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <Reveal key={i} tag="figure" className="testimonial" delay={i * 0.15}>
            <blockquote className="testimonial-quote">
              &laquo;&nbsp;{t.quote}&nbsp;&raquo;
            </blockquote>
            <figcaption className="testimonial-author">
              <span className="testimonial-name">{t.name}</span>
              <span className="testimonial-dest">{t.destination}</span>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
