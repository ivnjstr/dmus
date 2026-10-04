import { buttonClasses } from "@/components/button-styles";
import { ContactModalTrigger } from "@/components/contact-modal";

export function Hero() {
  return (
    <section className="border-b border-cream/15">
      {/* On load each part rises in after the one before (CSS only, so it never waits for JavaScript). */}
      <div className="page-container flex flex-col items-center pt-14 pb-24 text-center md:pt-22 md:pb-38">
        <h1 className="font-display text-[clamp(1.875rem,9.5vw,4.725rem)] leading-[1.1]">
          <span className="block motion-safe:animate-hero-rise">We turn brands into</span>
          <em className="block text-brand-orange [--delay:var(--motion-hero-step)] motion-safe:animate-hero-rise">
            something people
            <br />
            remember.
          </em>
        </h1>

        <p className="mt-7.5 max-w-135 text-base leading-[1.8] [--delay:calc(var(--motion-hero-step)*2)] motion-safe:animate-hero-rise md:text-lg">
          Branding, social content, creative campaigns and digital experiences built to
          make your business stand out.
        </p>

        <div className="mt-11 flex w-full max-w-75 flex-col gap-3 [--delay:calc(var(--motion-hero-step)*3)] motion-safe:animate-hero-rise sm:w-auto sm:max-w-none sm:flex-row sm:gap-4">
          <a href="#work" className={buttonClasses("primary")}>
            View Our Work
          </a>
          <ContactModalTrigger className={buttonClasses("outline")}>
            Let&apos;s Work Together
          </ContactModalTrigger>
        </div>

        <svg
          viewBox="0 0 24 24"
          className="mt-7.5 size-5 text-brand-orange [--delay:calc(var(--motion-hero-step)*4.2)] motion-safe:animate-star-in"
          aria-hidden="true"
        >
          <path fill="currentColor" d="M12 0Q13.2 10.8 24 12 13.2 13.2 12 24 10.8 13.2 0 12 10.8 10.8 12 0Z" />
        </svg>
      </div>
    </section>
  );
}
