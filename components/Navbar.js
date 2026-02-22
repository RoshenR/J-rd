'use client';

import { useEffect, useState } from 'react';

const links = [
  { label: 'Approche', href: '#approche' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Tarifs', href: '#tarifs' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Sandra', href: '#sandra' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ visible }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <nav className={`navbar ${scrolled ? 'navbar--solid' : ''}`}>
      <a href="#" className="navbar-brand">
        J&ouml;r&eth;&nbsp;&mdash;&nbsp;by
      </a>

      <button
        className={`navbar-burger ${menuOpen ? 'navbar-burger--open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span />
        <span />
      </button>

      <ul className={`navbar-links ${menuOpen ? 'navbar-links--open' : ''}`}>
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
