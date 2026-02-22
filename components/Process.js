import Reveal from './Reveal';

const steps = [
  {
    num: '01',
    title: 'On \u00e9change',
    text: 'Tu me racontes tes envies, ton rythme, ce qui te fait vibrer. Je pose des questions, j\u2019\u00e9coute entre les lignes.',
  },
  {
    num: '02',
    title: 'Je compose',
    text: 'Je cr\u00e9e un itin\u00e9raire sur mesure\u00a0: lieux, h\u00e9bergements, exp\u00e9riences. Chaque d\u00e9tail est pens\u00e9 pour toi.',
  },
  {
    num: '03',
    title: 'Tu pars',
    text: 'Tu re\u00e7ois ton carnet de voyage complet. Il ne te reste qu\u2019\u00e0 vivre, je reste disponible pendant tout le s\u00e9jour.',
  },
];

export default function Process() {
  return (
    <section className="section process">
      <Reveal>
        <span className="section-tag">Comment &ccedil;a marche</span>
        <h2 className="section-heading">
          Trois &eacute;tapes vers<br />ton prochain voyage
        </h2>
      </Reveal>

      <div className="process-steps">
        <div className="process-line" aria-hidden="true" />

        {steps.map((s, i) => (
          <Reveal key={i} className="process-step" delay={i * 0.18}>
            <div className="process-dot">
              <span>{s.num}</span>
            </div>
            <h3 className="process-title">{s.title}</h3>
            <p className="process-text">{s.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
