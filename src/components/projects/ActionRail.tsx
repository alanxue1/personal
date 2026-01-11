"use client";

import * as React from "react";
import type { Project } from "@/content/projects";
import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";
import { getIdSet, toggleIdInSet } from "@/lib/storage";

export type ActionRailProps = {
  project: Project;
  onOpenComments: () => void;
};

const LIKES_KEY = "portfolio:likes";
const BOOKMARKS_KEY = "portfolio:bookmarks";

export function ActionRail({ project, onOpenComments }: ActionRailProps) {
  const [mounted, setMounted] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [bookmarked, setBookmarked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(project.likeCountSeed ?? 0);

  React.useEffect(() => {
    setMounted(true);
    const likes = getIdSet(LIKES_KEY);
    const bookmarks = getIdSet(BOOKMARKS_KEY);
    setLiked(likes.has(project.id));
    setBookmarked(bookmarks.has(project.id));
  }, [project.id]);

  const toggleLike = () => {
    const next = toggleIdInSet(LIKES_KEY, project.id);
    setLiked(next);
    setLikeCount((c) => c + (next ? 1 : -1));
  };

  const toggleBookmark = () => {
    const next = toggleIdInSet(BOOKMARKS_KEY, project.id);
    setBookmarked(next);
  };

  const onShare = () => {
    // Spec: share button navigates to repo or project link.
    // Prefer explicit live/repo URLs if present, else shareUrl.
    const url = project.liveUrl ?? project.repoUrl ?? project.shareUrl;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center gap-5">
      <ActionButton
        label="Like"
        active={liked}
        onClick={toggleLike}
        icon={
          <Heart
            className={liked ? "fill-red-500 text-red-500" : "text-white"}
          />
        }
        count={likeCount}
      />
      <ActionButton
        label="Comment"
        onClick={onOpenComments}
        icon={<MessageCircle className="text-white" />}
        count={1}
      />
      <ActionButton
        label="Bookmark"
        active={bookmarked}
        onClick={toggleBookmark}
        icon={
          <Bookmark
            className={bookmarked ? "fill-[#face15] text-[#face15]" : "text-white"}
          />
        }
      />
      <ActionButton
        label="Share"
        onClick={onShare}
        icon={<Share2 className="text-white" />}
      />
    </div>
  );
}

function ActionButton({
  label,
  icon,
  count,
  active,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  count?: number;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="group flex w-14 flex-col items-center gap-1 select-none"
      onClick={onClick}
    >
      <span
        className={[
          "flex h-12 w-12 items-center justify-center rounded-full bg-black/35 backdrop-blur-md transition-transform",
          "group-active:scale-95",
          active ? "ring-2 ring-white/30" : "ring-1 ring-white/15",
        ].join(" ")}
      >
        <span className="h-6 w-6">{icon}</span>
      </span>
      {typeof count === "number" ? (
        <span className="text-xs font-medium text-white/90 tabular-nums">
          {formatCount(count)}
        </span>
      ) : null}
    </button>
  );
}

function formatCount(n: number) {
  if (n < 1000) return String(n);
  if (n < 1_000_000) return `${(n / 1000).toFixed(1).replace(/\\.0$/, "")}K`;
  return `${(n / 1_000_000).toFixed(1).replace(/\\.0$/, "")}M`;
}

