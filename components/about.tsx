const VALUES = [
  { title: "Strategy", text: "We create with purpose, not just aesthetics." },
  { title: "Consistency", text: "Every touchpoint works together as one recognisable brand." },
  { title: "Creativity", text: "Fresh ideas designed to make brands stand out." },
];

export function About() {
  return (
    <section id="about" className="border-b border-cream/15">
      <div className="page-container py-20 md:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-[453fr_659fr] lg:gap-16">
          {/* Eyebrow, heading and text rise in one after another, with the image beside them. */}
          <div className="lg:pb-3.5">
            <p data-reveal className="text-xs leading-none font-semibold tracking-[0.15em] text-brand-orange uppercase">
              About DMUS
            </p>
            <h2 data-reveal className="mt-5 font-display text-[2rem] leading-[1.3] font-medium md:text-[2.45rem]">
              We&apos;re here to make
              <br />
              <em className="text-brand-orange">brands matter.</em>
            </h2>
            <p data-reveal className="mt-5.5 max-w-md text-[0.92rem] leading-[1.8] text-cream/85">
              A small, hands-on creative team helping businesses across property, hospitality, beauty,
              food and more show up consistently — online and off.
            </p>
          </div>

          {/* Image placeholder — put <Image src="..." alt="..." fill sizes="(min-width: 1024px) 56vw, 100vw" className="object-cover" />
              inside this box and remove `image-placeholder` when the real photo is supplied. */}
          <div data-reveal="media" className="image-placeholder relative aspect-659/453 overflow-hidden rounded" />
        </div>

        {/* The rule draws in, then the three values rise in one after another. */}
        <div className="mt-16 md:mt-22.5">
          <hr data-reveal="line" className="border-cream/15 md:mx-10" />
          <div className="grid md:grid-cols-3">
            {VALUES.map((value, index) => (
              <div
                key={value.title}
                data-reveal
                className={`py-6 md:py-0 md:pt-8.5 md:pl-8 ${index > 0 ? "border-t border-cream/15 md:border-t-0 md:border-l" : ""}`}
              >
                <h3 className="font-display text-[18px] leading-[1.3]">{value.title}</h3>
                <p className="mt-2.5 max-w-68 text-[13px] leading-[1.65] text-cream/75">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
