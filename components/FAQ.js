'use client';

import { useState, useEffect, useRef } from 'react';

const tabs = [
  {
    label: 'Questions pratiques',
    faqs: [
      {
        q: 'Comment se passe le premier contact\u00a0?',
        a: 'Envoie-moi quelques mots sur ton projet\u00a0: la destination, les dates, ce que tu cherches. Je te réponds dans les 48\u00a0h et on échange plus longuement de là.',
      },
      {
        q: 'Combien de temps à l\u2019avance faut-il réserver\u00a0?',
        a: 'Idéalement entre 4 et 8\u00a0semaines avant le départ pour un voyage bien pensé. Mais chaque situation est différente\u00a0— si tu pars dans 2\u00a0semaines, contacte-moi quand même.',
      },
      {
        q: 'Comment se passe le paiement\u00a0?',
        a: 'Un acompte de 50\u00a0% est demandé à la validation du devis. Le solde est réglé à la livraison du carnet de voyage digital.',
      },
      {
        q: 'Est-ce que je peux modifier l\u2019itinéraire après\u00a0?',
        a: 'Bien sûr. Une ronde de modifications est incluse dans chaque formule. Pour des ajustements plus importants, on en discute ensemble.',
      },
      {
        q: 'Qu\u2019est-ce que le carnet de voyage digital\u00a0?',
        a: 'Un document soigné, partageable et lisible sur tous les appareils, qui regroupe tout\u00a0: transports, hébergements, activités, bonnes adresses, et les petits détails qui font la différence.',
      },
    ],
  },
  {
    label: 'C\u2019est quoi un Travel Planner\u00a0?',
    faqs: [
      {
        q: 'Qu\u2019est-ce qu\u2019un Travel Planner exactement\u00a0?',
        a: 'Un Travel Planner est un expert du voyage indépendant qui conçoit des itinéraires sur mesure à partir de tes envies, ton rythme et ce que tu veux vraiment vivre. Il travaille seul, sans catalogue imposé, et prend le temps de te connaître avant de construire quoi que ce soit.',
      },
      {
        q: 'Quelle est la différence avec une agence de voyage\u00a0?',
        a: 'Une agence propose des séjours prédéfinis issus d\u2019un catalogue. Un Travel Planner, lui, part de zéro\u00a0: il écoute ce que tu cherches, ce que tu veux ressentir, et compose quelque chose qui n\u2019existe nulle part ailleurs. C\u2019est la différence entre un costume sur mesure et du prêt-à-porter.',
      },
      {
        q: 'Est-ce que c\u2019est plus cher qu\u2019une agence\u00a0?',
        a: 'Pas forcément. Les agences prennent des marges sur chaque prestation réservée (hôtels, vols, activités). Un Travel Planner facture ses honoraires de conception, mais tu réserves les prestations toi-même au prix réel. Le coût global est souvent similaire, voire inférieur\u00a0— et le résultat, incomparable.',
      },
      {
        q: 'Pour quel type de voyage est-ce fait\u00a0?',
        a: 'Pour n\u2019importe quel voyage où tu veux que ça te ressemble vraiment. Un premier voyage en solo, un séjour en famille, un voyage de noces, une aventure hors des sentiers battus\u00a0— dès que le voyage compte, ça vaut la peine d\u2019être bien pensé.',
      },
      {
        q: 'Est-ce que je garde la liberté de choisir\u00a0?',
        a: 'Toujours. Le Travel Planner propose, tu disposes. Chaque itinéraire est discuté, ajusté, retravaillé jusqu\u2019à ce qu\u2019il te corresponde. Tu restes décisionnaire à chaque étape.',
      },
    ],
  },
];

export default function FAQ() {
  const [activeTab, setActiveTab] = useState(0);
  const [open, setOpen] = useState(null);
  const [visible, setVisible] = useState(new Set());
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = refs.current.indexOf(e.target);
            setVisible((prev) => new Set([...prev, idx]));
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    refs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const handleTab = (i) => {
    setActiveTab(i);
    setOpen(null);
  };

  const cls = (idx, base) =>
    `${base}${visible.has(idx) ? ' visible' : ''}`;

  return (
    <section id="faq" className="section faq">
      <div
        className={cls(0, 'reveal')}
        ref={(el) => (refs.current[0] = el)}
      >
        <span className="section-tag">Questions fréquentes</span>
        <h2 className="section-heading">
          Ce que tu veux<br />savoir avant de partir
        </h2>
      </div>

      <div
        className={cls(1, 'faq-tabs reveal')}
        ref={(el) => (refs.current[1] = el)}
        style={{ transitionDelay: '0.1s' }}
      >
        {tabs.map((tab, i) => (
          <button
            key={i}
            className={`faq-tab${activeTab === i ? ' faq-tab--active' : ''}`}
            onClick={() => handleTab(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="faq-list">
        {tabs[activeTab].faqs.map((item, i) => (
          <div
            key={`${activeTab}-${i}`}
            className={cls(i + 2, `faq-item reveal${open === i ? ' faq-item--open' : ''}`)}
            ref={(el) => (refs.current[i + 2] = el)}
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <button
              className="faq-question"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span>{item.q}</span>
              <span className="faq-icon">{open === i ? '\u2212' : '+'}</span>
            </button>
            <div className="faq-answer">
              <p>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
