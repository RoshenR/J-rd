import Reveal from './Reveal';

export default function Divider() {
  return (
    <Reveal className="section-divider" threshold={0.5} aria-hidden="true" role="presentation">
      <span className="section-divider-dot" />
      <span className="section-divider-line" />
      <span className="section-divider-dot" />
    </Reveal>
  );
}
