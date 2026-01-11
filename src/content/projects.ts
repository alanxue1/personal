export type Project = {
  id: string;
  title: string;
  subtitle?: string;
  videoSrc: string;
  posterSrc?: string;
  /**
   * How the video should be fit into the 9:16 phone frame.
   * - cover: TikTok-style crop to fill the frame
   * - contain: show the whole landscape video (letterbox/pillarbox)
   */
  videoFit?: "cover" | "contain";
  tags: string[];
  shareUrl: string;
  repoUrl?: string;
  liveUrl?: string;
  authorHandle: string;
  authorComment: string;
  likeCountSeed?: number;
};

export const projects: Project[] = [
  {
    id: "royale-wager",
    title: "Royale Wager",
    subtitle: "Gambling for Clash Royale",
    videoSrc: "/videos/royale-wager.mp4",
    videoFit: "contain",
    tags: ["Ruby on Rails", "React", "Solana", "Rust", "Privy"],
    shareUrl: "https://github.com/alanxue1/royalewager",
    repoUrl: "https://github.com/alanxue1/royalewager",
    authorHandle: "alanxue",
    authorComment:
      "Engineered a trustless wagering platform for Clash Royale matches. Built a custom Oracle in Ruby on Rails to bridge real-world game results via the Clash Royale API, automating on-chain wager settlement.",
    likeCountSeed: 40700,
  },
  {
    id: "layoff-evaders",
    title: "Layoff Evaders",
    subtitle: "VR Fitness @ DeltaHacks XI",
    // NOTE: file must exist at `public/videos/layoff-evaders.mp4` (non-zero bytes).
    videoSrc: "/videos/layoff-evaders.mp4",
    videoFit: "contain",
    tags: ["C#", "Unity", "Python", "Firebase", "Cohere"],
    shareUrl: "https://github.com/martin226/layoffevaders",
    repoUrl: "https://github.com/martin226/layoffevaders",
    authorHandle: "alanxue",
    authorComment:
      "Awarded 2nd place at DeltaHacks XI 🏆. Developed a fitness game that tracks and displays stats in real-time as well as an AI chat-bot using Cohere's API. Designed the game physics/logic and immersive VR mechanics.",
    likeCountSeed: 3188,
  },
];

