"use client";

import * as React from "react";
import type { Project } from "@/content/projects";

// Detect mobile/touch device
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => {
      setIsMobile(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          window.matchMedia("(pointer: coarse)").matches
      );
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export type ReelCardProps = {
  project: Project;
  isActive: boolean;
  isNearby?: boolean;
  onVideoClick?: () => void;
  children?: React.ReactNode;
};

export function ReelCard({ project, isActive, isNearby = false, children }: ReelCardProps) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const progressRef = React.useRef<HTMLDivElement | null>(null);
  const [videoError, setVideoError] = React.useState(false);
  const [videoAspect, setVideoAspect] = React.useState<number | null>(null);
  const [isFullQuality, setIsFullQuality] = React.useState(!project.videoPreviewSrc);
  const [fullQualityBlobUrl, setFullQualityBlobUrl] = React.useState<string | null>(null);
  const [isPaused, setIsPaused] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [isHoveringProgress, setIsHoveringProgress] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [hasRenderedFrame, setHasRenderedFrame] = React.useState(false);
  const [isBuffering, setIsBuffering] = React.useState(true);
  const [isFastForwarding, setIsFastForwarding] = React.useState(false);
  const [repostAvatarError, setRepostAvatarError] = React.useState(false);

  const isMobile = useIsMobile();
  const previousPlaybackRateRef = React.useRef(1.0);
  const hapticTriggeredRef = React.useRef(false);
  const fastForwardDelayRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const restorePlaybackRef = React.useRef<{ time: number; shouldResume: boolean } | null>(null);
  const fullQualityBlobUrlRef = React.useRef<string | null>(null);
  const repostedBy = project.repostedBy ?? null;

  const FAST_FORWARD_DELAY_MS = 300; // Delay before activating fast-forward to prevent accidental activation during scrolling
  const preferredFullSrc = React.useMemo(() => {
    if (!project.videoWebmSrc) return project.videoSrc;
    if (typeof document === "undefined") return project.videoSrc;
    const probe = document.createElement("video");
    const canPlayWebm =
      probe.canPlayType('video/webm; codecs="vp9"') !== "" ||
      probe.canPlayType("video/webm") !== "";
    return canPlayWebm ? project.videoWebmSrc : project.videoSrc;
  }, [project.videoSrc, project.videoWebmSrc]);
  const activeSrc =
    fullQualityBlobUrl ??
    (isFullQuality || !project.videoPreviewSrc ? preferredFullSrc : project.videoPreviewSrc);
  const shouldAttachSrc = isActive || isNearby;
  const videoSrc = shouldAttachSrc ? `${activeSrc}#t=0.001` : undefined;
  const preloadMode: "auto" | "metadata" | "none" = isActive
    ? "auto"
    : isNearby
      ? "metadata"
      : "none";

  React.useEffect(() => {
    fullQualityBlobUrlRef.current = fullQualityBlobUrl;
  }, [fullQualityBlobUrl]);

  React.useEffect(() => {
    if (!isActive || !project.videoPreviewSrc || isFullQuality) return;

    const controller = new AbortController();
    let cancelled = false;

    fetch(preferredFullSrc, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`failed to fetch full quality video (${response.status})`);
        }
        return response.blob();
      })
      .then((blob) => {
        if (cancelled) return;
        const nextBlobUrl = URL.createObjectURL(blob);
        const el = videoRef.current;
        if (el) {
          restorePlaybackRef.current = {
            time: el.currentTime,
            shouldResume: isActive && !el.paused,
          };
        }

        const previousBlobUrl = fullQualityBlobUrlRef.current;
        if (previousBlobUrl) URL.revokeObjectURL(previousBlobUrl);
        fullQualityBlobUrlRef.current = nextBlobUrl;
        setFullQualityBlobUrl(nextBlobUrl);
        setIsFullQuality(true);
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        // Fall back to direct full-quality network source if blob prefetch fails.
        setIsFullQuality(true);
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [isActive, isFullQuality, preferredFullSrc, project.videoPreviewSrc]);

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

  // Fast-forward gesture handlers (mobile only)
  const startFastForward = React.useCallback(() => {
    const el = videoRef.current;
    if (!el || !isMobile) return;

    // Store previous rate and set 2x
    previousPlaybackRateRef.current = el.playbackRate;
    el.playbackRate = 2.0;
    setIsFastForwarding(true);

    // Trigger haptic feedback once
    if (!hapticTriggeredRef.current) {
      hapticTriggeredRef.current = true;
      if ("vibrate" in navigator) {
        navigator.vibrate(10); // Short 10ms vibration
      }
    }
  }, [isMobile]);

  const stopFastForward = React.useCallback(() => {
    const el = videoRef.current;
    if (!el) return;

    el.playbackRate = previousPlaybackRateRef.current;
    setIsFastForwarding(false);
    hapticTriggeredRef.current = false;
  }, []);

  const cancelFastForwardDelay = React.useCallback(() => {
    if (fastForwardDelayRef.current) {
      clearTimeout(fastForwardDelayRef.current);
      fastForwardDelayRef.current = null;
    }
  }, []);

  // Touch event handlers for fast-forward zone
  const onFastForwardTouchStart = React.useCallback(
    (e: React.TouchEvent | React.PointerEvent) => {
      e.stopPropagation();
      // Start a delayed activation to avoid triggering during scroll gestures
      cancelFastForwardDelay();
      fastForwardDelayRef.current = setTimeout(() => {
        startFastForward();
      }, FAST_FORWARD_DELAY_MS);
    },
    [startFastForward, cancelFastForwardDelay]
  );

  const onFastForwardTouchEnd = React.useCallback(
    (e: React.TouchEvent | React.PointerEvent) => {
      e.stopPropagation();
      cancelFastForwardDelay();
      stopFastForward();
    },
    [stopFastForward, cancelFastForwardDelay]
  );

  // Cleanup: reset playback rate when component unmounts
  React.useEffect(() => {
    const videoElement = videoRef.current;
    return () => {
      cancelFastForwardDelay();
      const currentBlobUrl = fullQualityBlobUrlRef.current;
      if (currentBlobUrl) URL.revokeObjectURL(currentBlobUrl);
      if (videoElement) videoElement.playbackRate = 1.0;
    };
  }, [cancelFastForwardDelay]);

  // Reset playback rate when video becomes inactive
  React.useEffect(() => {
    if (!isActive) {
      cancelFastForwardDelay();
      const el = videoRef.current;
      if (el) el.playbackRate = 1.0;
      setIsFastForwarding(false);
      hapticTriggeredRef.current = false;
    }
  }, [isActive, cancelFastForwardDelay]);

  React.useEffect(() => {
    setRepostAvatarError(false);
  }, [repostedBy?.avatarSrc]);

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
            src={videoSrc}
            poster={project.posterSrc}
            muted
            loop
            playsInline
            preload={preloadMode}
            onClick={togglePlayPause}
            onPlaying={() => {
              setHasRenderedFrame(true);
              setIsBuffering(false);
            }}
            onCanPlay={() => {
              setIsBuffering(false);
            }}
            onWaiting={() => {
              setIsBuffering(true);
            }}
            onLoadedMetadata={() => {
              setVideoError(false);
              const el = videoRef.current;
              if (!el) return;
              
              const w = el.videoWidth ?? 0;
              const h = el.videoHeight ?? 0;
              if (w > 0 && h > 0) setVideoAspect(w / h);

              const restore = restorePlaybackRef.current;
              if (restore) {
                const maxTime = el.duration > 0 ? Math.max(0.001, el.duration - 0.001) : restore.time;
                el.currentTime = Math.min(Math.max(0.001, restore.time), maxTime);
                if (restore.shouldResume) {
                  const playPromise = el.play();
                  if (playPromise && typeof playPromise.catch === "function") {
                    playPromise.catch(() => {});
                  }
                }
                restorePlaybackRef.current = null;
              } else {
                // Force first frame display on mobile.
                el.currentTime = 0.001;
              }
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

          {isBuffering && !videoError && !isPaused && (
            <div className="pointer-events-none absolute inset-0 z-20 grid place-items-center">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-black/45 backdrop-blur-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6 animate-spin text-white"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    className="opacity-25"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    d="M12 3a9 9 0 0 1 9 9"
                    className="opacity-100"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
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
              {repostedBy ? (
                <div className="mb-2">
                  <div className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-1.5 text-[13px] font-semibold leading-4 text-black shadow-sm">
                    {repostAvatarError || !repostedBy.avatarSrc ? (
                      <span className="grid h-4 w-4 place-items-center rounded-full bg-[#d1d1d2]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="h-3 w-3 text-white"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z" />
                        </svg>
                      </span>
                    ) : (
                      <img
                        src={repostedBy.avatarSrc}
                        alt={`${repostedBy.name} profile`}
                        className="h-4 w-4 shrink-0 rounded-full object-cover"
                        onError={() => setRepostAvatarError(true)}
                        loading="eager"
                        decoding="async"
                      />
                    )}
                    <span className="whitespace-nowrap">{repostedBy.name} reposted</span>
                  </div>
                </div>
              ) : null}
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

          {/* Fast-forward gesture zone (mobile only, rightmost 25%) */}
          {isMobile && (
            <div
              className="absolute top-0 right-0 h-full w-1/4 z-[15] select-none"
              style={{
                WebkitTouchCallout: "none",
                WebkitUserSelect: "none",
                touchAction: "manipulation",
              }}
              onTouchStart={(e) => {
                e.preventDefault();
                onFastForwardTouchStart(e);
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                onFastForwardTouchEnd(e);
              }}
              onTouchCancel={onFastForwardTouchEnd}
              onPointerDown={onFastForwardTouchStart}
              onPointerUp={onFastForwardTouchEnd}
              onPointerLeave={onFastForwardTouchEnd}
              onPointerCancel={onFastForwardTouchEnd}
              onContextMenu={(e) => e.preventDefault()}
              aria-hidden="true"
            />
          )}

          {/* Fast-forward indicator (only show when playing) */}
          {isFastForwarding && !isPaused && (
            <div className="absolute bottom-44 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="white"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" />
                </svg>
                <span className="text-xs font-medium text-white">2x</span>
              </div>
            </div>
          )}

          {/* Actions slot (pinned to the phone frame, not the whole screen) */}
          <div className="absolute bottom-36 right-2 z-20 pointer-events-auto">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

