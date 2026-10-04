"use client";

import type { ComponentProps } from "react";
import { useContactModal } from "./contact-modal-provider";

// Other button attributes (such as data-reveal for the entrance animation) pass straight through.
export function ContactModalTrigger({
  children,
  ...props
}: Omit<ComponentProps<"button">, "type" | "onClick">) {
  const { open } = useContactModal();

  return (
    <button {...props} type="button" aria-haspopup="dialog" onClick={open}>
      {children}
    </button>
  );
}
