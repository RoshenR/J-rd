import Reveal from './Reveal';

export default function Contact() {
  return (
    <Reveal tag="section" id="contact" className="section contact" threshold={0.12}>
      <span className="section-tag">Contact</span>
      <h2 className="section-heading">Parlons de ton voyage</h2>
      <p className="contact-text">
        Chaque voyage commence par une conversation.
        Raconte-moi ce que tu cherches, ce qui t&apos;attire,
        ce que tu veux ressentir&nbsp;&mdash; et on construit
        ensemble un itin&eacute;raire qui te ressemble.
      </p>
      <div className="contact-actions">
        <a
          href="mailto:sandra@jord-by.com?subject=Mon%20prochain%20voyage"
          className="btn btn-primary"
        >
          &Eacute;crire &agrave; Sandra
        </a>
        <a
          href="https://instagram.com/jord.by"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
        >
          Suivre sur Instagram
        </a>
      </div>
    </Reveal>
  );
}
