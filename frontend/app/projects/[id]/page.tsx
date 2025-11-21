import { fetchProjectById } from '@/lib/api';
import ModelDemo from '@/components/ModelDemo';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ProjectPage({ params }: { params: { id: string } }) {
  let project;

  try {
    project = await fetchProjectById(params.id);
  } catch (error) {
    console.error('Failed to fetch project:', error);
    notFound();
  }

  return (
    <div>
      {/* Header Section */}
      <section className="section bg-gradient-to-b from-primary-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container-custom">
          <Link
            href="/projects"
            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline mb-6"
          >
            ← Back to Projects
          </Link>

          <div className="flex items-start gap-6 mb-8">
            <span className="text-6xl">{project.icon}</span>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                {project.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {project.description}
              </p>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {Object.entries(project.metrics).map(([key, value]) => (
              <div
                key={key}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center"
              >
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                  {value}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                  {key.replace(/_/g, ' ')}
                </p>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="tech-badge">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="section">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Problem Statement
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {project.problemStatement}
          </p>
        </div>
      </section>

      {/* Methodology */}
      <section className="section bg-gray-50 dark:bg-gray-800">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Methodology
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {project.methodology}
          </p>
        </div>
      </section>

      {/* Results */}
      <section className="section">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Key Results
          </h2>
          <ul className="space-y-4">
            {project.results.map((result, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-primary-600 dark:text-primary-400 text-xl mt-1">✓</span>
                <span className="text-lg text-gray-700 dark:text-gray-300">{result}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Interactive Demo */}
      {project.demoAvailable && project.modelEndpoint && (
        <section className="section bg-gray-50 dark:bg-gray-800">
          <div className="container-custom max-w-4xl">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Interactive Demo
            </h2>
            <ModelDemo modelEndpoint={project.modelEndpoint} />
          </div>
        </section>
      )}

      {/* GitHub Link */}
      <section className="section">
        <div className="container-custom max-w-4xl text-center">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-primary"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                clipRule="evenodd"
              />
            </svg>
            View on GitHub
          </a>
        </div>
      </section>
    </div>
  );
}
