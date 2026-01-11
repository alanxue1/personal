"use client";

import { cn } from "@/lib/utils";
import React from "react";

export interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
  reverse?: boolean;
  initialOffset?: number;
}

export function BorderBeam({
  className,
  size = 50,
  duration = 6,
  anchor = 90,
  borderWidth = 1,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  delay = 0,
  reverse = false,
  initialOffset = 0,
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": duration,
          "--anchor": anchor,
          "--border-width": borderWidth,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
          "--initial-offset": initialOffset,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",
        "[mask-clip:padding-box,border-box] [mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        "after:absolute after:aspect-square after:w-[var(--size)] after:animate-border-beam after:[animation-delay:var(--delay)] after:[animation-duration:var(--duration)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[background-size:50%_100%] after:content-['']",
        reverse && "after:[animation-direction:reverse]",
        className,
      )}
    />
  );
}
