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
  authorThread?: string[];
  likeCountSeed?: number;
  repostedBy?: {
    name: string;
    avatarSrc: string;
  };
};

export const projects: Project[] = [
  {
    id: "royale-wager",
    title: "Royale Wager",
    subtitle: "Gambling for Clash Royale",
    videoSrc: "/videos/royale-wager.mp4",
    posterSrc: "/videos/royale-wager.png",
    videoFit: "contain",
    tags: ["Ruby on Rails", "React", "Solana", "Rust", "Privy"],
    shareUrl: "https://github.com/alanxue1/royalewager",
    repoUrl: "https://github.com/alanxue1/royalewager",
    authorHandle: "alanxue",
    authorComment: "Trustless Clash Royale wagering on Solana.",
    repostedBy: {
      name: "Supercell",
      avatarSrc: "/reposted-by/supercell.webp",
    },
    authorThread: [
      "🤑 Clash Royale gambling",
      "Bet on matches with the native $ROYALE token through a decentralized Solana escrow program built in Rust/Anchor.",
      "$300K+ wagered on-chain by 4.4K+ users",
      "Custom Ruby on Rails Oracle bridges real game results via the Clash Royale API, automating on-chain wager settlement from match to payout.",
    ],
    likeCountSeed: 40700,
  },
  {
    id: "deja-view",
    title: "Deja View",
    subtitle: "Pinterest to 3D room previews",
    videoSrc: "/videos/deja-view.mp4",
    posterSrc: "/videos/deja-view.png",
    videoFit: "contain",
    tags: ["Next.js", "Three.js", "Gemini", "Replicate", "FastAPI"],
    shareUrl: "https://github.com/alanxue1/deja-view",
    repoUrl: "https://github.com/alanxue1/deja-view",
    authorHandle: "alanxue",
    authorComment: "AI-powered Pinterest to 3D room visualization.",
    repostedBy: {
      name: "Shopify",
      avatarSrc: "/reposted-by/shopify.jpg",
    },
    authorThread: [
      "🪄 Pinterest board → 3D room preview",
      "Extracts furniture from Pinterest boards using Gemini vision models, generates 3D .glb models through Replicate Trellis, and drops them into a real-time Three.js room scene.",
      "Product matching engine crawls Shopify storefronts via Google Custom Search API with intent-based ranking and deduplication - surfaces actual purchasable alternatives for every extracted item.",
      "Full-stack pipeline: async job queuing (FastAPI), Cloudflare R2 for generated assets, MongoDB persistence, and a polished Next.js frontend with Clerk auth + Framer Motion.",
    ],
    likeCountSeed: 19500,
  },
  {
    id: "bio-pilot",
    title: "BioPilot",
    subtitle: "Drone crop analytics",
    videoSrc: "/videos/bio-pilot.mp4",
    posterSrc: "/videos/bio-pilot.png",
    videoFit: "contain",
    tags: ["TypeScript", "Python", "YOLOv8", "MapLibre", "deck.gl"],
    shareUrl: "https://github.com/alanxue1/bio-pilot",
    repoUrl: "https://github.com/alanxue1/bio-pilot",
    authorHandle: "alanxue",
    authorComment: "AI crop analytics from drone imagery.",
    repostedBy: {
      name: "TELUS",
      avatarSrc: "/reposted-by/telus.png",
    },
    authorThread: [
      "🏆 $5,000 & 2nd place @ TELUS AI Hackathon",
      "AI-powered crop analytics platform: upload drone imagery, get back actionable insights for agricultural management.",
    ],
    likeCountSeed: 11200,
  },
  {
    id: "layoff-evaders",
    title: "Layoff Evaders",
    subtitle: "VR Fitness @ DeltaHacks XI",
    // NOTE: file must exist at `public/videos/layoff-evaders.mp4` (non-zero bytes).
    videoSrc: "/videos/layoff-evaders.mp4",
    posterSrc: "/videos/layoff-evaders.png",
    videoFit: "contain",
    tags: ["C#", "Unity", "Python", "Firebase", "Cohere"],
    shareUrl: "https://github.com/martin226/layoffevaders",
    repoUrl: "https://github.com/martin226/layoffevaders",
    authorHandle: "alanxue",
    authorComment: "VR fitness game built at DeltaHacks XI.",
    repostedBy: {
      name: "Subway Surfers",
      avatarSrc: "/reposted-by/subway-surfers.webp",
    },
    authorThread: [
      "🥈 2nd place @ DeltaHacks XI - out of 497 participants",
      "VR fitness game with real-time stat tracking and an AI chatbot powered by Cohere.",
      "Custom game physics blending real-world body movements with immersive VR mechanics: exercise that doesn't feel like exercise.",
    ],
    likeCountSeed: 3188,
  },
];

