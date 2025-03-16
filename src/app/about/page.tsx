import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Your Name",
  description: "Learn more about me and my background",
};

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">About Me</h1>
      
      <div className="grid md:grid-cols-3 gap-12 mb-12">
        <div className="md:col-span-1">
          <div className="sticky top-24">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-6">
              <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                Your Photo
              </div>
              {/* Uncomment when you have an image
              <Image
                src="/profile.jpg"
                alt="Your Name"
                fill
                style={{ objectFit: "cover" }}
              />
              */}
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Location</h3>
                <p className="text-gray-600 dark:text-gray-400">City, Country</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Email</h3>
                <p className="text-gray-600 dark:text-gray-400">your.email@example.com</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Education</h3>
                <p className="text-gray-600 dark:text-gray-400">Your Degree, University</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">My Story</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Praesent euismod, nisi vel
              ultricies consequat, nunc nisl aliquam nisi, eget aliquam nunc nisl eget nunc. Nulla facilisi.
              Praesent euismod, nisi vel ultricies consequat, nunc nisl aliquam nisi, eget aliquam nunc nisl eget nunc.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Nulla facilisi. Praesent euismod, nisi vel ultricies consequat, nunc nisl aliquam nisi, eget
              aliquam nunc nisl eget nunc. Nulla facilisi. Praesent euismod, nisi vel ultricies consequat,
              nunc nisl aliquam nisi, eget aliquam nunc nisl eget nunc.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Experience</h2>
            
            <div className="space-y-6">
              <div className="border-l-2 border-blue-500 pl-4 py-1">
                <h3 className="text-xl font-medium">Job Title</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Company Name • 2021 - Present</p>
                <p className="text-gray-700 dark:text-gray-300">
                  Brief description of your responsibilities and achievements in this role.
                </p>
              </div>
              
              <div className="border-l-2 border-blue-500 pl-4 py-1">
                <h3 className="text-xl font-medium">Previous Job Title</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Previous Company • 2018 - 2021</p>
                <p className="text-gray-700 dark:text-gray-300">
                  Brief description of your responsibilities and achievements in this role.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Skills</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Technical Skills</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  <li>JavaScript / TypeScript</li>
                  <li>React / Next.js</li>
                  <li>Node.js / Express</li>
                  <li>HTML / CSS / Tailwind</li>
                  <li>MongoDB / SQL</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Soft Skills</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Problem Solving</li>
                  <li>Team Collaboration</li>
                  <li>Communication</li>
                  <li>Project Management</li>
                  <li>Adaptability</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 