'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '../ui/Button';

export default function ServiceBlock({ service, index }) {
  return (
    <motion.article
      id={service.slug}
      className={`service-tile service-tile-${index + 1}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.65, delay: (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="service-tile-top">
        <span>{String(index + 1).padStart(2, '0')}</span>
        <span>{service.group}</span>
      </div>
      <div className="service-tile-content">
        <div>
          <h2>{service.title}</h2>
          <p>{service.short}</p>
        </div>
        {service.image && (
          <div className="service-tile-art" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={service.image} alt="" loading="lazy" />
          </div>
        )}
      </div>
      <div className="service-tile-bottom">
        <ul aria-label={`${service.title} capabilities`}>
          {service.features.slice(0, 3).map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <div className="service-tile-actions">
          <Link href={`/services/${service.slug}`} className="service-tile-detail">
            View details <span aria-hidden="true">↗</span>
          </Link>
          <Button href={`/contact?service=${encodeURIComponent(service.title)}`} variant="line" aria-label={`Discuss ${service.title}`}>
            <span className="service-tile-cta">Let&apos;s talk</span>
            <span className="service-tile-arrow" aria-hidden="true">↗</span>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
