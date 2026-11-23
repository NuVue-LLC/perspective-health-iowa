"use client";

import { usePathname } from "next/navigation";

// Funnel pages (/go/...) are standalone: no site header, footer or chat.
export function HideOnFunnel({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/go")) return null;
  return <>{children}</>;
}
