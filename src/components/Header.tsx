import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/70 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-5">
        <nav aria-label="Primary">
          <ul className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="hover:text-foreground transition-colors"
              >
                Projects
              </Link>
            </li>
            <li className="ml-1">
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 