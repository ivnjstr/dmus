"use server";

import "server-only";
import nodemailer from "nodemailer";
import { HONEYPOT_FIELD, MAX_LENGTH, SERVICES, type InquiryResult } from "./inquiry";

// Emails a Contact form inquiry to the client's mailbox through their GoDaddy Professional Email
// (Titan) SMTP account. Configured only by environment variables (see README), which stay on the
// server: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, CONTACT_TO_EMAIL.

// The browser's own type="email" rule, except the domain must contain a dot.
const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// Every value is untrusted. One-line fields lose control characters and line breaks, so nothing
// typed can add an email header; the message keeps its line breaks and tabs only.
function oneLine(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.replace(/[\p{Cc}\s]+/gu, " ").trim() : "";
}

function multiLine(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return "";
  return value
    .replace(/\r\n?/g, "\n")
    .replace(/\p{Cc}/gu, (char) => (char === "\n" || char === "\t" ? char : ""))
    .trim();
}

const invalid = (message: string): InquiryResult => ({ status: "invalid", message });

export async function sendInquiry(formData: FormData): Promise<InquiryResult> {
  // Filled-in spam trap: report success so the bot moves on, but send nothing.
  if (oneLine(formData.get(HONEYPOT_FIELD))) return { status: "sent" };

  const name = oneLine(formData.get("name"));
  const email = oneLine(formData.get("email"));
  const phone = oneLine(formData.get("phone"));
  const company = oneLine(formData.get("company"));
  const message = multiLine(formData.get("message"));
  const submittedServices = formData.getAll("services");
  const services = submittedServices.filter(
    (service): service is string => typeof service === "string" && SERVICES.includes(service),
  );

  if (!name) return invalid("Please enter your name.");
  if (name.length > MAX_LENGTH.name) return invalid("Please shorten your name.");
  if (email.length > MAX_LENGTH.email || !EMAIL_PATTERN.test(email)) {
    return invalid("Please enter a valid email address.");
  }
  if (phone.length > MAX_LENGTH.phone) return invalid("Please shorten your phone number.");
  if (company.length > MAX_LENGTH.company) return invalid("Please shorten your brand or company name.");
  if (services.length !== submittedServices.length) return invalid("Please choose services from the list.");
  if (!message) return invalid("Please tell us a little about your project.");
  if (message.length > MAX_LENGTH.message) {
    return invalid(`Please keep your message under ${MAX_LENGTH.message.toLocaleString("en-US")} characters.`);
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, CONTACT_TO_EMAIL } = process.env;
  const port = Number(SMTP_PORT);
  const portIsValid = Number.isInteger(port) && port > 0 && port < 65536;
  if (!SMTP_HOST || !portIsValid || !SMTP_USER || !SMTP_PASSWORD || !CONTACT_TO_EMAIL) {
    // Variable names only, never their values.
    const unset = Object.entries({ SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, CONTACT_TO_EMAIL })
      .filter(([key, value]) => !value || (key === "SMTP_PORT" && !portIsValid))
      .map(([key]) => key);
    console.error(`Contact form: email is not configured (missing or invalid: ${unset.join(", ")}).`);
    return { status: "failed" };
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: true, // SSL from the first byte (port 465), as GoDaddy/Titan require
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
    // Fail within seconds instead of hanging until the serverless function times out.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  try {
    await transporter.sendMail({
      from: { name: "DMUS Website", address: SMTP_USER },
      to: CONTACT_TO_EMAIL,
      replyTo: { name, address: email },
      subject: `New website inquiry from ${name}`,
      text: [
        "New inquiry from the DMUS website Contact form.",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        `Company: ${company || "Not provided"}`,
        `Services: ${[...new Set(services)].join(", ") || "None selected"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });
    return { status: "sent" };
  } catch (error) {
    // Only the error code (e.g. EAUTH, ETIMEDOUT): the message can echo server details.
    const code = error instanceof Error && "code" in error ? String(error.code) : "unknown";
    console.error(`Contact form: the inquiry email could not be sent (${code}).`);
    return { status: "failed" };
  }
}
