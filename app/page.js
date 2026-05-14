import SmoothScrollProvider from './components/SmoothScrollProvider'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HeroMobile from './components/home/HeroMobile'
import HeroScrollStory from './components/home/HeroScrollStory'
import TrustStrip from './components/home/TrustStrip'
import TrustAuthority from './components/home/TrustAuthority'
import Services from './components/home/Services'
import WhatToExpect from './components/home/WhatToExpect'
import Experience from './components/home/Experience'
import AIReceptionistPreview from './components/home/AIReceptionistPreview'
import Gallery from './components/home/Gallery'
import ReviewMarquee from './components/home/ReviewMarquee'
import BookingSection from './components/home/BookingSection'
import EmergencyCTA from './components/home/EmergencyCTA'
import FinalCTA from './components/home/FinalCTA'
import FloatingChatWidget from './components/chat/FloatingChatWidget'

export default function Home() {
  return (
    <SmoothScrollProvider>
      <Header />
      <main>
        {/* Mobile-only hero — static, no GSAP. md:hidden via component itself. */}
        <HeroMobile />
        {/* Desktop scrub hero — hidden below md. */}
        <div className="hidden md:block">
          <HeroScrollStory />
        </div>
        <Services />
        <WhatToExpect />
        <Gallery />
        <TrustStrip />
        <TrustAuthority />
        <Experience />
        <AIReceptionistPreview />
        <ReviewMarquee />
        <BookingSection />
        <EmergencyCTA />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingChatWidget />
    </SmoothScrollProvider>
  )
}
