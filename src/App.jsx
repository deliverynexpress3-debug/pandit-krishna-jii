import { useState } from "react"
import Nav from "./components/Nav"
import Preloader from "./components/Preloader"
import Hero from "./components/Hero"
import TrustStrip from "./components/TrustStrip"
import About from "./components/About"
import Services from "./components/Services"
import Process from "./components/Process"
import Mangalnath from "./components/Mangalnath"
import BookingTimeline from "./components/BookingTimeline"
import Gallery from "./components/Gallery"
import WhyUs from "./components/WhyUs"
import Faq from "./components/Faq"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import FloatingWhatsApp from "./components/FloatingWhatsApp"
import TempleDivider from "./components/TempleDivider"

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && <Preloader onDone={() => setLoading(false)} />}
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <About />
        <TempleDivider className="my-6" />
        <Services />
        <TempleDivider className="my-6" />
        <Mangalnath />
        <TempleDivider className="my-6" />
        <BookingTimeline />
        <TempleDivider className="my-6" />
        <Process />
        <Gallery />
        <TempleDivider className="my-6" />
        <WhyUs />
        <Faq />
        <TempleDivider className="my-6" />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
