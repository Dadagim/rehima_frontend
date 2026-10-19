import { createElement } from "react";
import {
    FiActivity,
    FiArrowUpRight,
    FiClock,
    FiFacebook,
    FiHeart,
    FiInstagram,
    FiMapPin,
    FiPhone,
    FiTarget,
    FiUsers,
    FiYoutube,
} from "react-icons/fi";

const element = createElement;

const training = [
    { icon: FiActivity, number: "01", name: "Strength", description: "Real coaching and thoughtful programming. Meet yourself where you are." },
    { icon: FiUsers, number: "02", name: "Group training", description: "Small, spirited classes that make showing up the best part of your day." },
    { icon: FiTarget, number: "03", name: "Personal coaching", description: "A plan that fits your goals, your schedule, and the way you move." },
    { icon: FiHeart, number: "04", name: "Recovery", description: "Make room to move well, rest up, and come back feeling better." },
];

const photos = [
    { image: "/src/assets/about.png", alt: "Focused training in a well-lit gym", label: "Put in the work" },
    { image: "/src/assets/about.png", alt: "Coach supporting an athlete at the gym", label: "Better, together" },
    { image: "/src/assets/about.png", alt: "Movement and flexibility training", label: "Move freely" },
    { image: "/src/assets/about.png", alt: "Weights ready for the next set", label: "Find your strength" },
    { image: "/src/assets/about.png", alt: "An athlete building strength during a workout", label: "Your next chapter" },
];

const instagramReels = [
    { shortcode: "DbFojB9Iyh_", url: "https://www.instagram.com/reel/DbFojB9Iyh_/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==" },
    { shortcode: "DaKaRxtIZTT", url: "https://www.instagram.com/reel/DaKaRxtIZTT/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==" },
    { shortcode: "DaAaZfnIHNt", url: "https://www.instagram.com/reel/DaAaZfnIHNt/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==" },
    { shortcode: "DZih8lnRSOp", url: "https://www.instagram.com/reel/DZih8lnRSOp/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==" },
];

const instagramPosts = [
    { shortcode: "DZXYVBgiJYl", url: "https://www.instagram.com/p/DZXYVBgiJYl/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==" },
    { shortcode: "DaZxLqriAET", url: "https://www.instagram.com/p/DaZxLqriAET/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==" },
];

const instagramProfile = "https://www.instagram.com/rhema_gym?stkn=cGN3bDZhanNycGFx";

function Ticker() {
    const phrases = ["GOOD PEOPLE", "STRONGER EVERY DAY", "EVERY BODY BELONGS", "SHOW UP AS YOU ARE"];
    const repeatedPhrases = [...phrases, ...phrases];
    return element("div", { "aria-hidden": true, className: "ticker" },
        element("div", { className: "ticker-track" }, repeatedPhrases.map((phrase, index) =>
            element("span", { key: index }, phrase, " / "))));
}

function Services() {
    return element("section", { "aria-labelledby": "services-title", className: "services-section section-dark", id: "services" },
        element("div", { className: "section-inner" },
            element("div", { className: "services-top" },
                element("div", null,
                    element("p", { className: "eyebrow" }, "Your goals, your pace, our people"),
                    element("h2", { className: "section-heading", id: "services-title" }, "TRAIN YOUR ", element("span", null, "WAY."))),
                element("p", { className: "services-intro" }, "Good programming meets you exactly where you are. There's room for everyone here.")),
            element("div", { className: "service-grid" }, training.map(({ icon: Icon, number, name, description }) =>
                element("article", { className: "service-card", key: number },
                    element("span", { "aria-hidden": true, className: "service-icon" }, element(Icon)),
                    element("span", { className: "service-number" }, "REHIMA / ", number),
                    element("h3", null, name),
                    element("p", null, description))))));
}

function Coaches() {
    const coaches = [
        { name: "Mikael Bekele", role: "Strength & conditioning", image: "photo-1568602471122-7832951cc4c5" },
        { name: "Rahel Kebede", role: "Group training", image: "photo-1544005313-94ddf0286df2" },
        { name: "Dawit Alemu", role: "Mobility & recovery", image: "photo-1500648767791-00dcc994a43e" },
    ];
    return element("section", { "aria-labelledby": "coaches-title", className: "coaches-section section-dark", id: "coaches" },
        element("div", { className: "section-inner" },
            element("div", { className: "coaches-heading" },
                element("div", null,
                    element("p", { className: "eyebrow" }, "Good coaching changes everything"),
                    element("h2", { className: "section-heading", id: "coaches-title" }, "MEET YOUR ", element("span", null, "COACHES."))),
                element("p", { className: "coaches-intro" }, "Real people in your corner. Here to help you find your pace, build confidence, and keep showing up.")),
            element("div", { className: "coach-community" },
                element("div", { className: "coach-community-photo" },
                    element("img", {
                        alt: "The RHEMA coaching team and gym community in Hawassa",
                        loading: "lazy",
                        onError: (event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = "src/assets/imgHero.jfif";
                        },
                        src: "/rhema-community.jpg",
                    }),
                    element("span", { className: "coach-photo-label" }, "RHEMA / HAWASSA")),
                element("div", { className: "coach-community-copy" },
                    element("span", { className: "coach-index" }, "01 / OUR COMMUNITY"),
                    element("h3", null, "BETTER,", element("br"), "TOGETHER."),
                    element("p", null, "Every strong session starts with people who make you feel welcome. Meet the crew that brings the energy to RHEMA."),
                    element("a", { className: "text-link", href: "#contact" }, "COME MEET THE TEAM ", element(FiArrowUpRight)))),
            element("div", { className: "coach-grid" }, coaches.map(({ name, role }, index) =>
                element("article", { className: "coach-card", key: name },
                    element("div", { className: "coach-portrait" },
                        element("img", { alt: `${name}, RHEMA ${role} coach`, loading: "lazy", src: `./src/assets/choach2.png` }),
                        element("span", null, `0${index + 1}`)),
                    element("div", { className: "coach-card-copy" },
                        element("h3", null, name),
                        element("p", null, role)))))));
}

function Gallery() {
    return element("section", { "aria-labelledby": "gallery-title", className: "gallery-section section-light", id: "gallery" },
        element("div", { className: "section-inner" },
            element("div", { className: "gallery-top" },
                element("div", null,
                    element("p", { className: "eyebrow" }, "Good energy lives here"),
                    element("h2", { className: "section-heading", id: "gallery-title" }, "A LOOK ", element("span", null, "INSIDE."))),
                element("a", { className: "text-link", href: "#contact" }, "COME SEE FOR YOURSELF ", element(FiArrowUpRight))),
            element("div", { className: "gallery-grid" }, photos.map(({ image, alt, label }, index) =>
                element("figure", { className: "gallery-item", key: image },
                    element("img", { alt, loading: "lazy", src: `/src/assets/choach2.png` }),
                    element("figcaption", { className: "gallery-label" },
                        element("span", null, `0${index + 1} / ${label}`),
                        element(FiArrowUpRight, { "aria-hidden": true })))))));
}

function InstagramReels() {
    return element("section", { "aria-labelledby": "reels-title", className: "instagram-reels", id: "instagram-reels" },
        element("div", { className: "section-inner" },
            element("div", { className: "reels-heading" },
                element("div", null,
                    element("p", { className: "eyebrow" }, "Straight from the gym floor"),
                    element("h2", { className: "section-heading", id: "reels-title" }, "RHEMA IN ", element("span", null, "MOTION."))),
                element("a", { className: "instagram-profile", href: instagramProfile, rel: "noreferrer", target: "_blank" },
                    element(FiInstagram, { "aria-hidden": true }), " FOLLOW @RHEMA_GYM ", element(FiArrowUpRight, { "aria-hidden": true }))),
            element("div", { className: "reels-grid" }, instagramReels.map(({ shortcode, url }, index) =>
                element("article", { className: "reel-item", key: shortcode },
                    element("iframe", {
                        allow: "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share",
                        allowFullScreen: true,
                        loading: "lazy",
                        referrerPolicy: "strict-origin-when-cross-origin",
                        src: `https://www.instagram.com/reel/${shortcode}/embed/`,
                        title: `RHEMA Gym Instagram Reel ${index + 1}`,
                    }),
                    element("a", { className: "reel-link", href: url, rel: "noreferrer", target: "_blank" },
                        "OPEN REEL ON INSTAGRAM ", element(FiArrowUpRight, { "aria-hidden": true })))))));
}

function InstagramPosts() {
    return element("section", { "aria-labelledby": "instagram-posts-title", className: "instagram-posts", id: "instagram-posts" },
        element("div", { className: "section-inner" },
            element("div", { className: "reels-heading" },
                element("div", null,
                    element("p", { className: "eyebrow" }, "Life at RHEMA, lately"),
                    element("h2", { className: "section-heading", id: "instagram-posts-title" }, "FROM THE ", element("span", null, "COMMUNITY."))),
                element("a", { className: "instagram-profile", href: instagramProfile, rel: "noreferrer", target: "_blank" },
                    element(FiInstagram, { "aria-hidden": true }), " FOLLOW @RHEMA_GYM ", element(FiArrowUpRight, { "aria-hidden": true }))),
            element("div", { className: "instagram-posts-grid" }, instagramPosts.map(({ shortcode, url }) =>
                element("article", { className: "instagram-post", key: shortcode },
                    element("iframe", {
                        loading: "lazy",
                        referrerPolicy: "strict-origin-when-cross-origin",
                        src: `https://www.instagram.com/p/${shortcode}/embed/`,
                        title: `RHEMA Gym Instagram photo post ${shortcode}`,
                    }),
                    element("a", { className: "reel-link", href: url, rel: "noreferrer", target: "_blank" },
                        "VIEW POST ON INSTAGRAM ", element(FiArrowUpRight, { "aria-hidden": true })))))));
}

function Contact() {
    const contactDetails = [
        { icon: FiMapPin, title: "FIND THE CLUB", detail: "RHEMA Fitness Centre", extra: "Hawassa, Ethiopia" },
        { icon: FiPhone, title: "GIVE US A RING", detail: "+1 (555) 010-2040", phone: "tel:+15550102040" },
        { icon: FiClock, title: "WHEN WE'RE HERE", detail: "Monday-Friday: 5 am-10 pm", extra: "Saturday-Sunday: 7 am-6 pm" },
    ];
    return element("section", { "aria-labelledby": "contact-title", className: "contact-section", id: "contact" },
        element("div", { className: "contact-inner" },
            element("div", null,
                element("p", { className: "eyebrow" }, "Your first workout starts right here"),
                element("h2", { className: "contact-heading", id: "contact-title" }, "COME AS", element("br"), "YOU ARE."),
                element("p", { className: "contact-blurb" }, "Curious about a class? Want to take a look around? Drop in, give us a call, or send a note. We'll save you a spot."),
                element("a", { className: "button-dark", href: "mailto:hello@rehimagym.com" }, "SAY HELLO ", element(FiArrowUpRight))),
            element("address", { className: "contact-details" }, contactDetails.map(({ icon: Icon, title, detail, extra, phone }) =>
                element("div", { className: "contact-detail", key: title },
                    element("span", { "aria-hidden": true, className: "contact-detail-icon" }, element(Icon)),
                    element("span", null,
                        element("strong", null, title),
                        phone ? element("a", { href: phone }, detail) : detail,
                        extra && element("span", null, element("br"), extra))))),
        ),
        element("div", { className: "map-panel" },
            element("iframe", {
                allowFullScreen: true,
                loading: "lazy",
                referrerPolicy: "no-referrer-when-downgrade",
                src: "https://maps.google.com/maps?q=7.04002,38.4786563&z=15&output=embed",
                title: "Map showing RHEMA Fitness Centre in Hawassa, Ethiopia",
            }),
            element("a", { className: "map-directions", href: "https://maps.app.goo.gl/BGsjgKbsVCrxQ4FR8", rel: "noreferrer", target: "_blank" }, "GET DIRECTIONS ", element(FiArrowUpRight))));
}

function Footer() {
    return element("footer", { className: "footer" },
        element("div", { className: "footer-inner" },
            element("div", null,
                element("a", { "aria-label": "RHEMA Fitness Centre home", className: "wordmark", href: "#home" },
                    element("img", { alt: "RHEMA Fitness Centre", className: "brand-logo", src: "/rhema-logo.svg" })),
                element("p", { className: "footer-tagline" }, "Built by good people. Made for everybody.")),
            element("nav", { "aria-label": "Footer navigation", className: "footer-nav" },
                element("a", { href: "#home" }, "Home"),
                element("a", { href: "#about" }, "Our story"),
                element("a", { href: "#services" }, "Training"),
                element("a", { href: "#gallery" }, "The club"),
                element("a", { href: "#contact" }, "Come say hi"),
                element("a", { href: "/auth" }, "Sign in / Register")),
            element("div", { "aria-label": "Social media", className: "footer-social" },
                element("a", { "aria-label": "RHEMA Gym on Instagram", href: instagramProfile, rel: "noreferrer", target: "_blank" }, element(FiInstagram)),
                element("a", { "aria-label": "Facebook", href: "https://www.facebook.com/" }, element(FiFacebook)),
                element("a", { "aria-label": "YouTube", href: "https://www.youtube.com/" }, element(FiYoutube)))),
        element("div", { className: "footer-bottom" },
            element("span", null, `\u00a9 ${new Date().getFullYear()} RHEMA FITNESS CENTRE`),
            element("span", null, "SHOW UP AS YOU ARE. LEAVE A LITTLE STRONGER.")));
}

export { Coaches, Contact, Footer, Gallery, InstagramPosts, InstagramReels, Services, Ticker };