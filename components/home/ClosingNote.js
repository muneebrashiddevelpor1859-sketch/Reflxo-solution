import Reveal from '../ui/Reveal';
import Button from '../ui/Button';

// Closing call to action for the home page
export default function ClosingNote() {
  return (
    <section className="section closing home-closing">
      <div className="container closing-inner">
        <Reveal className="closing-copy">
          <p className="kicker">A good place to start / A real conversation</p>
          <h2 className="h2">Let&apos;s make the next step clearer.</h2>
        </Reveal>
        <Reveal className="closing-action" delay={0.15}>
          <p>Tell us what you&apos;re working through. We&apos;ll listen, ask a few useful questions and take it from there.</p>
          <Button href="/contact" magnetic={false}>Start a conversation</Button>
          <span className="closing-note-meta"><i aria-hidden="true" /> No pitch deck. Just people talking.</span>
        </Reveal>
      </div>
    </section>
  );
}