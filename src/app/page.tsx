import Link from "next/link";
import Image from "next/image";
import { Grid3X3, Heart } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { projects } from "@/content/projects";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-black">
      {/* Scrollable content */}
      <div className="w-full max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col items-center pt-12 pb-6 px-4">
          {/* Avatar */}
          <div className="relative mb-5">
            <div className="w-28 h-28 rounded-full overflow-hidden ring-2 ring-zinc-700">
              <Image
                src="/pfp.png"
                alt="Alan Xue"
                width={112}
                height={112}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Username */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl font-bold text-white">@alanxue</span>
            <Image 
              src="/verified.png" 
              alt="Verified" 
              width={20} 
              height={20} 
              className="object-contain"
            />
          </div>

          {/* Display Name */}
          <p className="text-base text-zinc-400 mb-5">Alan Xue</p>

          {/* Stats Row */}
          <div className="flex items-center justify-center gap-10 mb-5">
            <div className="text-center cursor-pointer hover:opacity-70 transition-opacity">
              <p className="text-xl font-bold text-white">12</p>
              <p className="text-sm text-zinc-500">Following</p>
            </div>
            <div className="text-center cursor-pointer hover:opacity-70 transition-opacity">
              <p className="text-xl font-bold text-white">132.2K</p>
              <p className="text-sm text-zinc-500">Followers</p>
            </div>
            <div className="text-center cursor-pointer hover:opacity-70 transition-opacity">
              <p className="text-xl font-bold text-white">45.6M</p>
              <p className="text-sm text-zinc-500">Likes</p>
            </div>
          </div>

          {/* Bio */}
          <div className="text-center px-6 mb-5 max-w-md">
            <p className="text-base text-zinc-300 leading-relaxed mb-2">
              Product Engineer @{" "}
              <a
                href="https://houndarchives.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-block font-semibold text-white hover:text-cyan-300 transition-colors group"
              >
                <span className="relative z-10">hound.ac</span>
                {/* Underline - always visible, animated streak on hover */}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-zinc-700 overflow-hidden">
                  <span className="absolute inset-0 w-1/3 animate-shimmer bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </a>
              <span className="text-zinc-400"> | 230k+ on ig</span>
            </p>
            <p className="text-base text-zinc-300 leading-relaxed">
              SWE @{" "}
              <a
                href="https://www.mcmaster.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-block font-semibold text-white hover:text-cyan-400 transition-colors group"
              >
                <span className="relative z-10">McMaster University</span>
                {/* Underline - always visible, animated streak on hover */}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-zinc-700 overflow-hidden">
                  <span className="absolute inset-0 w-1/3 animate-shimmer bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </a>
            </p>
          </div>

          {/* See Demos Button with BorderBeam */}
          <div className="relative inline-block overflow-hidden rounded-md mb-5">
            <Link
              href="/projects"
              className="relative z-10 inline-flex items-center gap-2 px-8 py-3 bg-[#fe2c55] text-white text-base font-semibold rounded-md transition-all duration-200 hover:bg-[#ff1a47] hover:scale-105 hover:shadow-lg hover:shadow-[#fe2c55]/30 focus-visible:scale-105 focus-visible:shadow-lg active:scale-95"
            >
              See Demos
            </Link>
            <BorderBeam
              duration={6}
              size={80}
              borderWidth={2}
              colorFrom="transparent"
              colorTo="rgba(255, 255, 255, 0.4)"
            />
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/alanxue1"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 transition-all duration-200 hover:text-white hover:bg-zinc-600 hover:scale-110 focus-visible:scale-110 focus-visible:bg-zinc-600 active:scale-95"
              aria-label="GitHub"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/alanxue1/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 transition-all duration-200 hover:text-white hover:bg-zinc-600 hover:scale-110 focus-visible:scale-110 focus-visible:bg-zinc-600 active:scale-95"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://twitter.com/alanxue_"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 transition-all duration-200 hover:text-white hover:bg-zinc-600 hover:scale-110 focus-visible:scale-110 focus-visible:bg-zinc-600 active:scale-95"
              aria-label="Twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="mailto:xuealan101@gmail.com"
              className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 transition-all duration-200 hover:text-white hover:bg-zinc-600 hover:scale-110 focus-visible:scale-110 focus-visible:bg-zinc-600 active:scale-95"
              aria-label="Email"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-zinc-800 sticky top-0 bg-black z-10">
          <Link
            href="/projects"
            className="flex-1 flex items-center justify-center gap-2 py-4 text-white border-b-2 border-white hover:bg-zinc-900 transition-colors"
          >
            <Grid3X3 className="w-6 h-6" />
          </Link>
          <button
            className="flex-1 flex items-center justify-center gap-2 py-4 text-zinc-500 hover:bg-zinc-900 transition-colors cursor-not-allowed"
            disabled
          >
            <Heart className="w-6 h-6" />
          </button>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-3 gap-1 p-1">
          {projects.map((project, idx) => (
            <Link
              key={project.id}
              href={`/projects?project=${project.id}`}
              className="relative aspect-[9/16] bg-zinc-900 overflow-hidden group cursor-pointer"
            >
              <img
                src={project.posterSrc}
                alt={`${project.title} thumbnail`}
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="eager"
                decoding="async"
              />
              {/* Pinned badge - only on first video */}
              {idx === 0 && (
                <div className="absolute top-2 left-2 z-10 pointer-events-none">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-md bg-[#fe2c55] text-white text-xs font-semibold">
                    Pinned
                  </span>
                </div>
              )}
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              {/* Play count indicator */}
              <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-sm drop-shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span className="font-medium">
                  {project.likeCountSeed
                    ? (project.likeCountSeed * 12.5 / 1000).toFixed(1) + "K"
                    : "0"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
