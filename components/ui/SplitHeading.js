'use client';
import { motion } from 'framer-motion';

// Words slide up out of a mask. `lines` = array of strings, each string is one visual line.
export default function SplitHeading({
  lines = [],
  as = 'h2',
  className = '',
  delay = 0,
  immediate = false,
  italicLines = [],
}) {
  const Tag = motion[as] || motion.h2;
  const words = lines.map((l) => l.split(' '));
  let n = 0;

  const anim = immediate
    ? { animate: 'show' }
    : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } };

  return (
    <Tag
      className={`split ${className}`}
      initial="hide"
      {...anim}
      transition={{ staggerChildren: 0.07, delayChildren: delay }}
      aria-label={lines.join(' ')}
    >
      {words.map((line, li) => (
        <span className={`split-line ${italicLines.includes(li) ? 'is-italic' : ''}`} key={li} aria-hidden="true">
          {line.map((w, wi) => {
            n += 1;
            return (
              <span className="split-mask" key={`${li}-${wi}-${n}`}>
                <motion.span
                  className="split-word"
                  variants={{ hide: { y: '115%', rotate: 4 }, show: { y: '0%', rotate: 0 } }}
                  transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}
                </motion.span>
                {'\u00A0'}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
