import { FiArrowUpRight } from "react-icons/fi";
import aboutImage from "../../../assets/about.png";

function About() {
    return (
        <section aria-labelledby="about-title" className="about-section" id="about">
            <div className="about-visual">
                <img
                    alt="Members of the RHEMA community together in Hawassa"
                    className="about-image"
                    loading="lazy"
                    src={aboutImage}
                />
                <div className="about-note">
                    <strong>01</strong>
                    <span>NO EGOS. JUST ENERGY.</span>
                </div>
            </div>
            <div className="about-copy">
                <p className="eyebrow">More than a room full of weights</p>
                <h2 className="section-heading" id="about-title">
                    OUR STORY.<br />OUR <span>PEOPLE.</span>
                </h2>
                <p className="body-copy">
                    RHEMA is a place to get stronger side by side. From your first session
                    to your next personal best, our coaches and community bring the energy,
                    encouragement, and room to grow.
                </p>
                <a className="text-link" href="#services">
                    MEET YOUR NEXT WORKOUT <FiArrowUpRight aria-hidden="true" />
                </a>
            </div>
        </section>
    );
}

export default About;
