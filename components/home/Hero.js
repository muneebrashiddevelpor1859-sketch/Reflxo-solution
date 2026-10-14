'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '../ui/Button';

export default function Hero() {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const contentOp = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);

  useEffect(() => {
    const seen = sessionStorage.getItem('reflexo-intro');
    const t = setTimeout(() => setReady(true), seen ? 150 : 2100);

    return () => clearTimeout(t);
  }, []);

  const spot = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();

    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`);
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  const fade = (delay) => ({
    initial: { opacity: 0, y: 30 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section className="hero" ref={ref} onMouseMove={spot}>
      <motion.div className="hero-media" style={{ scale: videoScale }}>
        <div className="hero-fallback" aria-hidden="true" />

        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source
            src="videos/8141241-uhd_3840_2160_25fps.mp4"
            type="video/mp4"
          />
        </video>
      </motion.div>

      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-spot" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <motion.div
        className="container hero-content"
        style={{ y: contentY, opacity: contentOp }}
      >
        <motion.p className="hero-eyebrow" {...fade(0.2)}>
          <span aria-hidden="true" />
          Independent digital agency
          <i aria-hidden="true">/</i>
          Working worldwide
        </motion.p>

        <div className="hero-main">
          <div className="hero-main-copy">
            <motion.h1
              id="home-hero-title"
              className="hero-title"
              initial="hidden"
              animate={ready ? 'show' : 'hidden'}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.16, delayChildren: 0.05 } },
              }}
              aria-label="Make your next move count."
            >
              <motion.span
                className="hero-title-line"
                aria-hidden="true"
                variants={{
                  hidden: { opacity: 0, y: '110%' },
                  show: { opacity: 1, y: '0%' },
                }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                Make your next
              </motion.span>
              <motion.span
                className="hero-title-line hero-title-accent"
                aria-hidden="true"
                variants={{
                  hidden: { opacity: 0, y: '110%' },
                  show: { opacity: 1, y: '0%' },
                }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                move count.
              </motion.span>
            </motion.h1>

            <motion.p className="hero-manifesto" {...fade(0.7)}>
              A clearer brand. A better website.
              <br />
              Less work that needs doing twice.
            </motion.p>
          </div>

          <motion.aside className="hero-side-note" {...fade(0.85)}>
            <span className="hero-side-label">Built around your next move</span>
            <span><i>01</i> Brand &amp; strategy</span>
            <span><i>02</i> Digital experiences</span>
            <span><i>03</i> AI &amp; automation</span>
          </motion.aside>
        </div>

        <div className="hero-bottom">
          <p className="hero-sub">
            Websites, visual identities and useful automations, built around
            the people who use them.
          </p>
          <motion.div className="hero-actions" {...fade(0.9)}>
            <Button href="/contact">Start a project</Button>

            <Button href="/services" variant="line">
              What we do
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="hero-scroll"
        {...fade(1.4)}
        aria-hidden="true"
      >
        <svg viewBox="0 0 120 120" className="hero-scroll-ring">
          <defs>
            <path
              id="circ"
              d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
            />
          </defs>

          <text>
            <textPath href="#circ">
              Scroll to explore - Scroll to explore -
            </textPath>
          </text>
        </svg>

        <span className="hero-scroll-arrow">&darr;</span>
      </motion.div>
    </section>
  );
}