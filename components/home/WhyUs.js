'use client';

import { motion } from 'framer-motion';
import SplitHeading from '../ui/SplitHeading';
import Tilt from '../ui/Tilt';

const visuals = {
  venn: (
    <svg viewBox="0 0 300 120" aria-hidden="true">
      <circle
        className="v-circle-a"
        cx="105"
        cy="60"
        r="46"
        fill="#4a35f0"
        fillOpacity="0.85"
      />
      <circle
        className="v-circle-b"
        cx="195"
        cy="60"
        r="46"
        fill="#8f7dff"
        fillOpacity="0.85"
        style={{ mixBlendMode: 'multiply' }}
      />
    </svg>
  ),

  flow: (
    <svg viewBox="0 0 300 120" aria-hidden="true">
      <path
        className="v-dash"
        d="M40 60 H130 M170 60 H260"
        stroke="#fff"
        strokeOpacity="0.75"
        strokeWidth="2"
        fill="none"
      />

      <circle className="v-node" cx="40" cy="60" r="16" fill="#fff" />
      <circle
        className="v-node"
        cx="150"
        cy="60"
        r="20"
        fill="#fff"
        fillOpacity="0.95"
      />
      <circle className="v-node" cx="260" cy="60" r="16" fill="#fff" />
    </svg>
  ),

  speed: (
    <svg viewBox="0 0 300 120" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          className="v-bar"
          x={20 + i * 56}
          y={10 + (i % 2) * 18}
          width="34"
          height={100 - (i % 2) * 18}
          rx="10"
          fill="url(#bg)"
        />
      ))}

      <defs>
        <linearGradient id="bg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#8f7dff" />
          <stop offset="1" stopColor="#8f7dff" />
        </linearGradient>
      </defs>
    </svg>
  ),

  human: (
    <svg viewBox="0 0 300 120" aria-hidden="true">
      <g className="v-bubble">
        <rect
          x="20"
          y="14"
          width="150"
          height="40"
          rx="20"
          fill="#4a35f0"
        />
        <circle cx="48" cy="34" r="4" fill="#fff" />
        <circle cx="64" cy="34" r="4" fill="#fff" fillOpacity=".7" />
        <circle cx="80" cy="34" r="4" fill="#fff" fillOpacity=".4" />
      </g>

      <g className="v-bubble">
        <rect
          x="120"
          y="66"
          width="160"
          height="40"
          rx="20"
          fill="#fff"
          stroke="#0a0b12"
          strokeOpacity=".15"
        />
        <rect
          x="140"
          y="82"
          width="90"
          height="8"
          rx="4"
          fill="#0a0b12"
          fillOpacity=".25"
        />
      </g>
    </svg>
  ),
};

const cards = [
  {
    tone: 'tone-soft',
    v: 'venn',
    t: 'Design and code, one team',
    d: 'No hand-offs between agencies. The person who designs a screen also cares how it is built.',
  },
  {
    tone: 'tone-accent',
    v: 'flow',
    t: 'Automation that fits how you work',
    d: 'We connect the tools you already use and keep every step visible and easy to change.',
  },
  {
    tone: 'tone-ink',
    v: 'speed',
    t: 'Fast by default',
    d: 'Next.js, optimised images and lean code so pages feel instant on a mid-range phone.',
  },
  {
    tone: '',
    v: 'human',
    t: 'AI with a human in charge',
    d: 'Agents handle the repetitive part and hand over to a real person whenever it matters.',
  },
];

export default function WhyUs() {
  return (
    <section
      className="section why-us-section"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Background image — unchanged */}
      <div
        className="why-bg"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        <div
          className="why-bg-image"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('images/about/pexels-karola-g-7877217.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        />

        {/* Original gradient — unchanged */}
        <div
          className="why-bg-gradient"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.82) 100%)',
          }}
        />
      </div>

      <div
        className="container why-content"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <div className="why-head">
          <p className="kicker" style={{ fontSize: '0.8rem' }}>
            Why Reflexo
          </p>

          <div style={{ fontSize: '0.8em' }}>
            <SplitHeading
              lines={['Small team.', 'Senior attention.']}
              italicLines={[1]}
              className="h2"
            />
          </div>
        </div>

        <div className="bento" style={{ gap: '1rem' }}>
          {cards.map((c, i) => (
            <motion.div
              key={c.t}
              initial={{
                opacity: 0,
                x: i % 2 === 0 ? -100 : 100,
                y: 20,
                rotateY: i % 2 === 0 ? -8 : 8,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
                rotateY: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.85,
                delay: (i % 2) * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Tilt>
                <div
                  className={`bento-card why-glass-card ${c.tone}`}
                  style={{
                    padding: '1.2rem',
                    minHeight: 'auto',
                  }}
                >
                  <div
                    className="bento-visual"
                    style={{
                      transform: 'scale(0.85)',
                      transformOrigin: 'left center',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {visuals[c.v]}
                  </div>

                  <div>
                    <h3
                      style={{
                        fontSize: '0.95rem',
                        lineHeight: '1.3',
                        marginBottom: '0.3rem',
                        color: '#ffffff',
                      }}
                    >
                      {c.t}
                    </h3>

                    <p
                      style={{
                        fontSize: '0.78rem',
                        lineHeight: '1.5',
                        color: 'rgba(255, 255, 255, 0.8)',
                      }}
                    >
                      {c.d}
                    </p>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}