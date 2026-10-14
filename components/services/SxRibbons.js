'use client';
import { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';

const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

function Ribbon({ items, dir, tone }) {
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const vel = useVelocity(scrollY);
  const smooth = useSpring(vel, { damping: 50, stiffness: 400 });
  const boost = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const facing = useRef(dir);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const b = boost.get();
    if (b < -0.05) facing.current = -dir;
    else if (b > 0.05) facing.current = dir;
    let move = dir * 2.4 * (delta / 1000);
    move += facing.current * Math.abs(move) * Math.abs(b);
    base.set(wrap(-25, 0, base.get() + move));
  });
  const x = useTransform(base, (v) => `${v}%`);

  const set = (key) => (
    <div className="sx-ribbon-set" key={key}>
      {[...items, ...items, ...items].map((it, i) => (
        <span className="sx-ribbon-item" key={`${key}-${i}`}>
          {it}
          <i aria-hidden="true" />
        </span>
      ))}
    </div>
  );
  return (
    <div className={`sx-ribbon sx-ribbon-${tone}`} aria-hidden="true">
      <motion.div className="sx-ribbon-track" style={{ x }}>
        {[0, 1, 2, 3].map(set)}
      </motion.div>
    </div>
  );
}

// Two ribbons cross each other and speed up in the direction you scroll.
export default function SxRibbons({ items }) {
  return (
    <div className="sx-ribbons" role="presentation">
      <Ribbon items={items} dir={1} tone="accent" />
      <Ribbon items={[...items].reverse()} dir={-1} tone="ink" />
      <ul className="sr-only">{items.map((t) => <li key={t}>{t}</li>)}</ul>
    </div>
  );
}
