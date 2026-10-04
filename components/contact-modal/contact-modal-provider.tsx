"use client";

import { createContext, useContext, useMemo, useRef } from "react";
import { ContactModal } from "./contact-modal";

type ContactModalContextValue = { open: () => void };

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

// Renders the popup once and lets any trigger on the page open it.
export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const value = useMemo(() => ({ open: () => dialogRef.current?.showModal() }), []);

  return (
    <ContactModalContext value={value}>
      {children}
      <ContactModal ref={dialogRef} />
    </ContactModalContext>
  );
}

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error("useContactModal must be used inside <ContactModalProvider>");
  }
  return context;
}
