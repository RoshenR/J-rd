import Reveal from './Reveal';

export default function About() {
  return (
    <section id="sandra" className="section about">
      <div className="about-inner">
        <Reveal>
          <span className="section-tag">Qui suis-je</span>
        </Reveal>

        <Reveal>
          <blockquote className="about-text">
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
        </Reveal>

        <Reveal className="about-signature">
          <div className="about-sig-line" aria-hidden="true" />
          <span className="about-sig-name">Sandra</span>
          <span className="about-sig-role">
            Fondatrice de J&ouml;r&eth;&nbsp;&mdash;&nbsp;by
          </span>
        </Reveal>
      </div>
    </section>
  );
}
