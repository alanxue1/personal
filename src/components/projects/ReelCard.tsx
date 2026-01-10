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
  const [videoError, setVideoError] = React.useState(false);
  const [videoAspect, setVideoAspect] = React.useState<number | null>(null);

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

  const effectiveFit: "cover" | "contain" =
    project.videoFit ??
    (videoAspect != null && videoAspect > 1 /* landscape */ ? "contain" : "cover");

  return (
    <section className="relative h-full w-full bg-background">
      <div className="absolute inset-0 grid place-items-center px-2 py-4">
        {/* "Phone" frame */}
        <div
          className={[
            "relative aspect-[9/16] w-[min(95vw,520px)] max-h-full overflow-hidden rounded-[28px]",
            "bg-black ring-1 ring-white/10 shadow-2xl",
            "transition-transform duration-300",
            isActive ? "scale-100" : "scale-[0.985]",
          ].join(" ")}
        >
          <video
            ref={videoRef}
            className={[
              "h-full w-full",
              effectiveFit === "cover" ? "object-cover" : "object-contain",
            ].join(" ")}
            src={project.videoSrc}
            poster={project.posterSrc}
            muted
            loop
            playsInline
            preload="metadata"
            onClick={onVideoClick}
            onLoadedMetadata={() => {
              setVideoError(false);
              const w = videoRef.current?.videoWidth ?? 0;
              const h = videoRef.current?.videoHeight ?? 0;
              if (w > 0 && h > 0) setVideoAspect(w / h);
            }}
            onError={() => {
              setVideoError(true);
            }}
          />
          {videoError ? (
            <div className="absolute inset-0 z-10 grid place-items-center bg-black">
              <div className="max-w-[75%] text-center">
                <p className="text-sm font-medium text-white">Video missing</p>
                <p className="mt-1 text-xs text-white/70">
                  Put the file at <span className="font-mono">public{project.videoSrc}</span>
                </p>
              </div>
            </div>
          ) : null}

          {/* Overlay (title/tags) */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-black/25 to-transparent p-4">
            <div className="pr-16">
              <p className="text-base font-semibold tracking-tight text-white">
                {project.title}
              </p>
              {project.subtitle ? (
                <p className="mt-1 text-sm text-white/80">{project.subtitle}</p>
              ) : null}

              {project.tags.length ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/90"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          {/* Actions slot (pinned to the phone frame, not the whole screen) */}
          <div className="absolute bottom-24 right-2 z-20 pointer-events-auto">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

