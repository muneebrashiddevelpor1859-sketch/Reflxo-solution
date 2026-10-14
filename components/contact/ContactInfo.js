import { site } from '@/data/site';
import Reveal from '../ui/Reveal';

export default function ContactInfo() {
  return (
    <aside className="contact-info">
      <Reveal>
        <h3>Email</h3>
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </Reveal>
      <Reveal delay={0.08}>
        <h3>Phone</h3>
        <p>{site.phone}</p>
      </Reveal>
      <Reveal delay={0.16}>
        <h3>Studio</h3>
        <p>{site.location}</p>
        <p className="muted">{site.hours}</p>
      </Reveal>
      <Reveal delay={0.24}>
        <h3>Follow</h3>
        <ul className="inline-links">
          {site.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </aside>
  );
}
