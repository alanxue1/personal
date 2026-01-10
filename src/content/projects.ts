export type Project = {
  id: string;
  title: string;
  subtitle?: string;
  videoSrc: string;
  posterSrc?: string;
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
    subtitle: "Solana wagering for Clash Royale",
    videoSrc: "/videos/royale-wager.mp4",
    tags: ["Ruby on Rails", "React", "Solana", "Rust", "Privy"],
    shareUrl: "https://github.com/alanxue1",
    repoUrl: "https://github.com/alanxue1",
    authorHandle: "alanxue",
    authorComment:
      "Engineered a trustless wagering platform for Clash Royale matches. Built a custom Oracle in Ruby on Rails to bridge real-world game results via the Clash Royale API, automating on-chain wager settlement.",
    likeCountSeed: 40700,
  },
  {
    id: "layoff-evaders",
    title: "Layoff Evaders",
    subtitle: "VR Fitness @ DeltaHacks XI",
    videoSrc: "/videos/layoff-evaders.mp4",
    tags: ["C#", "Unity", "Python", "Firebase", "Cohere"],
    shareUrl: "https://github.com/alanxue1",
    repoUrl: "https://github.com/alanxue1",
    authorHandle: "alanxue",
    authorComment:
      "Awarded 2nd place at DeltaHacks XI. Developed a fitness game that tracks and displays stats in real-time as well as an AI chat-bot using Cohere's API. Designed the game physics/logic and immersive VR mechanics.",
    likeCountSeed: 3188,
  },
  {
    id: "navicart",
    title: "NaviCart",
    subtitle: "Accessibility app for shoppers",
    videoSrc: "/videos/navicart.mp4",
    tags: ["TypeScript", "React Native", "Firebase", "Gemini", "Mappedin"],
    shareUrl: "https://github.com/alanxue1",
    repoUrl: "https://github.com/alanxue1",
    authorHandle: "alanxue",
    authorComment:
      "Designed a smart accessibility app that empowers visually impaired shoppers using audio guidance. Used Gemini's API for item categorization and Mappedin for precise indoor wayfinding.",
    likeCountSeed: 1520,
  },
];

