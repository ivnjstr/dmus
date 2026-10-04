import { buttonClasses } from "@/components/button-styles";
import { ContactModalTrigger } from "@/components/contact-modal";
import { Logo } from "@/components/logo";

// Anchors for the sections that will be built below the hero.
const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Packages", href: "#packages" },
];

export function SiteHeader() {
  return (
    <header>
      {/* Fades in on load, alongside the hero. */}
      <div className="page-container flex flex-wrap items-center justify-between gap-y-5 py-5 motion-safe:animate-fade-in md:py-10">
        <Logo />

        {/* On mobile the links drop to their own row under the logo and button. */}
        <nav aria-label="Main" className="order-last w-full md:order-0 md:w-auto">
          <ul className="flex justify-center gap-6 md:gap-10">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="link-underline text-sm text-cream/90 transition-colors hover:text-cream"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ContactModalTrigger className={buttonClasses("primary", "md")}>
          Let&apos;s Talk
        </ContactModalTrigger>
      </div>
    </header>
  );
}
