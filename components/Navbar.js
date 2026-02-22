'use client';

import { useEffect, useState } from 'react';

const links = [
  { label: 'Approche', href: '#approche' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Sandra', href: '#sandra' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* Focus trap + Escape to close */
  useEffect(() => {
    if (!menuOpen) return;

    const nav = document.querySelector('.navbar');
    if (!nav) return;

    const focusable = nav.querySelectorAll('a[href], button:not([disabled])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        document.querySelector('.navbar-burger')?.focus();
        return;
      }
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--solid' : ''}`}>
      <a href="#" className="navbar-brand">
        J&ouml;r&eth;&nbsp;&mdash;&nbsp;by
      </a>

      <button
        className={`navbar-burger ${menuOpen ? 'navbar-burger--open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={menuOpen}
        aria-controls="navbar-menu"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      <ul
        id="navbar-menu"
        className={`navbar-links ${menuOpen ? 'navbar-links--open' : ''}`}
        role="list"
      >
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
