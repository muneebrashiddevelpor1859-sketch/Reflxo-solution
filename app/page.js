import Hero from '@/components/home/Hero';
import Marquee from '@/components/home/Marquee';
import Statement from '@/components/home/Statement';
import ServicesList from '@/components/home/ServicesList';
import WorkScroll from '@/components/home/WorkScroll';
import ClosingNote from '@/components/home/ClosingNote';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Statement />
      <ClosingNote />
      <ServicesList />
      <WorkScroll />
    </>
  );
}
