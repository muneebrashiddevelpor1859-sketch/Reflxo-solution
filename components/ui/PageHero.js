import SplitHeading from './SplitHeading';
import Reveal from './Reveal';

// Default hero video (file lives in /public/videos). Pass video="/videos/other.mp4" to override per page.
const DEFAULT_VIDEO = '/videos/blog.mp4';

// Header block reused by inner pages
export default function PageHero({
  lines,
  text,
  kicker,
  italicLines = [],
  video = false,
  className = '',
}) {
  const src = typeof video === 'string' ? video : DEFAULT_VIDEO;

  return (
    <section className={`page-hero${video ? ' has-video' : ''} ${className}`.trim()}>
      <div className="page-hero-glow" aria-hidden="true" />
      {video && (
        <>
          {/* Full screen background video */}
          <div className="page-hero-video" aria-hidden="true">
            <video autoPlay muted loop playsInline preload="auto">
              <source src={src} type="video/mp4" />
            </video>
          </div>
          {/* Transparent black gradient */}
          <div className="page-hero-fade" aria-hidden="true" />
        </>
      )}

      <div className="container page-hero-content">
        {kicker && (
          <Reveal y={16}>
            <p className="kicker">{kicker}</p>
          </Reveal>
        )}
        <SplitHeading as="h1" lines={lines} immediate delay={0.15} italicLines={italicLines} className="display" />
        {text && (
          <Reveal delay={0.5} y={24}>
            <p className="lead">{text}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
