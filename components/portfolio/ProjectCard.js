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
