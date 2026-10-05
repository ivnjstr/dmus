// Shared by the Contact form (contact-modal.tsx) and the server action that emails it (send-inquiry.ts).

export const SERVICES = [
  "Branding",
  "Social Media",
  "Content & Reels",
  "Creative Campaigns",
  "Website / Digital",
];

// Longest accepted value per field: the form uses these as maxLength, the server enforces them.
export const MAX_LENGTH = {
  name: 100,
  email: 254,
  phone: 40,
  company: 120,
  message: 5000,
};

// Hidden spam-trap field: people never see it, bots that fill in every field do.
export const HONEYPOT_FIELD = "website";

// What the server action reports back. Only "invalid" carries text (what to fix); any other
// failure is shown as one generic message, so no server or SMTP detail reaches the browser.
export type InquiryResult =
  | { status: "sent" }
  | { status: "invalid"; message: string }
  | { status: "failed" };
