'use client';

import { useEffect, useRef } from 'react';

export default function Divider() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="section-divider reveal" ref={ref}>
      <span className="section-divider-dot" />
      <span className="section-divider-line" />
      <span className="section-divider-dot" />
    </div>
  );
}
