import Header from "../../components/landing/header.jsx";
import Hero from "../../components/landing/hero.jsx";
import Problems from "../../components/landing/problems.jsx";
import Features from "../../components/landing/features.jsx";
import Testimonials from "../../components/landing/testimonials.jsx";
import About from "../../components/landing/about.jsx";
import HowItWorks from "../../components/landing/howitworks.jsx";
import FAQ from "../../components/landing/faq.jsx";
import CTA from "../../components/landing/cta.jsx";
import Footer from "../../components/landing/footer.jsx";

export default function Homepage() {
    return (
        <div className="min-h-screen bg-neutral-50 jakarta">
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