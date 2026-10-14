



'use client';

import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SplitHeading from '../ui/SplitHeading';

const needs = [
  {
    title: 'I need a better website',
    text: 'It no longer represents the business, or it simply is not turning visitors into enquiries.',
    cta: 'Web development',
    href: '/services/web-development',
  },
  {
    title: 'I need a custom tool or portal',
    text: 'Spreadsheets and off-the-shelf apps no longer fit the way the business actually works.',
    cta: 'Software development',
    href: '/services/software-development',
  },
  {
    title: 'I need support around the clock',
    text: 'Customers ask questions at all hours and we cannot always reply in time.',
    cta: 'AI Agents',
    href: '/services/ai-agents',
  },
  {
    title: 'We lose leads after they reach out',
    text: 'Missed calls, slow replies and scattered chats are quietly costing us customers.',
    cta: 'AI Automation',
    href: '/services/ai-automation',
  },
  {
    title: 'Our brand feels outdated',
    text: 'The company has moved on. The way it looks and sounds has not.',
    cta: 'Graphic design',
    href: '/services/graphic-design',
  },
  {
    title: 'I know we must grow, but how?',
    text: 'Perfect. That is exactly the conversation to have before anything gets built.',
    cta: "Let's talk business",
    href: '/contact',
  },
];

function NeedCard({ item, index }) {
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [5, -5]),
    { stiffness: 180, damping: 25 }
  );

  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [-5, 5]),
    { stiffness: 180, damping: 25 }
  );

  const handleMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="needs-light-item"
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.8,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        ref={cardRef}
        className="needs-light-card"
        style={{
          rotateX,
          rotateY,
        }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <Link href={item.href} className="needs-light-link" data-cursor>

          {/* top */}
          <div className="needs-light-top">

            <motion.span
              className="needs-light-number"
              whileHover={{ scale: 1.08 }}
            >
              {String(index + 1).padStart(2, '0')}
            </motion.span>

            <span className="needs-light-icon">
              ↗
            </span>

          </div>


          {/* content */}
          <div className="needs-light-content">

            <span className="needs-light-service">
              {item.cta}
            </span>

            <h3>{item.title}</h3>

            <p>{item.text}</p>

          </div>


          {/* bottom */}
          <div className="needs-light-bottom">

            <span>
              Explore
            </span>

            <span className="needs-light-line" />

            <motion.span
              className="needs-light-arrow"
              whileHover={{ x: 5 }}
            >
              →
            </motion.span>

          </div>

          {/* decorative 3D circle */}
          <div className="needs-light-orb">
            <div />
          </div>

        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function NeedsGrid() {
  return (
    <section className="needs-light">

      <div className="needs-light-noise" />

      <div className="container">

        {/* heading */}
        <motion.div
          className="needs-light-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >

          <div className="needs-light-kicker">
            <span />
            HOW WE THINK
          </div>

          <div className="needs-light-heading">

            <SplitHeading
              lines={[
                'Start with the problem,',
                'not the product.',
              ]}
              italicLines={[1]}
              className="h2 needs-light-title"
            />

            <p>
              A new website might be the answer. So might better search,
              faster follow-up, a sharper offer, or doing less.
              <strong> Pick what sounds like you.</strong>
            </p>

          </div>

        </motion.div>


        {/* cards */}
        <div className="needs-light-grid">

          {needs.map((item, index) => (
            <NeedCard
              key={item.title}
              item={item}
              index={index}
            />
          ))}

        </div>

      </div>
    </section>
  );
}