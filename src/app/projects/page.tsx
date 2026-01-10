import type { Metadata } from "next";
import { Reels } from "@/components/projects/Reels";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects - Alan Xue",
  description: "Project demos and writeups.",
};

export default function Projects() {
  return (
    <div className="h-full">
      <Reels projects={projects} />
    </div>
  );
} 