import BlogList from '@/components/blog/BlogList';
import Reveal from '@/components/ui/Reveal';
import SplitHeading from '@/components/ui/SplitHeading';

export const metadata = {
  title: 'Blog',
  description: 'Practical writing on web development, branding, AI automation and AI agents from Reflexo Solutions.',
};

export default function BlogPage() {
  return (
    <>
      <section className="page-hero journal-hero">
        <div className="page-hero-glow" aria-hidden="true" />
        <div className="container journal-cover">
          <div className="journal-cover-top">
            <Reveal y={16}><p className="kicker">Journal / Field notes</p></Reveal>
            <span>STRATEGY <i /> DESIGN <i /> TECHNOLOGY</span>
          </div>
          <div className="journal-cover-main">
            <SplitHeading
              as="h1"
              lines={['Ideas for your', 'next good move.']}
              italicLines={[1]}
              immediate
              delay={0.15}
              className="display journal-cover-title"
            />
            <Reveal className="journal-cover-note" delay={0.3} y={20}>
              <span className="journal-cover-index">FIELD NOTES / 001—004</span>
              <p>Clear thinking on digital strategy, design and technology—and the small details that make a difference.</p>
              <span className="journal-cover-mark" aria-hidden="true">R<span>.</span></span>
            </Reveal>
          </div>
        </div>
      </section>
      <BlogList />
    </>
  );
}
