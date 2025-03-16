import { AuroraText } from "@/components/magicui/aurora-text";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <h1 className="flex items-baseline text-4xl md:text-6xl font-bold">
        <span className="text-black dark:text-white">Coming</span>
        <span className="w-6 md:w-5"></span>
        <div className="transform translate-y-0.5 md:translate-y-0">
          <AuroraText>
            Soon
          </AuroraText>
        </div>
      </h1>
    </div>
  );
}
