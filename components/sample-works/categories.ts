export type WorkCategory = {
  title: string;
  /** One entry per reel (its duration label). Add each reel's video here once supplied. */
  reels: string[];
  /** Becomes a list of photos once the real images are supplied. */
  photoCount: number;
};

// Placeholder media: every category in the design reads "4 reels · 6 photos".
const PLACEHOLDER_MEDIA = { reels: ["0:41", "0:41", "0:41", "0:41"], photoCount: 6 };

export const WORK_CATEGORIES: WorkCategory[] = [
  { title: "Property Management Company", ...PLACEHOLDER_MEDIA },
  { title: "Hospitality & Tourism", ...PLACEHOLDER_MEDIA },
  { title: "Beauty and Health Brand", ...PLACEHOLDER_MEDIA },
  { title: "Tattoo Artist and Aesthetician", ...PLACEHOLDER_MEDIA },
  { title: "Clothing and Accessories Brand", ...PLACEHOLDER_MEDIA },
  { title: "Website Developer", ...PLACEHOLDER_MEDIA },
  { title: "Lifestyle Reels", ...PLACEHOLDER_MEDIA },
  { title: "Taqueria", ...PLACEHOLDER_MEDIA },
];

export function workMeta(category: WorkCategory) {
  return `${category.reels.length} reels · ${category.photoCount} photos`;
}
