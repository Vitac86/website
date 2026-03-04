import { ConsultationCTA } from '@/components/sections/ConsultationCTA';
import { Hero } from '@/components/sections/Hero';
import { ProductTypes } from '@/components/sections/ProductTypes';

export default function HomePage(): JSX.Element {
  return (
    <>
      <Hero />
      <ProductTypes />
      <ConsultationCTA />
    </>
  );
}
