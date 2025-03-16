import { AuroraText } from "@/components/magicui/aurora-text";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-160px)]">
      <h1 className="flex flex-wrap items-baseline">
        <span className="text-black dark:text-white text-[3.5rem] font-bold">Coming</span>
        <span className="w-5"></span>
        <div className="transform -translate-y-2.5">
          <AuroraText className="text-[3.8rem] font-bold">
            Soon
          </AuroraText>
        </div>
      </h1>
    </div>
  );
}
