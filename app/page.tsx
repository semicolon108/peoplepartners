// app/page.tsx
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import Trust from '@/components/home/Trust';
import Testimonials from '@/components/home/Testimonials';
import CTA from '@/components/shared/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Trust />
      <Testimonials />
      <CTA title="Ready to Partner with Laos' HR Experts?"
        description="Let's discuss how we can support your business growth in Laos with our comprehensive HR solutions."
        buttonText="Schedule Your Free Consultation"
        buttonLink="/contact#consultation" />
    </>
  );
}