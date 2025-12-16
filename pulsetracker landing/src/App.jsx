import Header from "./components/header";
import Hero from "./components/hero";
import Problems from "./components/problems";
import Features from "./components/features";
import Testimonials from "./components/testimonials";
import About from "./components/about";
import HowItWorks from "./components/howitworks";
import FAQ from "./components/faq";
import CTA from "./components/cta";
import Footer from "./components/footer";

export default function App() {

  return (
    <div className="min-h-screen bg-neutral-50">
   <Header />
    <Hero />
    <Problems />
    <Features />
    <Testimonials />
    <About />
    <HowItWorks />
    <FAQ />
    <CTA />
    <Footer />
    </div>
  )
}