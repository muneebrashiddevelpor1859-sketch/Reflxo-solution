'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Cover from '../ui/Cover';

export default function ProjectCard({ project, tall = false }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/portfolio/${project.slug}`} className={`pcard ${tall ? 'is-tall' : ''}`} data-cursor-label="View">
        <div className="pcard-media">
          <Cover title={project.title} hue={project.hue} image={project.image} />
          <span className="pcard-year">{project.year}</span>
          <span className="pcard-open" aria-hidden="true">
            <svg viewBox="0 0 20 20" fill="none">
              <path d="M4.5 15.5 15 5M6 5h9v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        <div className="pcard-meta">
          <h3>{project.title}</h3>
          <span>{project.category}</span>
        </div>
        <p className="pcard-sum">{project.summary}</p>
      </Link>
    </motion.div>
  );
}
