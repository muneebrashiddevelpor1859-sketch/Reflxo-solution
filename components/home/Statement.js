'use client';

import { useState } from 'react';
import ScrollText from '../ui/ScrollText';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';

const collageItems = [
  {
    normal: 'images/about/main.jfif',
    hover: 'images/about/main2.jfif',
    alt: 'Our studio workspace',
  },
  {
    normal: 'images/about/main3jfif.jfif',
    hover: 'images/about/main.4jfif.jfif',
    alt: 'Website design preview',
  },
  {
    normal: 'images/about/pexels-karola-g-7876793.jpg',
    hover: 'images/about/pexels-karola-g-7877217.jpg',
    alt: 'Strategy and pitch decks',
  },
];

function HoverImage({ item }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="collage-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={isHovered ? item.hover : item.normal}
        alt={item.alt}
        className={`collage-image ${
          isHovered ? 'is-hovered' : ''
        }`}
        loading="lazy"
      />
    </div>
  );
}

export default function Statement() {
  return (
    <section className="section statement">
      <div className="statement-background" aria-hidden="true">
        <video
          className="statement-background-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/videos/ed.mp4" type="video/mp4" />
        </video>
        <div className="statement-background-overlay" />
      </div>
      <div className="container">
        <div className="statement-copy">
          <p className="kicker">01 / A little about our approach</p>
          <ScrollText
            className="statement-text"
            text="Good digital work starts with the problem, not the platform."
          />
          <p className="statement-support">
            First we get clear on what needs to change. Then we build what helps.
          </p>
          <Reveal>
            <Button href="/about" variant="line">
              Meet the studio <span aria-hidden="true">↗</span>
            </Button>
          </Reveal>
        </div>

        <Reveal className="statement-visual" y={36}>
          <div className="collage">
            {collageItems.map((item) => (
              <HoverImage key={item.normal} item={item} />
            ))}
          </div>
          <div className="statement-visual-caption">
            <span><i aria-hidden="true" /> Independent digital studio</span>
            <span>Strategy / Design / Technology</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}