'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { nav, site } from '@/data/site';
import { services } from '@/data/services';
import Button from '../ui/Button';
import SplitHeading from '../ui/SplitHeading';

export default function Footer() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const y = useTransform(scrollYProgress, [0, 1], ['30%', '0%']);
  const op = useTransform(scrollYProgress, [0, 0.7], [0.2, 1]);

  return (
    <footer className="footer" ref={ref}>
      <div className="footer-cta-band">
        <div className="container footer-cta">
          <SplitHeading lines={['What are you', 'trying to make?']} className="display" italicLines={[1]} />
          <div className="footer-cta-side">
            <p className="lead">Tell us what is getting in the way. We can work out a sensible next step together.</p>
            <Button href="/contact">Tell us about it</Button>
          </div>
        </div>
      </div>

      <div className="container footer-grid">
        <div>
          <h4>Studio</h4>
          <ul>
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>{site.phone}</li>
            <li>{site.location}</li>
            <li>{site.hours}</li>
          </ul>
        </div>
        <div>
          <h4>Follow</h4>
          <ul>
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <motion.div className="footer-word" style={{ y, opacity: op }} aria-hidden="true">
        Reflexo
      </motion.div>

      <div className="container footer-bottom">
        <span>
          &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
        </span>
        <span>Brand / Web / Software / AI</span>
      </div>
    </footer>
  );
}
