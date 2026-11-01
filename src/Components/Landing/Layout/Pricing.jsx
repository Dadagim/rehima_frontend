import { FiArrowUpRight, FiCheck, FiChevronDown } from "react-icons/fi";

const plans = [
    {
        number: "01",
        name: "Open Gym",
        description: "Your space, your schedule, your next personal best.",
        features: ["Gym floor access", "Strength and conditioning", "A welcoming community"],
        featured: false,
    },
    {
        number: "02",
        name: "Group Training",
        description: "Bring the energy with coached classes and good people.",
        features: ["Kickboxing and martial arts", "Supportive coached sessions", "Build skill at your pace"],
        featured: true,
    },
    {
        number: "03",
        name: "Personal Coaching",
        description: "Get focused support to make your training feel your own.",
        features: ["Guidance shaped around your goals", "A pace that works for you", "Talk through your next steps"],
        featured: false,
    },
];

const questions = [
    {
        question: "How much does a membership cost?",
        answer: "Membership rates can vary by training option. Contact our team for the latest prices and help choosing what suits you.",
    },
    {
        question: "Which training options can I ask about?",
        answer: "RHEMA offers gym training, kickboxing, jiu-jitsu, and martial arts. Ask the team about current class availability and membership options.",
    },
    {
        question: "Do I need to be experienced to get started?",
        answer: "No. Come as you are and talk with the team about your experience and goals. They can help you find a comfortable place to begin.",
    },
    {
        question: "Can I visit before choosing a membership?",
        answer: "Absolutely—get in touch or visit the club in Hawassa to meet the team and ask about getting started.",
    },
];

function Pricing() {
    return (
        <section aria-labelledby="pricing-title" className="pricing-section" id="pricing">
            <div className="section-inner">
                <div className="pricing-heading">
                    <div>
                        <p className="eyebrow">Good training. No guesswork.</p>
                        <h2 className="section-heading" id="pricing-title">
                            FIND YOUR <span>FIT.</span>
                        </h2>
                    </div>
                    <p className="pricing-intro">
                        Start with the way you want to move. Our team can walk you through
                        current rates and the best membership for you.
                    </p>
                </div>

                <div className="pricing-grid">
                    {plans.map(({ number, name, description, features, featured }) => (
                        <article
                            className={`pricing-card${featured ? " pricing-card-featured" : ""}`}
                            key={number}
                        >
                            <div className="pricing-card-top">
                                <span className="pricing-number">RHEMA / {number}</span>
                                {featured && <span className="pricing-badge">THE RHEMA MIX</span>}
                            </div>
                            <h3>{name}</h3>
                            <p className="pricing-description">{description}</p>
                            <div className="pricing-rate">
                                <span>Current rates</span>
                                <strong>Let&apos;s talk</strong>
                                <small>Ask our team for details</small>
                            </div>
                            <ul>
                                {features.map((feature) => (
                                    <li key={feature}>
                                        <FiCheck aria-hidden="true" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <a className="pricing-cta" href="#contact">
                                ASK ABOUT THIS OPTION <FiArrowUpRight aria-hidden="true" />
                            </a>
                        </article>
                    ))}
                </div>

                <div className="faq-section">
                    <div className="faq-heading">
                        <p className="eyebrow">A few things you might be wondering</p>
                        <h2 className="section-heading">
                            GOOD TO <span>KNOW.</span>
                        </h2>
                    </div>
                    <div className="faq-list">
                        {questions.map(({ question, answer }) => (
                            <details className="faq-item" key={question}>
                                <summary>
                                    {question}
                                    <FiChevronDown aria-hidden="true" />
                                </summary>
                                <p>{answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Pricing;
