import { process as steps } from '@/data/site';
import SplitHeading from '../ui/SplitHeading';

// Cards stack on top of each other while scrolling (CSS sticky)
export default function Process() {
  return (
    <section className="section process">
      <div className="container process-grid">
        <div className="process-intro">
          <p className="kicker">A clear way forward</p>
          <SplitHeading lines={['How a project', 'unfolds']} className="h2" />
          <p className="muted">One focused team, a shared plan, and no surprises between the first conversation and launch.</p>
        </div>
        <div className="process-stack">
          {steps.map((s, i) => (
            <article className="process-card" key={s.title} style={{ '--i': i }}>
              <span className="process-no">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
