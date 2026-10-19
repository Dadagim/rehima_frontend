import { FiArrowUpRight } from "react-icons/fi";

function Hero() {
        return ( <section aria-label = "Welcome to RHEMA Fitness Centre"
            className = "relative flex min-h-[680px] items-center overflow-hidden bg-ink text-white md:min-h-[min(790px,calc(100svh-76px))]" >
            <img alt = "Sunlight falling across a modern strength training gym"
            className = "absolute inset-0 size-full object-cover object-center opacity-65"
            src = "/src/assets/imgHero2.jfif" />
            <div aria-hidden = "true"
            className = "absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/15" / >
            <div className = "relative mx-auto w-full max-w-7xl px-6 py-16 md:px-10" >
            <p className = "mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white/80 before:h-0.5 before:w-6 before:bg-orange" >
            A different kind of strong
            </p>
                <h1 className = "max-w-4xl font-display text-[clamp(5rem,12.2vw,10rem)] font-extrabold uppercase leading-[0.82]" >
            BUILT TO <br/> MOVE. <br/> MADE TO <span className = "text-orange" > LAST. </span> </h1>
                <div className = "mt-8 flex max-w-2xl flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between" >
            <p className = "max-w-xs text-sm leading-7 text-white/75" >
            Good people.Great coaching.Training that meets you where you are, and takes you somewhere new. </p> <a className = "inline-flex min-h-12 items-center gap-3 bg-orange px-5 text-xs font-extrabold text-ink transition hover:-translate-y-1 hover:bg-white"
            href = "#contact" >
            FIND YOUR PLACE <FiArrowUpRight aria-hidden = "true" />
            </a>
                </div>
                <div className = "absolute bottom-7 right-6 grid size-[82px] rotate-6 place-content-center rounded-full border border-white/70 text-center text-[9px] leading-5 sm:bottom-12 sm:right-12 sm:size-[100px]" >
            <span > SHOW UP </span><strong className="font-display text-xl text-orange">5 AM</strong > <span> START HERE </span>
                </div>
            </div>
            </section>)
            }
export default Hero;