import { Logo } from "@/components/logo";

const PAGE_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Packages", href: "#packages" },
  { label: "Contact", href: "#contact" },
];

// Profile URLs haven't been supplied yet — add an href to each and render it as a link.
const SOCIAL_LINKS = ["Instagram", "Facebook", "TikTok"];

const EMAIL = "hello@marketingwithdmus.com";

export function SiteFooter() {
  return (
    <footer className="paper-cream bg-cream text-[#20281f]">
      {/* Fades in as it comes into view; links get the drawn underline on hover. */}
      <div
        data-reveal="fade"
        className="page-container flex flex-col items-center gap-6 pt-9 pb-10 text-center xl:flex-row xl:justify-between xl:text-left"
      >
        <Logo />

        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[#20281f]/90 xl:gap-x-8.25">
            {PAGE_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="link-underline transition-colors hover:text-[#20281f]">
                  {link.label}
                </a>
              </li>
            ))}
            {SOCIAL_LINKS.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </nav>

        <a href={`mailto:${EMAIL}`} className="link-underline text-[13px] text-[#20281f]/75 transition-colors hover:text-[#20281f]">
          {EMAIL}
        </a>
      </div>
    </footer>
  );
}
