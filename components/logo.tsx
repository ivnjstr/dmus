import Image from "next/image";
import Link from "next/link";
import logo from "@/public/dmus_logo.png";

// dmus_logo.png is a 500×500 canvas with transparent padding around the
// wordmark. This is the wordmark's box inside it, so we can crop to it.
const CROP = { x: 55, y: 147, width: 420, height: 163 };

// Header/footer size by default; the splash passes a larger height (with matching image sizes and quality).
export function Logo({
  className = "h-7 md:h-8.5",
  sizes = "110px",
  quality,
}: {
  className?: string;
  sizes?: string;
  quality?: number;
}) {
  return (
    <Link href="/" className="block">
      <span
        className={`relative block overflow-hidden ${className}`}
        style={{ aspectRatio: `${CROP.width} / ${CROP.height}` }}
      >
        <Image
          src={logo}
          alt="DMUS"
          sizes={sizes}
          quality={quality}
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
    </Link>
  );
}
