'use client';
import { motion } from 'framer-motion';
import SplitHeading from '../ui/SplitHeading';
import Button from '../ui/Button';

const steps = [
  { title: 'Get found', tags: ['SEO + AI Search', 'Paid Ads', 'Short-Form Video'] },
  { title: 'Build trust', tags: ['Brand', 'Website', 'Content'] },
  { title: 'Capture intent', tags: ['Landing pages', 'Chat', 'Calls', 'Forms'] },
  { title: 'Follow up', tags: ['CRM', 'Automation', 'AI agents'] },
];

export default function Ecosystem() {
  return (
    <section className="section ecosystem">
      <div className="container">
        <p className="kicker">The Reflexo system</p>
        <div className="section-head">
          <SplitHeading lines={['Your website, marketing and', 'follow-up should work as one.']} italicLines={[1]} className="h2" />
          <p className="muted section-head-note">
            A beautiful site cannot fix leads nobody replies to. Great ads cannot fix a weak landing page. Growth happens when every piece supports the next.
          </p>
        </div>
        <ol className="eco-steps">
          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              className="eco-step"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="eco-no">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <ul className="chips">
                {s.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
        <div className="eco-cta">
          <Button href="/services">Explore all services</Button>
        </div>
      </div>
    </section>
  );
}
