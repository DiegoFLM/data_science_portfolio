import Link from 'next/link';
import { fetchFeaturedProjects } from '@/lib/api';
import ProjectCard from '@/components/ProjectCard';

const techStack = [
  'Python',
  'PyTorch',
  'scikit-learn',
  'FastAPI',
  'Docker',
  'PostgreSQL',
  'AWS',
  'Kubernetes',
];

export default async function Home() {
  let featuredProjects = [];

  try {
    featuredProjects = await fetchFeaturedProjects(3);
  } catch (error) {
    console.error('Failed to fetch featured projects:', error);
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="section bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 p-1">
                <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-6xl">
                  👤
                </div>
              </div>
            </div>

            {/* Hero Content */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
                Diego Ledesma
              </h1>
              <p className="text-xl md:text-2xl text-primary-600 dark:text-primary-400 mb-6 font-semibold">
                Data Scientist | ML Engineer
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
                Physics & Computer Science background with a focus on building production
                ML systems. Passionate about solving real-world problems with data-driven
                solutions and deploying scalable machine learning applications.
              </p>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-8">
                <Link href="/projects" className="btn-primary">
                  View Projects
                </Link>
                <a
                  href="mailto:diego@example.com"
                  className="btn-secondary"
                >
                  Contact Me
                </a>
              </div>

              {/* Contact Links */}
              <div className="flex gap-6 justify-center md:justify-start">
                <a
                  href="mailto:diego@example.com"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  title="Email"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/DiegoFLM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  title="GitHub"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  title="LinkedIn"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="section">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Tech Stack
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech) => (
              <span key={tech} className="tech-badge text-lg px-6 py-3">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="section bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Featured Projects
            </h2>
            <Link
              href="/projects"
              className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
            >
              View All →
            </Link>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                Unable to load projects. Make sure the backend API is running.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
