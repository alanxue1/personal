import { MorphingText } from "@/components/magicui/morphing-text";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] px-4">
      <div className="w-full max-w-screen-md">
        <MorphingText 
          texts={["coming soon","alanxue.ca","2025"]} 
          className="text-[2.5rem] sm:text-[3.8rem] font-bold h-16 sm:h-20 lg:h-32" 
        />
      </div>
    </div>
  );
}
