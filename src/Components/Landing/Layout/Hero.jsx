import { FiArrowUpRight } from "react-icons/fi";
import video from "../../../assets/vid.mp4";

function Hero() {
    return (
        <section aria-label="Welcome to RHEMA Fitness Centre" className="hero" id="home">
            {/* <img
                alt="Training at RHEMA Fitness Centre"
                className="hero-image"
                fetchPriority="high"
                src={heroImage}
            /> */}
            <div className="hero-image">
                <video src={video} loop muted autoPlay />
            </div>
            <div aria-hidden="true" className="hero-shade" />
            <div className="hero-content">
                <p className="eyebrow">A different kind of strong</p>
                <h1>
                    BUILT TO<br />
                    MOVE.<br />
                    MADE TO <span>LAST.</span>
                </h1>
                <div className="hero-bottom">
                    <p className="hero-description">
                        Good people. Great coaching. Training that meets you where you are,
                        and takes you somewhere new.
                    </p>
                    <a className="button-acid" href="#contact">
                        FIND YOUR PLACE <FiArrowUpRight aria-hidden="true" />
                    </a>
                </div>
                <div aria-hidden="true" className="hero-stamp">
                    <span>SHOW UP</span>
                    <strong>YOUR PACE</strong>
                    <span>START HERE</span>
                </div>
            </div>
        </section>
    );
}

export default Hero;
