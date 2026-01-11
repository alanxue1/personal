"use client";

import * as React from "react";
import type { Project } from "@/content/projects";

export type ReelCardProps = {
  project: Project;
  isActive: boolean;
  onVideoClick?: () => void;
  children?: React.ReactNode;
};

export function ReelCard({ project, isActive, children }: ReelCardProps) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const progressRef = React.useRef<HTMLDivElement | null>(null);
  const [videoError, setVideoError] = React.useState(false);
  const [videoAspect, setVideoAspect] = React.useState<number | null>(null);
  const [isPaused, setIsPaused] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [isHoveringProgress, setIsHoveringProgress] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [hasRenderedFrame, setHasRenderedFrame] = React.useState(false);

  // Play/pause based on isActive
  React.useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    if (!isActive) {
      el.pause();
      return;
    }

    if (!isPaused) {
      const p = el.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    }
  }, [isActive, isPaused]);

  // Update progress bar
  React.useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const onTimeUpdate = () => {
      if (!isDragging && el.duration > 0) {
        setProgress((el.currentTime / el.duration) * 100);
      }
    };

    el.addEventListener("timeupdate", onTimeUpdate);
    return () => el.removeEventListener("timeupdate", onTimeUpdate);
  }, [isDragging]);

  const togglePlayPause = () => {
    const el = videoRef.current;
    if (!el) return;

    if (el.paused) {
      el.play().catch(() => {});
      setIsPaused(false);
    } else {
      el.pause();
      setIsPaused(true);
    }
  };

  const seekToPosition = (clientX: number) => {
    const el = videoRef.current;
    const bar = progressRef.current;
    if (!el || !bar || !el.duration) return;

    const rect = bar.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = x / rect.width;
    el.currentTime = percent * el.duration;
    setProgress(percent * 100);
  };

  const onProgressMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    seekToPosition(e.clientX);
  };

  React.useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => {
      seekToPosition(e.clientX);
    };

    const onMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging]);

  const effectiveFit: "cover" | "contain" =
    project.videoFit ??
    (videoAspect != null && videoAspect > 1 /* landscape */ ? "contain" : "cover");

  // Show poster until the video has actually rendered a frame (mobile can fire canPlay early)
  const showPoster = Boolean(project.posterSrc) && !hasRenderedFrame && !videoError;

  return (
    <section className="relative h-full w-full bg-background">
      {/* On mobile: full bleed. On desktop: centered phone frame */}
      <div className="absolute inset-0 md:grid md:place-items-center md:px-2 md:py-4">
        <div
          className={[
            // Mobile: full viewport
            "relative h-full w-full",
            // Desktop: phone frame with aspect ratio
            "md:aspect-[9/16] md:w-[min(95vw,520px)] md:max-h-full md:h-auto md:rounded-[28px]",
            "overflow-hidden bg-black md:ring-1 md:ring-white/10 md:shadow-2xl",
            "transition-transform duration-300",
            isActive ? "scale-100" : "scale-[0.985]",
          ].join(" ")}
        >
          <video
            ref={videoRef}
            className={[
              "h-full w-full cursor-pointer",
              effectiveFit === "cover" ? "object-cover" : "object-contain",
            ].join(" ")}
            src={`${project.videoSrc}#t=0.001`}
            poster={project.posterSrc}
            muted
            loop
            playsInline
            preload="auto"
            onClick={togglePlayPause}
            onPlaying={() => setHasRenderedFrame(true)}
            onLoadedMetadata={() => {
              setVideoError(false);
              const el = videoRef.current;
              if (!el) return;
              
              const w = el.videoWidth ?? 0;
              const h = el.videoHeight ?? 0;
              if (w > 0 && h > 0) setVideoAspect(w / h);
              
              // Force first frame display on mobile
              el.currentTime = 0.001;
            }}
            onTimeUpdate={() => {
              const el = videoRef.current;
              if (!el) return;
              if (el.currentTime > 0) setHasRenderedFrame(true);
            }}
            onError={() => {
              setVideoError(true);
            }}
          />

          {/* Pause indicator */}
          {isPaused && !videoError && (
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
              <div className="w-20 h-20 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="white"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}

          {/* Poster/thumbnail - visible until we actually render frames */}
          {showPoster && (
            <img
              src={project.posterSrc!}
              alt={`${project.title} thumbnail`}
              className="absolute inset-0 z-[5] h-full w-full pointer-events-none"
              style={{ objectFit: effectiveFit }}
              loading="eager"
              decoding="async"
            />
          )}

          {/* Loading shimmer (only if no poster and we haven't rendered frames) */}
          {!project.posterSrc && !hasRenderedFrame && !videoError && (
            <div className="absolute inset-0 z-[5] bg-neutral-900">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
            </div>
          )}

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
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-black/25 to-transparent p-4 pb-8">
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

          {/* Progress bar */}
          <div
            ref={progressRef}
            className="absolute bottom-0 left-0 right-0 z-30 h-1 cursor-pointer group"
            onMouseEnter={() => setIsHoveringProgress(true)}
            onMouseLeave={() => !isDragging && setIsHoveringProgress(false)}
            onMouseDown={onProgressMouseDown}
          >
            {/* Background track */}
            <div className="absolute inset-0 bg-white/20" />
            {/* Filled progress */}
            <div
              className="absolute left-0 top-0 h-full bg-[#fe2c55] transition-[width] duration-75"
              style={{ width: `${progress}%` }}
            />
            {/* Hover/drag thumb */}
            {(isHoveringProgress || isDragging) && (
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg transition-transform"
                style={{ left: `calc(${progress}% - 6px)` }}
              />
            )}
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

