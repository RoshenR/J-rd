'use client';

import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let animId;

    function onMove(e) {
      mx = e.clientX;
      my = e.clientY;
    }

    function onEnterInteractive() {
      ring.classList.add('cursor-ring--hover');
    }
    function onLeaveInteractive() {
      ring.classList.remove('cursor-ring--hover');
    }

    function animate() {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;

      dot.style.transform = `translate(${mx}px, ${my}px)`;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;

      animId = requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('mousemove', onMove);

    const interactives = document.querySelectorAll('a, button, .card, .dest-card, .testimonial');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnterInteractive);
      el.addEventListener('mouseleave', onLeaveInteractive);
    });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMove);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterInteractive);
        el.removeEventListener('mouseleave', onLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  );
}
