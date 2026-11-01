import { FiActivity, FiArrowUpRight, FiClock, FiHeart, FiInstagram, FiMapPin, FiTarget, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import aboutImage from "../../../assets/about.png";
import coachImage from "../../../assets/choach2.png";
import logoImage from "../../../assets/rhema-logo.svg";
import boxingMindsetVideo from "../../../assets/rhema-boxing-mindset.mp4";
import gymDayVideo from "../../../assets/rhema-gym-day.mp4";

const training = [
    {
        icon: FiActivity,
        number: "01",
        name: "Gym",
        description: "Train your way with quality equipment, space to move, and room to get stronger.",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=85",
        imageAlt: "Modern gym floor with strength training equipment",
    },
    {
        icon: FiUsers,
        number: "02",
        name: "Kickboxing",
        description: "Build power, confidence, and stamina with energetic coached sessions.",
        image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1000&q=85",
        imageAlt: "Athletes practicing a striking martial art",
    },
    {
        icon: FiTarget,
        number: "03",
        name: "Jiu-jitsu",
        description: "Learn practical grappling skills, technique, and control in a supportive class.",
        image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1000&q=85",
        imageAlt: "Martial artists training together on the mat",
    },
    {
        icon: FiHeart,
        number: "04",
        name: "Martial arts",
        description: "Improve coordination and discipline while learning skills at your own pace.",
        image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1000&q=85",
        imageAlt: "Athlete training in a martial arts class",
    },
];

const galleryMedia = [
    {
        type: "video",
        src: boxingMindsetVideo,
        label: "The Door Is Never Locked",
    },
    {
        type: "video",
        src: gymDayVideo,
        label: "What A Day!",
    },
    {
        type: "image",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1400&q=88",
        alt: "Athlete training with weights in a gym",
        label: "Strength in every rep",
    },
];

const instagramProfile = "https://www.instagram.com/rhema_gym/";

function Ticker() {
    const phrases = ["GOOD PEOPLE", "STRONGER EVERY DAY", "EVERY BODY BELONGS", "SHOW UP AS YOU ARE"];

    return (
        <div aria-hidden="true" className="ticker">
            <div className="ticker-track">
                {[...phrases, ...phrases].map((phrase, index) => (
                    <span key={`${phrase}-${index}`}>{phrase} /</span>
                ))}
            </div>
        </div>
    );
}

function Services() {
    return (
        <section aria-labelledby="services-title" className="services-section section-dark" id="services">
            <div className="section-inner">
                <div className="services-top">
                    <div>
                        <p className="eyebrow">Your goals, your pace, our people</p>
                        <h2 className="section-heading" id="services-title">
                            TRAIN YOUR <span>WAY.</span>
                        </h2>
                    </div>
                    <p className="services-intro">
                        Good programming meets you where you are. There&apos;s room for everyone here.
                    </p>
                </div>

                <div className="service-grid">
                    {training.map(({ icon: Icon, number, name, description, image, imageAlt }) => (
                        <article className="service-card" key={number}>
                            <div className="service-image">
                                <img alt={imageAlt} loading="lazy" src={image} />
                                <span aria-hidden="true" className="service-icon"><Icon /></span>
                                <span className="service-number">RHEMA / {number}</span>
                            </div>
                            <div className="service-copy">
                                <h3>{name}</h3>
                                <p>{description}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Coaches() {
    return (
        <section aria-labelledby="coaches-title" className="coaches-section section-dark" id="coaches">
            <div className="section-inner">
                <div className="coaches-heading">
                    <div>
                        <p className="eyebrow">Good coaching changes everything</p>
                        <h2 className="section-heading" id="coaches-title">
                            YOU&apos;RE IN <span>GOOD HANDS.</span>
                        </h2>
                    </div>
                    <p className="coaches-intro">
                        Real people in your corner, here to help you build confidence and keep showing up.
                    </p>
                </div>

                <article className="coach-community">
                    <div className="coach-community-photo">
                        <img
                            alt="A RHEMA coach training with members"
                            loading="lazy"
                            src={coachImage}
                        />
                        <span className="coach-photo-label">RHEMA / HAWASSA</span>
                    </div>
                    <div className="coach-community-copy">
                        <span className="coach-index">01 / OUR COMMUNITY</span>
                        <h3>BETTER,<br />TOGETHER.</h3>
                        <p>
                            Every strong session starts with people who make you feel welcome.
                            Come meet the team and find a pace that feels right for you.
                        </p>
                        <a className="text-link" href="#contact">
                            COME MEET THE TEAM <FiArrowUpRight aria-hidden="true" />
                        </a>
                    </div>
                </article>
            </div>
        </section>
    );
}

function Gallery() {
    return (
        <section aria-labelledby="gallery-title" className="gallery-section section-light" id="gallery">
            <div className="section-inner">
                <div className="gallery-top">
                    <div>
                        <p className="eyebrow">Good energy lives here</p>
                        <h2 className="section-heading" id="gallery-title">
                            A LOOK <span>INSIDE.</span>
                        </h2>
                    </div>
                    <a className="text-link" href="#contact">
                        COME SEE FOR YOURSELF <FiArrowUpRight aria-hidden="true" />
                    </a>
                </div>

                <div className="gallery-grid">
                    {galleryMedia.map(({ type, src, image, alt, label }, index) => (
                        <figure className="gallery-item" key={label}>
                            {type === "video" ? (
                                <video
                                    aria-hidden="true"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    preload="metadata"
                                    src={src}
                                />
                            ) : (
                                <img alt={alt} loading="lazy" src={image} />
                            )}
                            <figcaption className="gallery-label">
                                <span className="gallery-caption-copy">
                                    <span className="gallery-photo-number">RHEMA / 0{index + 1}</span>
                                    <span className="gallery-photo-title">{label}</span>
                                </span>
                                <FiArrowUpRight aria-hidden="true" />
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Community() {
    return (
        <section aria-labelledby="community-title" className="community-section">
            <div className="community-card">
                <img
                    alt="Members sharing a moment together"
                    className="community-image"
                    loading="lazy"
                    src={aboutImage}
                />
                <div className="community-copy">
                    <p className="eyebrow">Life at RHEMA, lately</p>
                    <h2 className="section-heading" id="community-title">
                        YOUR PEOPLE<br />ARE <span>HERE.</span>
                    </h2>
                    <p>
                        Follow along for a closer look at the people, energy, and training
                        that make our community special.
                    </p>
                    <a
                        className="instagram-profile"
                        href={instagramProfile}
                        rel="noreferrer"
                        target="_blank"
                    >
                        <FiInstagram aria-hidden="true" />
                        FOLLOW @RHEMA_GYM
                        <FiArrowUpRight aria-hidden="true" />
                    </a>
                </div>
            </div>
        </section>
    );
}

function Contact() {
    const contactDetails = [
        { icon: FiMapPin, title: "FIND THE CLUB", detail: "RHEMA Fitness Centre", extra: "Hawassa, Ethiopia" },
        { icon: FiClock, title: "PLAN YOUR VISIT", detail: "Come by and meet the team", extra: "Ask us about today's sessions" },
    ];

    return (
        <section aria-labelledby="contact-title" className="contact-section" id="contact">
            <div className="contact-inner">
                <div>
                    <p className="eyebrow">Your first workout starts right here</p>
                    <h2 className="contact-heading" id="contact-title">
                        COME AS<br />YOU ARE.
                    </h2>
                    <p className="contact-blurb">
                        Curious about a class or want to take a look around? Visit us or
                        send us a message. We&apos;ll help you get started.
                    </p>
                    <a
                        className="button-dark"
                        href={instagramProfile}
                        rel="noreferrer"
                        target="_blank"
                    >
                        MESSAGE US ON INSTAGRAM <FiArrowUpRight aria-hidden="true" />
                    </a>
                </div>

                <address className="contact-details">
                    {contactDetails.map(({ icon: Icon, title, detail, extra }) => (
                        <div className="contact-detail" key={title}>
                            <span aria-hidden="true" className="contact-detail-icon"><Icon /></span>
                            <span>
                                <strong>{title}</strong>
                                {detail}
                                <span><br />{extra}</span>
                            </span>
                        </div>
                    ))}
                </address>
            </div>
            <div className="map-panel">
                <iframe
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://maps.google.com/maps?q=7.04002,38.4786563&z=15&output=embed"
                    title="Map showing RHEMA Fitness Centre in Hawassa, Ethiopia"
                />
                <a
                    className="map-directions"
                    href="https://maps.app.goo.gl/BGsjgKbsVCrxQ4FR8"
                    rel="noreferrer"
                    target="_blank"
                >
                    GET DIRECTIONS <FiArrowUpRight aria-hidden="true" />
                </a>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <div>
                    <a aria-label="RHEMA Fitness Centre home" className="wordmark" href="#home">
                        <img alt="RHEMA Fitness Centre" className="brand-logo" src={logoImage} />
                    </a>
                    <p className="footer-tagline">Built by good people. Made for everybody.</p>
                </div>

                <nav aria-label="Footer navigation" className="footer-nav">
                    <a href="#home">Home</a>
                    <a href="#about">Our story</a>
                    <a href="#services">Training</a>
                    <a href="#gallery">The club</a>
                    <a href="#contact">Come say hi</a>
                    <Link to="/login">Sign in</Link>
                    <Link to="/register">Join the club</Link>
                </nav>

                <div aria-label="Social media" className="footer-social">
                    <a
                        aria-label="RHEMA Gym on Instagram"
                        href={instagramProfile}
                        rel="noreferrer"
                        target="_blank"
                    >
                        <FiInstagram aria-hidden="true" />
                    </a>
                </div>
            </div>

            <div className="footer-bottom">
                <span>© {new Date().getFullYear()} RHEMA FITNESS CENTRE</span>
                <span>SHOW UP AS YOU ARE. LEAVE A LITTLE STRONGER.</span>
            </div>
        </footer>
    );
}

export { Coaches, Community, Contact, Footer, Gallery, Services, Ticker };
