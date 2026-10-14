'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { projects } from '@/data/projects';
import Cover from '../ui/Cover';
import Button from '../ui/Button';

export default function WorkScroll() {
  const featured = projects.slice(0, 4);
  const stageRef = useRef(null);
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (window.matchMedia('(max-width: 760px)').matches) return;
    const nextIndex = Math.min(featured.length - 1, Math.round(progress * (featured.length - 1)));
    setActive((current) => current === nextIndex ? current : nextIndex);
  });

  const selectProject = (index) => {
    if (window.matchMedia('(max-width: 760px)').matches) {
      setActive(index);
      return;
    }

    const section = stageRef.current;
    if (!section) return;

    const sectionStart = section.getBoundingClientRect().top + window.scrollY;
    const scrollableDistance = Math.max(0, section.offsetHeight - window.innerHeight);
    const destination = sectionStart + scrollableDistance * (index / (featured.length - 1));

    if (window.__lenis) window.__lenis.scrollTo(destination, { duration: 0.8 });
    else window.scrollTo({ top: destination, behavior: 'smooth' });
  };

  const project = featured[active];
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.55, ease: [0.22, 1, 0.36, 1] };

  return (
    <section
      ref={stageRef}
      className="work work-showcase"
      style={{ '--work-item-count': featured.length }}
      aria-labelledby="selected-work-title"
    >
      <div className="work-showcase-stage">
        <AnimatePresence mode={reduceMotion ? 'sync' : 'wait'} initial={false}>
          <motion.div
            key={project.slug}
            className="work-showcase-image"
            aria-hidden="true"
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.035 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
          >
            <Cover title={project.title} hue={project.hue} image={project.image} />
          </motion.div>
        </AnimatePresence>

        <div className="work-showcase-shade" aria-hidden="true" />

        <div className="container work-showcase-top">
          <div>
            <p className="work-showcase-kicker">A FEW RECENT PROJECTS</p>
            <h2 id="selected-work-title">Selected work</h2>
          </div>
          <Button href="/portfolio" variant="line" magnetic={false}>View all work</Button>
        </div>

        <div className="container work-showcase-layout">
          <ol className="work-showcase-list" aria-label="Selected projects">
            {featured.map((item, index) => (
              <li key={item.slug}>
                <button
                  type="button"
                  className={`work-showcase-item${index === active ? ' is-active' : ''}`}
                  aria-pressed={index === active}
                  onClick={() => selectProject(index)}
                >
                  <span>{item.title}</span>
                  <span className="work-showcase-item-index">{String(index + 1).padStart(2, '0')}</span>
                </button>
              </li>
            ))}
          </ol>

          <AnimatePresence mode={reduceMotion ? 'sync' : 'wait'} initial={false}>
            <motion.div
              key={`${project.slug}-copy`}
              className="work-showcase-copy"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
              transition={transition}
            >
              <p className="work-showcase-meta">{project.category}<span>/</span>{project.year}</p>
              <h3>{project.title}</h3>
              <p className="work-showcase-summary">{project.summary}</p>
              <Link href={`/portfolio/${project.slug}`} className="work-showcase-link">
                <span>Explore project</span><i aria-hidden="true">↗</i>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="work-showcase-progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${(active + 1) / featured.length})` }} />
        </div>
      </div>
    </section>
  );
}