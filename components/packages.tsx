import { buttonClasses } from "@/components/button-styles";
import { ContactModalTrigger } from "@/components/contact-modal";
import { SectionHeading } from "@/components/section-heading";

type Plan = {
  name: string;
  recommended?: boolean;
  price?: { usd: string; php: string };
  groups: { label: string; items: string[] }[];
};

const PLANS: Plan[] = [
  {
    name: "Starter",
    price: { usd: "USD 265", php: "PHP 15,000 monthly" },
    groups: [
      {
        label: "Ad campaign",
        items: [
          "Content strategy",
          "Meta platforms",
          "Monthly ad budget management (up to 2000 Php)",
          "3 ad creatives",
          "Monthly Analytics & Ad performance report",
        ],
      },
      {
        label: "Organic campaign",
        items: ["Content strategy", "Meta platforms", "12 posts per month", "Monthly Analytics"],
      },
    ],
  },
  {
    name: "Growth",
    recommended: true,
    price: { usd: "USD 445", php: "PHP 25,000 monthly" },
    groups: [
      {
        label: "Ad campaign",
        items: [
          "Content strategy",
          "Meta platforms",
          "Monthly ad budget management (up to 4000 Php)",
          "4 ad creatives",
          "Monthly Analytics & Ad performance report",
        ],
      },
      {
        label: "Organic campaign",
        items: ["Content strategy", "Meta platforms", "16 posts per month", "Monthly Analytics"],
      },
    ],
  },
  {
    name: "Content Shoot",
    groups: [
      {
        label: "Inclusions",
        items: [
          "Edited reels & photos good for 1 Month",
          "Strategically shot media that can be repurposed for up to 3 months",
          "Unlimited close-up & detail Shots",
          "Turnover of all raw files",
          "For brands requiring on-location shoots, transportation and accommodation costs are not included in the package and will be covered by the client.",
        ],
      },
    ],
  },
];

const labelClasses = "text-[11px] leading-normal font-semibold tracking-[0.12em] text-brand-orange uppercase";

export function Packages() {
  return (
    <section id="packages" className="border-b border-cream/15">
      <div className="page-container py-20 md:py-28">
        <SectionHeading eyebrow="Packages" title="Choose how we can work together." />
        <p data-reveal className="mt-4 max-w-md text-base leading-normal text-cream/85">
          We offer solutions designed to meet every customer&apos;s distinct needs and goals.
        </p>
        {/* The rule draws in from the left; then the packages rise in one after another. */}
        <hr data-reveal="line" className="mt-3.5 border-cream/15" />

        <div className="mt-12.75 grid lg:-mx-9.5 lg:grid-cols-3 xl:-mx-11">
          {PLANS.map((plan) => (
            <article
              key={plan.name}
              data-reveal
              className={`flex flex-col pt-12.5 pb-10.5 lg:px-9.5 ${
                plan.recommended ? "border-x border-t-2 border-cream/15 border-t-brand-orange px-5" : ""
              }`}
            >
              {plan.recommended && <p className={labelClasses}>Recommended</p>}
              <h3 className={`font-display text-[28px] leading-[1.2] font-medium ${plan.recommended ? "mt-4.5" : ""}`}>
                {plan.name}
              </h3>
              {plan.price && (
                <>
                  <p className="mt-7 font-display text-[28px] leading-[1.2] font-semibold">{plan.price.usd}</p>
                  <p className="mt-2 text-[11px] leading-normal font-semibold tracking-[0.08em] text-brand-orange uppercase">
                    {plan.price.php}
                  </p>
                </>
              )}

              <div className={plan.price ? "mt-8.5" : "mt-6.75"}>
                {plan.groups.map((group, index) => (
                  <div key={group.label} className={index > 0 ? "mt-3.5" : ""}>
                    <p className={labelClasses}>{group.label}</p>
                    <ul className="mt-1 divide-y divide-cream/6 text-sm leading-[1.55] text-cream/90">
                      {group.items.map((item) => (
                        <li key={item} className="py-2.75">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Opens the existing Contact popup, like "Let's Talk". Sizes follow the Packages design. */}
              <ContactModalTrigger
                className={`${buttonClasses(plan.recommended ? "primary" : "outline")} mt-5 w-full text-[15.4px]! ${
                  plan.recommended ? "h-13.25!" : ""
                }`}
              >
                Get Started
              </ContactModalTrigger>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
