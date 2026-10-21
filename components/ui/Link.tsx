"use client";

import NextLink from "next/link";
import type { ReactNode } from "react";

export function Link({
  to,
  children,
  className,
  onClick,
}: {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <NextLink className={className} href={to} onClick={onClick}>
      {children}
    </NextLink>
  );
}
