'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function PageMotion({ children }) {
  const pathname = usePathname();
  const root = useRef(null);
  const scene = useRef(null);

  useEffect(() => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !root.current
    ) return undefined;

    const pageContent = Array.from(root.current.children).find(
      (child) => !child.classList.contains('page-wipe') && !child.classList.contains('page-scene-wash')
    );
    if (!pageContent) return undefined;

    const sections = pageContent.querySelectorAll('section:not(.hero)');
    if (sections.length === 0) return undefined;

    const sceneColors = ['#c8ff64', '#a78bfa', '#ff8f66', '#78d2bd'];
    let frame = 0;

    sections.forEach((section, index) => {
      section.style.setProperty('--page-scene-color', sceneColors[index % sceneColors.length]);
      section.querySelectorAll('img').forEach((image) => image.classList.add('page-scroll-image'));
    });

    const footer = document.querySelector('.footer');
    if (footer) {
      footer.style.setProperty('--page-scene-color', sceneColors[sections.length % sceneColors.length]);
    }

    const updateScrollScene = () => {
      const center = window.innerHeight / 2;
      const candidates = footer ? [...sections, footer] : sections;
      const activeSection = candidates
        .filter((section) => {
          const rect = section.getBoundingClientRect();
          return rect.bottom > 0 && rect.top < window.innerHeight;
        })
        .sort((a, b) => {
          const aRect = a.getBoundingClientRect();
          const bRect = b.getBoundingClientRect();
          const aCenter = aRect.top + aRect.height / 2;
          const bCenter = bRect.top + bRect.height / 2;
          return Math.abs(aCenter - center) - Math.abs(bCenter - center);
        })[0];
      scene.current?.style.setProperty(
        'background-color',
        activeSection?.style.getPropertyValue('--page-scene-color') || 'transparent'
      );

      candidates.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const distance = (rect.top + rect.height / 2 - center) / Math.max(window.innerHeight, 1);
        const progress = Math.max(-1, Math.min(1, distance));
        const contentRange = window.innerWidth <= 640 ? 14 : 20;
        const imageRange = window.innerWidth <= 640 ? 24 : 40;
        section.style.setProperty('--page-content-shift', `${progress * -contentRange}px`);
        section.querySelectorAll('.page-scroll-image').forEach((image) => {
          image.style.setProperty('--page-image-shift', `${progress * imageRange}px`);
        });
      });
    };

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
    );

    const scheduleScrollUpdate = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        updateScrollScene();
      });
    };

    sections.forEach((section) => {
      section.classList.add('page-scroll-section');
      revealObserver.observe(section);
    });

    window.addEventListener('scroll', scheduleScrollUpdate, { passive: true });
    window.addEventListener('resize', scheduleScrollUpdate);
    window.__lenis?.on('scroll', scheduleScrollUpdate);
    updateScrollScene();

    return () => {
      window.removeEventListener('scroll', scheduleScrollUpdate);
      window.removeEventListener('resize', scheduleScrollUpdate);
      window.__lenis?.off('scroll', scheduleScrollUpdate);
      cancelAnimationFrame(frame);
      revealObserver.disconnect();
    };
  }, [pathname]);

  return (
    <div key={pathname} ref={root} className="page-motion">
      {children}
      <span ref={scene} className="page-scene-wash" aria-hidden="true" />
    </div>
  );
}
