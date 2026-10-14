'use client';
import Link from 'next/link';
import Magnetic from './Magnetic';

// variant: 'solid' | 'line'
export default function Button({ href, children, variant = 'solid', onClick, type, disabled, magnetic = true }) {
  const inner = href ? (
    <Link href={href} className={`btn btn-${variant}`} onClick={onClick}>
      <span className="btn-fill" />
      <span className="btn-label">{children}</span>
      <svg className="btn-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  ) : (
    <button type={type || 'button'} className={`btn btn-${variant}`} onClick={onClick} disabled={disabled}>
      <span className="btn-fill" />
      <span className="btn-label">{children}</span>
      <svg className="btn-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
  return magnetic ? <Magnetic strength={0.25}>{inner}</Magnetic> : inner;
}
