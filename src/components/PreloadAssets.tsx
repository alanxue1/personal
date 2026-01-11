"use client";

import { useEffect } from "react";

export function PreloadAssets() {
  useEffect(() => {
    // Add preload links for critical assets
    const preloads = [
      { href: "/pfp.png", as: "image" },
      { href: "/verified.png", as: "image" },
    ];

    preloads.forEach(({ href, as }) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = href;
      link.as = as;
      document.head.appendChild(link);
    });

    // Cleanup on unmount (though unlikely to unmount)
    return () => {
      preloads.forEach(({ href }) => {
        const existing = document.querySelector(`link[rel="preload"][href="${href}"]`);
        if (existing) {
          existing.remove();
        }
      });
    };
  }, []);

  return null;
}
