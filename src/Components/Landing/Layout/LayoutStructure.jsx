import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Helmet } from "react-helmet-async";
import Hero from "./Hero.jsx";
import About from "./About.jsx";
import {
    Coaches,
    Community,
    Contact,
    Footer,
    Gallery,
    Services,
    Ticker,
} from "./LandingSections.jsx";
import Pricing from "./Pricing.jsx";

gsap.registerPlugin(ScrollTrigger);

function LayoutStructure() {
    const landingRef = useRef(null);

    useEffect(() => {
        const motion = gsap.matchMedia();
        motion.add("(prefers-reduced-motion: no-preference)", () => {
            const root = landingRef.current;
            if (!root) return undefined;

            gsap.fromTo(
                gsap.utils.toArray(".hero-content > *", root),
                { autoAlpha: 0, y: 30 },
                { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" },
            );

            gsap.utils.toArray(
                ".about-copy, .about-visual, .section-heading, .services-intro, .coaches-intro, .service-card, .coach-community, .gallery-item, .pricing-card, .faq-item, .community-card, .contact-inner, .map-panel",
                root,
            ).forEach((element) => {
                gsap.fromTo(
                    element,
                    { autoAlpha: 0, y: 34 },
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.75,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: element,
                            start: "top 88%",
                            once: true,
                        },
                    },
                );
            });

            gsap.utils.toArray(
                ".about-image, .service-image img, .gallery-item img, .gallery-item video, .coach-community-photo img, .community-image",
                root,
            ).forEach((image) => {
                gsap.fromTo(
                    image,
                    { scale: 1.08 },
                    {
                        scale: 1,
                        duration: 1.1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: image,
                            start: "top 92%",
                            once: true,
                        },
                    },
                );
            });
        });

        return () => motion.revert();
    }, []);

    return (
        <div ref={landingRef}>
            <Helmet>
                <title>RHEMA Fitness Centre | Gym &amp; Martial Arts in Hawassa</title>
                <meta
                    name="description"
                    content="Train your way at RHEMA Fitness Centre in Hawassa, Ethiopia. Explore gym training, kickboxing, jiu-jitsu, martial arts, and a welcoming fitness community."
                />
                <meta
                    property="og:title"
                    content="RHEMA Fitness Centre | Gym &amp; Martial Arts in Hawassa"
                />
                <meta
                    property="og:description"
                    content="Gym training, kickboxing, jiu-jitsu, and martial arts in a welcoming fitness community in Hawassa, Ethiopia."
                />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary" />
            </Helmet>
            <Hero />
            <Ticker />
            <About />
            <Coaches />
            <Services />
            <Gallery />
            <Pricing />
            <Community />
            <Contact />
            <Footer />
        </div>
    );
}

export default LayoutStructure;