import type { Metadata } from "next";
import { Reels } from "@/components/projects/Reels";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects - Alan Xue",
  description: "Project demos and writeups.",
};

export default async function Projects({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = (await searchParams) ?? {};
  const projectParam = sp.project;
  const initialProjectId =
    typeof projectParam === "string"
      ? projectParam
      : Array.isArray(projectParam)
        ? projectParam[0]
        : undefined;

  return (
    <div className="dark flex-1 min-h-0">
      <Reels projects={projects} initialProjectId={initialProjectId} />
    </div>
  );
} 