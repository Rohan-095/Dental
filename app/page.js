import SmoothScrollProvider from './components/SmoothScrollProvider'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HeroScrollStory from './components/home/HeroScrollStory'
import TrustStrip from './components/home/TrustStrip'
import Services from './components/home/Services'
import Experience from './components/home/Experience'
import AIReceptionistPreview from './components/home/AIReceptionistPreview'
import Gallery from './components/home/Gallery'
import Reviews from './components/home/Reviews'
import BookingSection from './components/home/BookingSection'
import EmergencyCTA from './components/home/EmergencyCTA'
import FinalCTA from './components/home/FinalCTA'
import FloatingChatWidget from './components/chat/FloatingChatWidget'

export default function Home() {
  return (
    <SmoothScrollProvider>
      <Header />
      <main>
        <HeroScrollStory />
        <Services />
        <Gallery />
        <TrustStrip />
        <Experience />
        <AIReceptionistPreview />
        <Reviews />
        <BookingSection />
        <EmergencyCTA />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingChatWidget />
    </SmoothScrollProvider>
  )
}
