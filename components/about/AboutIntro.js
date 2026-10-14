import ScrollText from '../ui/ScrollText';
import Reveal from '../ui/Reveal';
import SplitHeading from '../ui/SplitHeading';
import Button from '../ui/Button';
import { process as steps } from '@/data/site';

export default function AboutIntro() {
  return (
    <>
      <section className="page-hero about-hero">
        <div className="page-hero-glow" aria-hidden="true" />
        <div className="about-hero-orbit" aria-hidden="true">
          <svg viewBox="0 0 480 480" fill="none">
            <circle cx="240" cy="240" r="176" />
            <circle cx="240" cy="240" r="132" />
            <ellipse cx="240" cy="240" rx="205" ry="88" transform="rotate(-32 240 240)" />
            <path d="M240 42v42M240 396v42M42 240h42M396 240h42" />
            <circle className="about-hero-orbit-dot" cx="383" cy="149" r="6" />
          </svg>
        </div>
        <div className="container about-hero-layout">
          <div className="about-hero-main">
            <Reveal y={16}>
              <p className="kicker">A little about us / Reflexo Solutions</p>
            </Reveal>
            <SplitHeading
              as="h1"
              lines={['We ask first.', 'Then we make.']}
              italicLines={[1]}
              immediate
              delay={0.15}
              className="display about-hero-title"
            />
          </div>
          <aside className="about-hero-aside">
            <Reveal delay={0.3} y={20}>
              <span className="about-hero-aside-label">A SMALL, HANDS-ON DIGITAL STUDIO</span>
              <p>We help businesses make their websites, brands and everyday tools work better for real people.</p>
              <Button href="/contact" magnetic={false}>Talk to the studio</Button>
              <span className="about-hero-coordinate">INDEPENDENT <i /> WORKING WORLDWIDE</span>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="container about-story">
        <div className="about-story-note">
          <span className="about-story-index">01 / THE WAY WE WORK</span>
          <p>Direct conversations. Thoughtful decisions. No extra layers.</p>
        </div>
        <div className="about-media">
          <figure className="about-media-main image-hover">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/about-2/pexels-felicity-tai-7964413.jpg"
              alt="People reviewing notes around a work table"
            />
            <figcaption className="about-image-caption">A clear brief gives everyone the same place to start.</figcaption>
          </figure>
        </div>

        <div className="about-story-copy">
          <span className="about-story-index">02 / WHAT WE BELIEVE</span>
          <ScrollText
            className="statement-text"
            text="Good digital work should make the next step easier—for your customers and for the people doing the work."
          />
        </div>
      </section>

      <section className="about-process" aria-labelledby="about-process-title">
        <div className="container about-process-layout">
          <div className="about-process-heading">
            <p className="kicker">HOW A PROJECT MOVES</p>
            <h2 id="about-process-title">You see the work as it takes shape.</h2>
            <p>Clear decisions, visible progress, and a next step you can always point to.</p>
          </div>
          <ol className="about-process-list">
            {steps.map((step, index) => (
              <Reveal as="li" key={step.title} className="about-process-step" delay={index * 0.06} y={14}>
                <span className="about-process-number">{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}