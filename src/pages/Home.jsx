import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import FeaturedSection from "../components/home/FeaturedSection";
import OffersBanner from "../components/home/OffersBanner";
import WhyChooseUs from "../components/home/WhyChooseUs";
import StatisticsSection from "../components/home/StatisticsSection";
import CallToAction from "../components/home/CallToAction";

import { FEATURED_PRODUCTS } from "../data/products";

export default function Home() {
  return (
    <>
      <Hero />

      <Categories />

      <OffersBanner />

      <FeaturedSection
        products={FEATURED_PRODUCTS}
      />

      <WhyChooseUs />

      <StatisticsSection />

      <CallToAction />
    </>
  );
}