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

function LayoutStructure() {
    return (
        <div>
            <Hero />
            <Ticker />
            <About />
            <Coaches />
            <Services />
            <Gallery />
            <Community />
            <Contact />
            <Footer />
        </div>
    );
}

export default LayoutStructure;