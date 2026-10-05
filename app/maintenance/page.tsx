import type { Metadata } from "next";
import Image from "next/image";
import { ContactModalProvider, ContactModalTrigger } from "@/components/contact-modal";
import { ArrowRightIcon } from "@/components/icons";
import logo from "@/public/dmus_logo.png";
import styles from "./maintenance.module.css";

// TEMPORARY: shown for every page while MAINTENANCE_MODE is on (see proxy.ts). The root layout only
// adds <html>, <body> (the green paper background) and the fonts; the header, footer and splash
// live in app/page.tsx, so this page renders on its own.

export const metadata: Metadata = {
  title: "DMUS — Back soon",
  robots: { index: false, follow: false },
};

// The site's logo with the same crop as components/logo.tsx, but not a link: its link home would only
// lead back here (and Next would prefetch it, which the maintenance rewrite answers with a 503).
const CROP = { x: 55, y: 147, width: 420, height: 163 };

// As in the footer, no profile URLs have been supplied yet; add an href to show one as a link.
const SOCIAL_LINKS: { label: string; href?: string }[] = [
  { label: "Instagram" },
  { label: "Facebook" },
  { label: "TikTok" },
];

export default function MaintenancePage() {
  return (
    <ContactModalProvider>
      <div className="flex min-h-dvh flex-col items-center px-7 pt-11 pb-9.5 text-center max-[600px]:px-5.5 max-[600px]:pt-8.5 max-[600px]:pb-7.5">
        <div className={`${styles.rise} [--delay:100ms]`}>
          <span
            className="relative mx-auto block h-10 overflow-hidden"
            style={{ aspectRatio: `${CROP.width} / ${CROP.height}` }}
          >
            <Image
              src={logo}
              alt="DMUS"
              sizes="125px"
              loading="eager"
              className="absolute max-w-none"
              style={{
                width: `${(logo.width / CROP.width) * 100}%`,
                height: "auto",
                left: `${(-CROP.x / CROP.width) * 100}%`,
                top: `${(-CROP.y / CROP.height) * 100}%`,
              }}
            />
          </span>
          <p className="mt-3 text-[9.5px] leading-normal tracking-[3px] text-cream/55 uppercase">
            Digital Marketing Services
          </p>
        </div>

        <main className="flex flex-1 flex-col items-center justify-center py-10">
          <p className={`${styles.rise} mb-8.5 inline-flex items-center gap-2.5 text-[11px] leading-none font-semibold tracking-[2.2px] text-brand-orange uppercase [--delay:300ms]`}>
            <span aria-hidden="true" className={`${styles.pulse} relative size-1.75 rounded-full bg-brand-orange`} />
            Under maintenance
          </p>

          <h1 className={`${styles.rise} mb-7 font-display text-[clamp(44px,8vw,112px)] leading-[1.02] font-medium tracking-[-0.5px] [--delay:500ms]`}>
            We&apos;ll be
            <br />
            <em className="text-brand-orange">back soon.</em>
          </h1>

          <p className={`${styles.rise} mb-11 max-w-105 text-[15.5px] leading-[1.85] text-cream/72 [--delay:700ms]`}>
            Our website is getting a fresh update. Thank you for your patience — we&apos;d love to hear
            from you in the meantime.
          </p>

          {/* Opens the site's existing Contact popup (same form, same sending). */}
          <ContactModalTrigger
            className={`${styles.rise} group inline-flex items-center gap-2.5 rounded-full bg-brand-orange px-10 py-4.5 text-sm leading-none font-semibold tracking-[0.3px] text-brand-ink transition duration-300 ease-out hover:bg-[#d4841c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange active:duration-100 motion-safe:hover:-translate-y-0.75 motion-safe:active:scale-97 [--delay:900ms]`}
          >
            Get in Touch
            <ArrowRightIcon className="h-2 w-2.5 transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-1" />
          </ContactModalTrigger>
        </main>

        <footer className={`${styles.rise} flex flex-col items-center gap-3.5 [--delay:900ms]`}>
          <ul className="flex gap-7 max-[600px]:gap-5.5">
            {SOCIAL_LINKS.map(({ label, href }) => (
              <li key={label} className="text-[10.5px] leading-normal font-semibold tracking-[1.8px] text-cream/60 uppercase">
                {href ? (
                  <a href={href} className="transition-colors duration-250 hover:text-brand-orange">
                    {label}
                  </a>
                ) : (
                  label
                )}
              </li>
            ))}
          </ul>
          <p className="text-[11.5px] leading-normal text-cream/40">© 2026 DMUS · hello@marketingwithdmus.com</p>
        </footer>
      </div>
    </ContactModalProvider>
  );
}
