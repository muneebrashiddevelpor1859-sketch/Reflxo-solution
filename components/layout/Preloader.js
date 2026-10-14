'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Shows once per browser session
export default function Preloader() {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem('reflexo-intro')) return;
    setShow(true);
    document.body.style.overflow = 'hidden';
    const start = performance.now();
    const total = 1500;
    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / total, 1);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          sessionStorage.setItem('reflexo-intro', '1');
          document.body.style.overflow = '';
          setShow(false);
        }, 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="preloader"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="preloader-inner">
            <motion.span
              className="preloader-word"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Reflexo
            </motion.span>
            <span className="preloader-count">{String(count).padStart(3, '0')}</span>
          </div>
          <div className="preloader-line">
            <span style={{ transform: `scaleX(${count / 100})` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
