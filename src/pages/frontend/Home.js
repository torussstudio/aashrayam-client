import Hero from '../../components/frontend/Hero';
import Strip from '../../components/frontend/Strip';
import WhyChooseUs from '../../components/frontend/WhyChooseUs';
import NewsSection from '../../components/frontend/NewsSection';
import AdmissionBanner from '../../components/frontend/AdmissionBanner';
import ProgramsSection from '../../components/frontend/ProgramsSection';
import EventsSection from '../../components/frontend/EventsSection';
import GallerySection from '../../components/frontend/GallerySection';
import TestimonialsSection from '../../components/frontend/TestimonialsSection';
import GetInTouch from '../../components/frontend/GetInTouch';
import CampusVideo from '../../components/frontend/CampusVideo';

const Home = () => (
  <main>
    <Hero />
    <Strip />
    <WhyChooseUs />
    <ProgramsSection />
    <CampusVideo />
    <EventsSection />
    <GallerySection />
    <NewsSection />
    <AdmissionBanner />
    <TestimonialsSection />
    <GetInTouch />
  </main>
);

export default Home;