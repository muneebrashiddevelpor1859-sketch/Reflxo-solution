// 'use client';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { services } from '@/data/services';
// import SplitHeading from '../ui/SplitHeading';

// export default function ServicesList() {
//   return (
//     <section className="section services-home bg-white">
//       <div className="container">
//         <div className="section-head">
//           <SplitHeading lines={['What we do']} className="h2" />
//           <p className="muted section-head-note">{services.length} services that work together, from one team.</p>
//         </div>

//         <ul className="svc-list">
//           {services.map((s, i) => (
//             <motion.li
//               key={s.slug}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: '0px 0px -8% 0px' }}
//               transition={{ duration: 0.8, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
//             >
//               <Link href={`/services/${s.slug}`} className="svc-row" data-cursor>
//                 <span className="svc-row-bg" />
//                 <h3 className="svc-row-title">{s.title}</h3>
//                 <p className="svc-row-text">{s.short}</p>
//                 <span className="svc-row-arrow" aria-hidden="true">
//                   <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
//                     <path d="M6 18L18 6M9 6h9v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                   </svg>
//                 </span>
//               </Link>
//             </motion.li>
//           ))}
//         </ul>
//       </div>
//     </section>
//   );
// }









'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { services } from '@/data/services';
import Button from '../ui/Button';

function ServiceRow({ service, index }) {
  return (
    <motion.li
      className="services3d-item"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/services/${service.slug}`} className="services3d-card" data-cursor>
        <div className="services3d-card-top">
          <span className="services3d-number">{String(index + 1).padStart(2, '0')}</span>
          <span className="services3d-type">{service.group}</span>
        </div>
        <div className="services3d-main">
          <h3>{service.title}</h3>
          <p>{service.short}</p>
        </div>
        <span className="services3d-arrow" aria-hidden="true">↗</span>
      </Link>
    </motion.li>
  );
}

export default function ServicesList() {
  return (
    <section className="services3d" aria-labelledby="home-services-title">
      <div className="container">
        <motion.div
          className="services3d-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="services3d-kicker">
            <span />
            CAPABILITIES / REFLEXO SOLUTIONS
          </div>

          <div className="services3d-heading">
            <h2 id="home-services-title" className="h2 services3d-title">What we do<span>.</span></h2>
            <div className="services3d-intro">
              <p>Brand, web and automation, brought together around the problem your business needs to solve.</p>
              <Button href="/services" variant="line" magnetic={false}>Explore all services</Button>
            </div>
          </div>
        </motion.div>

        <ul className="services3d-list">
          {services.map((service, index) => (
            <ServiceRow key={service.slug} service={service} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}