'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { nav, site } from '@/data/site';
import { services, groups } from '@/data/services';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [drop, setDrop] = useState(false);
  const [sub, setSub] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    setSolid(y > 40);
  });

  useEffect(() => {
    setOpen(false);
    setDrop(false);
  }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (window.__lenis) open ? window.__lenis.stop() : window.__lenis.start();
  }, [open]);

  const showSolid = solid && !open;

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <>
      <motion.header
        className={`header ${showSolid ? 'is-solid' : ''}`}
      >
        <div className="header-inner">
          <Link href="/" className="logo" aria-label={`${site.name} home`}>
            <span className="logo-mark">R</span>
            <span className="logo-text">
              Reflexo <small>Solutions</small>
            </span>
          </Link>

          <nav className="nav-desktop" aria-label="Main">
            {nav.slice(1, 5).map((n) =>
              n.href === '/services' ? (
                <div
                  key={n.href}
                  className="nav-item has-drop"
                  onMouseEnter={() => setDrop(true)}
                  onMouseLeave={() => setDrop(false)}
                  onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setDrop(false)}
                  onKeyDown={(e) => e.key === 'Escape' && setDrop(false)}
                >
                  <Link href={n.href} className={`nav-link ${isActive(n.href) ? 'is-active' : ''}`} aria-haspopup="true" aria-expanded={drop} onFocus={() => setDrop(true)}>
                    <span>{n.label}</span>
                    <svg className={`nav-caret ${drop ? 'is-up' : ''}`} width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M1.5 3.5L5 7l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <AnimatePresence>
                    {drop && (
                      <motion.div
                        className="drop-wrap"
                        initial={{ opacity: 0, y: 18, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.99 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="drop">
                          <div className="drop-cols">
                            {groups.map((g, groupIndex) => (
                              <motion.div
                                className="drop-col"
                                key={g}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.06 + groupIndex * 0.07, duration: 0.35 }}
                              >
                                <p className="drop-label"><span>0{groupIndex + 1}</span>{g}</p>
                                <ul className="drop-service-list">
                                  {services
                                    .filter((s) => s.group === g)
                                    .map((s, serviceIndex) => (
                                      <motion.li
                                        key={s.slug}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + serviceIndex * 0.045, duration: 0.28 }}
                                      >
                                        <Link href={`/services/${s.slug}`} className="drop-link" onClick={() => setDrop(false)}>
                                          <span className="drop-ico" aria-hidden="true">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={s.image} alt="" loading="lazy" />
                                          </span>
                                          <span className="drop-txt">
                                            <strong>{s.title}</strong>
                                            <small>{s.short}</small>
                                          </span>
                                          <span className="drop-link-arrow" aria-hidden="true">↗</span>
                                        </Link>
                                      </motion.li>
                                    ))}
                                </ul>
                              </motion.div>
                            ))}
                          </div>
                          <div className="drop-side">
                            <span className="drop-side-index">REFLEXO / SERVICES</span>
                            <p className="drop-side-title">Start with what needs to change.</p>
                            <p className="drop-side-copy">Tell us where the friction is. We will help find the right next step.</p>
                            <Link href="/contact" className="drop-cta" onClick={() => setDrop(false)}>
                              Find your starting point <span aria-hidden="true">↗</span>
                            </Link>
                            <Link href="/services" className="drop-all" onClick={() => setDrop(false)}>
                              Explore all services <span aria-hidden="true">→</span>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={n.href} href={n.href} className={`nav-link ${isActive(n.href) ? 'is-active' : ''}`}>
                  <span>{n.label}</span>
                </Link>
              )
            )}
          </nav>

          <div className="header-right">
            <Link href="/contact" className="header-cta">
              <span>Start a project</span>
            </Link>
            <button
              className={`burger ${open ? 'is-open' : ''}`}
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={{ clipPath: 'circle(0% at calc(100% - 48px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 48px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 48px) 40px)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="menu-nav" aria-label="Menu">
              {nav.map((n, i) => (
                <div className="menu-item-mask" key={n.href}>
                  <motion.div
                    initial={{ y: '110%' }}
                    animate={{ y: 0, transition: { delay: 0.3 + i * 0.07, duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
                    exit={{ y: '110%', transition: { duration: 0.3 } }}
                  >
                    <Link href={n.href} className={`menu-link ${isActive(n.href) ? 'is-active' : ''}`}>
                      {n.label}
                    </Link>
                    {n.href === '/services' && (
                      <button type="button" className="menu-sub-toggle" onClick={() => setSub((v) => !v)} aria-expanded={sub} aria-label="Show services">
                        {sub ? '\u2212' : '+'}
                      </button>
                    )}
                  </motion.div>
                  {n.href === '/services' && sub && (
                    <ul className="menu-sub">
                      {services.map((sv) => (
                        <li key={sv.slug}>
                          <Link href={`/services/${sv.slug}`} onClick={() => setOpen(false)}>{sv.title}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </nav>
            <div className="menu-foot">
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <span>{site.location}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
