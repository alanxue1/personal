"use client";

import * as React from "react";
import Image from "next/image";
import type { Project } from "@/content/projects";

export type CommentsPanelProps = {
  open: boolean;
  project: Project | null;
  onClose: () => void;
};

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = React.useState(false);
  React.useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const apply = () => setIsDesktop(mql.matches);
    apply();
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, []);
  return isDesktop;
}

export function CommentsPanel({ open, project, onClose }: CommentsPanelProps) {
  const isDesktop = useIsDesktop();

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open || !project) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        aria-label="Close comments"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Desktop side sheet */}
      {isDesktop ? (
        <aside className="absolute right-0 top-0 h-full w-[380px] max-w-[85vw] border-l border-border bg-background shadow-xl">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="text-sm font-medium">Comments</p>
            <button
              type="button"
              className="rounded-md px-2 py-1 text-sm text-muted-foreground hover:text-foreground"
              onClick={onClose}
            >
              Close
            </button>
          </div>
          <div className="p-4">
            <Comment project={project} />
          </div>
        </aside>
      ) : (
        // Mobile bottom sheet
        <aside className="absolute inset-x-0 bottom-0 h-[70vh] rounded-t-2xl border-t border-border bg-background shadow-2xl">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-10 rounded-full bg-muted" />
              <p className="text-sm font-medium">Comments</p>
            </div>
            <button
              type="button"
              className="rounded-md px-2 py-1 text-sm text-muted-foreground hover:text-foreground"
              onClick={onClose}
            >
              Close
            </button>
          </div>
          <div className="h-[calc(70vh-52px)] overflow-y-auto p-4">
            <Comment project={project} />
          </div>
        </aside>
      )}
    </div>
  );
}

function Comment({ project }: { project: Project }) {
  return (
    <div className="flex gap-3">
      <Image
        src="/pfp.png"
        alt={`${project.authorHandle}'s profile`}
        width={40}
        height={40}
        className="h-10 w-10 shrink-0 rounded-full object-cover"
      />
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <p className="text-sm font-medium">@{project.authorHandle}</p>
          <p className="text-xs text-muted-foreground">pinned • 1d</p>
        </div>
        <p className="mt-1 text-sm text-foreground">{project.authorComment}</p>
        <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
          <span>Reply</span>
          <span>Share</span>
          <span>Like</span>
        </div>
      </div>
    </div>
  );
}

