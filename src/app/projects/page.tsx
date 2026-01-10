import type { Metadata } from "next";
import { Reels } from "@/components/projects/Reels";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects - Alan Xue",
  description: "Project demos and writeups.",
};

export default function Projects() {
  return (
    <div className="flex-1 min-h-0">
      <Reels projects={projects} />
    </div>
  );
} 