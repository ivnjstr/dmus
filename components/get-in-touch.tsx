import { ContactModalTrigger } from "@/components/contact-modal";

// Light (cream) section colours from the design.
// Dark text/button: #20281f · accent orange on cream: #d4841c

export function GetInTouch() {
  return (
    <section id="contact" className="bg-cream text-[#20281f]">
      {/* Eyebrow, each headline line, the subline and the button rise in one after another. */}
      <div className="page-container flex flex-col items-center py-24 text-center md:py-41.5">
        <p data-reveal className="text-xs leading-none font-semibold tracking-[0.2em] text-[#d4841c] uppercase">
          Get in touch
        </p>
        <h2 className="mt-6.5 font-display text-[clamp(2rem,9.5vw,7.3rem)] leading-[1.035] font-semibold">
          <span data-reveal className="block">
            Have a brand worth
          </span>
          <em data-reveal className="block font-medium text-[#d4841c]">
            talking about?
          </em>
        </h2>
        <p data-reveal className="mt-9.5 text-base leading-[1.6] text-[#20281f]/80 md:text-lg">
          Let&apos;s create something people remember.
        </p>

        {/* Opens the existing Contact popup, like "Let's Talk". Hover nudges the arrow. */}
        <ContactModalTrigger
          data-reveal
          className="group mt-11.5 inline-flex h-16.5 items-center justify-center gap-3.75 rounded-full bg-[#20281f] px-12 text-base leading-none font-semibold text-cream transition hover:opacity-90 active:duration-100 motion-safe:active:scale-97 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4841c]"
        >
          Start a Project
          <svg
            viewBox="0 0 12 6"
            className="h-1.5 w-3 transition-transform duration-300 ease-glide motion-safe:group-hover:translate-x-1"
            aria-hidden="true"
          >
            <path d="M0 3h11M8.5.75 11 3 8.5 5.25" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </ContactModalTrigger>
      </div>
    </section>
  );
}
