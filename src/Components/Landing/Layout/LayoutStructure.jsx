import NavBar from "./NavBar.jsx";
import Hero from "./Hero.jsx";
import About from "./About.jsx";
import {
    Coaches,
    Contact,
    Footer,
    Gallery,
    InstagramPosts,
    InstagramReels,
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
            <InstagramPosts />
            <InstagramReels />
            <Contact />
            <Footer />

        </div>
    );
}

export default LayoutStructure;