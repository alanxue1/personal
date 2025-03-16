const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 dark:bg-gray-900 py-6 mt-12">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="flex gap-6 mb-4">
          <a 
            href="https://github.com/yourusername" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a 
            href="https://linkedin.com/in/yourusername" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a 
            href="https://twitter.com/yourusername" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            Twitter
          </a>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Your Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer; 