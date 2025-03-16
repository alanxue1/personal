import Link from 'next/link';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 w-full bg-white/80 dark:bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
          Your Name
        </Link>
        
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 