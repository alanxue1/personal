"use client";

import * as React from "react";
import type { Project } from "@/content/projects";

export type ReelCardProps = {
  project: Project;
  isActive: boolean;
  onVideoClick?: () => void;
  children?: React.ReactNode;
};

export function ReelCard({ project, isActive, onVideoClick, children }: ReelCardProps) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    if (!isActive) {
      el.pause();
      return;
    }

    const p = el.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, [isActive]);

  return (
    <section className="relative min-h-dvh snap-start snap-always">
      <div className="absolute inset-0 bg-black">
        <video
          ref={videoRef}
          className="h-full w-full object-contain"
          src={project.videoSrc}
          poster={project.posterSrc}
          muted
          loop
          playsInline
          preload="metadata"
          onClick={onVideoClick}
        />
      </div>

      {/* Overlay */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 via-black/10 to-transparent p-5">
        <div className="mx-auto w-full max-w-4xl">
          <p className="text-lg font-semibold tracking-tight text-white">
            {project.title}
          </p>
          {project.subtitle ? (
            <p className="mt-1 text-sm text-white/80">{project.subtitle}</p>
          ) : null}

          {project.tags.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white/90"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {/* Actions slot */}
      <div className="absolute inset-y-0 right-3 z-20 flex items-center">
        <div className="pointer-events-auto">{children}</div>
      </div>
    </section>
  );
}

