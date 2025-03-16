import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - Your Name",
  description: "Check out my portfolio of projects and work",
};

// Define a Project type
type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  link?: string;
  github?: string;
};

// Sample projects data
const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-stack e-commerce platform with product listings, shopping cart, and secure payment processing.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    github: "https://github.com/yourusername/ecommerce",
    link: "https://project-example.com"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A productivity app for managing tasks with drag-and-drop functionality and team collaboration features.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
    github: "https://github.com/yourusername/tasks",
    link: "https://project-example.com"
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Real-time weather information with interactive maps and forecast data from multiple sources.",
    technologies: ["React", "Weather API", "Chart.js", "Mapbox"],
    github: "https://github.com/yourusername/weather",
    link: "https://project-example.com"
  },
  {
    id: 4,
    title: "Blog Platform",
    description: "A content management system with markdown support and user authentication.",
    technologies: ["Next.js", "MDX", "Auth.js", "Tailwind CSS"],
    github: "https://github.com/yourusername/blog",
    link: "https://project-example.com"
  },
  {
    id: 5,
    title: "Social Media Dashboard",
    description: "An analytics dashboard that aggregates data from various social media platforms.",
    technologies: ["React", "D3.js", "Social Media APIs", "Redux"],
    github: "https://github.com/yourusername/social-dashboard",
    link: "https://project-example.com"
  },
  {
    id: 6,
    title: "Fitness Tracker",
    description: "A mobile-responsive application for tracking workouts and nutrition with progress visualization.",
    technologies: ["React Native", "Firebase", "Chart.js", "Node.js"],
    github: "https://github.com/yourusername/fitness",
    link: "https://project-example.com"
  }
];

export default function Projects() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">My Projects</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 text-center max-w-3xl mx-auto">
        Here are some of the projects I've worked on. Each project showcases different skills
        and technologies from my toolkit.
      </p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div 
            key={project.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="h-48 bg-gray-300 dark:bg-gray-700 relative">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                  Project Preview
                </div>
              )}
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {project.description}
              </p>
              
              <div className="mb-4 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-4 mt-4">
                {project.link && (
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    Live Demo
                  </a>
                )}
                {project.github && (
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:underline font-medium"
                  >
                    View Code
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Want to work together?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
        </p>
        <Link
          href="/contact"
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors inline-block"
        >
          Contact Me
        </Link>
      </div>
    </div>
  );
} 