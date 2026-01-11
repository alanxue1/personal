"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import type { Project } from "@/content/projects";
import { ReelCard } from "@/components/projects/ReelCard";
import { ActionRail } from "@/components/projects/ActionRail";
import { CommentsPanel } from "@/components/projects/CommentsPanel";

export type ReelsProps = {
  projects: Project[];
  initialProjectId?: string;
  renderActions?: (project: Project, idx: number, isActive: boolean) => React.ReactNode;
};

const WHEEL_LOCK_MS = 650;
const WHEEL_THRESHOLD = 45;
const SWIPE_THRESHOLD = 60;

export function Reels({ projects, initialProjectId, renderActions }: ReelsProps) {
  const router = useRouter();
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const itemRefs = React.useRef<Array<HTMLElement | null>>([]);

  const initialIndex = React.useMemo(() => {
    if (!initialProjectId) return 0;
    const idx = projects.findIndex((p) => p.id === initialProjectId);
    return idx >= 0 ? idx : 0;
  }, [initialProjectId, projects]);

  const [activeIndex, setActiveIndex] = React.useState(initialIndex);
  const [commentsOpen, setCommentsOpen] = React.useState(false);
  const [commentsProjectId, setCommentsProjectId] = React.useState<string | null>(
    null,
  );
  const activeIndexRef = React.useRef(0);
  const lockedRef = React.useRef(false);
  const wheelAccumRef = React.useRef(0);
  const touchStartYRef = React.useRef<number | null>(null);
  const touchStartXRef = React.useRef<number | null>(null);

  const scrollToIndex = React.useCallback((next: number) => {
    const clamped = Math.max(0, Math.min(projects.length - 1, next));
    const el = itemRefs.current[clamped];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveIndex(clamped);
    activeIndexRef.current = clamped;
  }, [projects.length]);

  React.useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  React.useEffect(() => {
    // If the URL selects a specific project, align state immediately.
    activeIndexRef.current = initialIndex;
    setActiveIndex(initialIndex);
  }, [initialIndex]);

  // Disable Chrome's scroll restoration and reset scroll on mount
  React.useEffect(() => {
    // Disable browser scroll restoration (Chrome specific fix)
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    
    const root = scrollerRef.current;
    
    // Immediately reset all scroll positions
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (root) root.scrollTop = 0;
    
    // Use setTimeout to ensure this runs after Chrome's scroll restoration attempt
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      if (root) root.scrollTop = 0;
      
      const el = itemRefs.current[initialIndex];
      if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
    }, 0);
    
    return () => {
      clearTimeout(timeoutId);
      // Restore default scroll restoration on unmount
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "auto";
      }
    };
  }, [initialIndex]);

  React.useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // Pick most visible.
        let bestIdx = activeIndexRef.current;
        let bestRatio = 0;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const idx = Number((e.target as HTMLElement).dataset.index ?? "0");
          if (e.intersectionRatio > bestRatio) {
            bestRatio = e.intersectionRatio;
            bestIdx = idx;
          }
        }
        if (bestRatio > 0.6 && bestIdx !== activeIndexRef.current) {
          activeIndexRef.current = bestIdx;
          setActiveIndex(bestIdx);
        }
      },
      {
        root,
        threshold: [0.35, 0.6, 0.8],
      },
    );

    itemRefs.current.forEach((el) => {
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const lock = () => {
      lockedRef.current = true;
      window.setTimeout(() => {
        lockedRef.current = false;
      }, WHEEL_LOCK_MS);
    };

    const onWheel = (e: WheelEvent) => {
      // Only lock on intended vertical scroll.
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      e.preventDefault();
      if (lockedRef.current) return;

      wheelAccumRef.current += e.deltaY;
      if (Math.abs(wheelAccumRef.current) < WHEEL_THRESHOLD) return;

      const dir = wheelAccumRef.current > 0 ? 1 : -1;
      wheelAccumRef.current = 0;
      lock();
      scrollToIndex(activeIndexRef.current + dir);
    };

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      touchStartYRef.current = t.clientY;
      touchStartXRef.current = t.clientX;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const startY = touchStartYRef.current;
      const startX = touchStartXRef.current;
      touchStartYRef.current = null;
      touchStartXRef.current = null;
      if (startY == null || startX == null) return;

      const t = e.changedTouches[0];
      if (!t) return;

      const dy = t.clientY - startY;
      const dx = t.clientX - startX;
      if (Math.abs(dy) < Math.abs(dx)) return;
      if (Math.abs(dy) < SWIPE_THRESHOLD) return;
      if (lockedRef.current) return;

      lock();
      scrollToIndex(activeIndexRef.current + (dy < 0 ? 1 : -1));
    };

    root.addEventListener("wheel", onWheel, { passive: false });
    root.addEventListener("touchstart", onTouchStart, { passive: true });
    root.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      root.removeEventListener("wheel", onWheel);
      root.removeEventListener("touchstart", onTouchStart);
      root.removeEventListener("touchend", onTouchEnd);
    };
  }, [scrollToIndex]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      scrollToIndex(activeIndexRef.current + 1);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      scrollToIndex(activeIndexRef.current - 1);
    }
    if (e.key === "Escape") {
      router.push("/");
    }
  };

  const openComments = (project: Project) => {
    setCommentsProjectId(project.id);
    setCommentsOpen(true);
  };

  const commentsProject =
    commentsProjectId == null
      ? null
      : projects.find((p) => p.id === commentsProjectId) ?? null;

  return (
    <>
      <div className="fixed inset-0 w-full bg-background overflow-hidden">
        <Link
          href="/"
          className="fixed top-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border text-foreground hover:bg-background/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Back to home"
        >
          <X className="h-7 w-7" />
        </Link>
        <div
          ref={scrollerRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="h-full w-full overflow-y-scroll overscroll-contain outline-none snap-y snap-mandatory scroll-smooth"
          aria-label="Projects reels"
        >
          {projects.map((p, idx) => (
            <div
              key={p.id}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              data-index={idx}
              className="h-[100dvh] snap-start snap-always"
            >
              <ReelCard project={p} isActive={idx === activeIndex}>
                {renderActions ? (
                  renderActions(p, idx, idx === activeIndex)
                ) : (
                  <ActionRail project={p} onOpenComments={() => openComments(p)} />
                )}
              </ReelCard>
            </div>
          ))}
        </div>
      </div>

      <CommentsPanel
        open={commentsOpen}
        project={commentsProject}
        onClose={() => {
          setCommentsOpen(false);
          // Re-center current video after comments close
          requestAnimationFrame(() => {
            const el = itemRefs.current[activeIndexRef.current];
            if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
          });
        }}
      />
    </>
  );
}

