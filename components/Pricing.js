'use client';

import { useEffect, useRef } from 'react';

const formulas = [
  {
    name: 'La Boussole',
    price: 'À partir de 35\u00a0€',
    tag: 'Regard & conseils',
    description:
      'Tu as déjà ton itinéraire, mais tu veux partir l\u2019esprit léger. Sandra pose son regard sur ton plan, vérifie les détails et s\u2019assure que tu puisses vraiment profiter de chaque moment.',
    services: [
      'Relecture de ton itinéraire existant',
      'Conseils et ajustements',
      'Partage de bonnes adresses',
    ],
    note: null,
    highlight: false,
  },
  {
    name: 'L\u2019Esquisse',
    price: '50\u00a0€\u00a0/ jour',
    tag: 'Jusqu\u2019à 4\u00a0personnes · 9\u00a0jours · 2\u00a0étapes',
    description:
      'Sandra compose ton voyage de A à Z — transports, hébergements, activités et bonnes adresses — et te remet un carnet de voyage digital soigné.',
    services: [
      'Recherche des transports',
      '2–3 hébergements proposés',
      'Activités et visites',
      'Partage de bonnes adresses',
      'Carnet de voyage digital',
      'Joignable pendant le voyage',
    ],
    note: 'Voyage de plus de 9\u00a0jours ou plus de 4\u00a0personnes\u00a0? Contacte Sandra pour un devis personnalisé.',
    highlight: false,
  },
  {
    name: 'L\u2019Épopée',
    price: '65\u00a0€\u00a0/ jour',
    tag: 'Jusqu\u2019à 4\u00a0personnes · 15\u00a0jours · multi-étapes',
    description:
      'Pour les voyages qui s\u2019étirent et se déploient en plusieurs chapitres. Sandra orchestre chaque étape avec soin, des premières pistes jusqu\u2019au carnet final.',
    services: [
      'Recherche des transports',
      '2 hébergements proposés par étape',
      'Activités et visites',
      'Partage de bonnes adresses',
      'Carnet de voyage digital',
      'Joignable pendant le voyage',
    ],
    note: 'Voyage de plus de 15\u00a0jours et/ou plus de 4\u00a0personnes\u00a0? Contacte Sandra pour un devis personnalisé.',
    highlight: false,
  },
  {
    name: 'Carte Blanche',
    price: 'Sur devis',
    tag: 'Entièrement personnalisé',
    description:
      'Pour les voyages qui n\u2019entrent dans aucune case. Sandra compose librement\u00a0— sans contrainte de durée, d\u2019étapes ou de nombre de voyageurs. Chaque détail est pensé depuis le premier échange, jusqu\u2019au retour. Tarif établi sur devis uniquement, dès qu\u2019on se parle.',
    services: [],
    note: null,
    highlight: true,
  },
];

export default function Pricing() {
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
    <section id="tarifs" className="section pricing">
      <div className="reveal" ref={(el) => (refs.current[0] = el)}>
        <span className="section-tag">Tarifs</span>
        <h2 className="section-heading">
          Choisir sa<br />formule de voyage
        </h2>
      </div>

      <div className="pricing-grid">
        {formulas.map((f, i) => (
          <article
            key={i}
            className={`pricing-card reveal${f.highlight ? ' pricing-card--highlight' : ''}`}
            ref={(el) => (refs.current[i + 1] = el)}
            style={{ transitionDelay: `${i * 0.12}s` }}
          >
            <div className="pricing-card-head">
              <h3 className="pricing-name">{f.name}</h3>
              <span className="pricing-price">{f.price}</span>
            </div>
            <span className="pricing-tag">{f.tag}</span>
            <p className="pricing-desc">{f.description}</p>
            {f.services.length > 0 && (
              <ul className="pricing-services">
                {f.services.map((s, j) => (
                  <li key={j}>{s}</li>
                ))}
              </ul>
            )}
            {f.note && <p className="pricing-note">{f.note}</p>}
            <a
              href="mailto:sandra@jord-by.com?subject=Demande%20de%20devis"
              className="btn btn-ghost pricing-cta"
            >
              Demander un devis
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
