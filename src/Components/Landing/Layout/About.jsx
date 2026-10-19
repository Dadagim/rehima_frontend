import {FiArrowUpRight} from "react-icons/fi";

function About() {
        return ( <section aria-labelledby = "about-title"
            className = "mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:gap-20 md:px-10 md:py-28"
            id = "about" >
            <div className = "group relative min-h-[330px] [perspective:1000px] md:min-h-[400px]" >
            <img
            alt = "The RHEMA community together in Hawassa"
            className = "h-[315px] w-[88%] object-cover object-center shadow-[20px_20px_0_var(--color-orange)] transition duration-500 group-hover:rotate-0 md:h-[390px] md:-rotate-y-6 md:-rotate-z-2"
            loading = "lazy"
            onError = {(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = "/src/assets/imgHero.jfif";
                }
            }
            src = "/src/assets/about.png" />
            <div className = "absolute bottom-0 right-0 grid size-28 rotate-3 place-content-center bg-ink text-center text-white">
            <strong className = "font-display text-4xl text-orange"> 01 </strong> <span className = "text-[9px] font-bold"> NO EGOS.JUST ENERGY. </span>
    </div>
        </div>
    <div>
            <p className = "mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 before:h-0.5 before:w-6 before:bg-orange" >
            More than a room full of weights
            </p>
        <h2 className = "font-display text-6xl font-extrabold uppercase leading-[0.9] sm:text-7xl" >
            OUR STORY. <br/> OUR <span className="text-orange"> PEOPLE. </span>
        </h2>
        <p className="my-6 max-w-lg text-sm leading-7 text-stone-600">
            RHEMA is a place to get stronger side by side.From your first session to your next personal best, our coaches and community bring the energy, encouragement, and room to grow.
        </p>
        <a className = "inline-flex items-center gap-2 border-b border-ink pb-1 text-xs font-bold transition hover:text-orange-800"
            href = "#services">
            MEET YOUR NEXT WORKOUT <FiArrowUpRight aria-hidden = "true"/>
            </a>
    </div>
        </section>
        );
    }

    export default About;