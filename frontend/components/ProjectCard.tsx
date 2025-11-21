import Link from 'next/link';
import { ProjectSummary } from '@/lib/types';

interface ProjectCardProps {
  project: ProjectSummary;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`}>
      <div className="card h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <span className="text-4xl">{project.icon}</span>
          {project.demoAvailable && (
            <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium">
              Live Demo
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
          {project.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
          {project.shortDescription}
        </p>

        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
              <span
                key={key}
                className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium"
              >
                {value}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className="tech-badge">
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="tech-badge">+{project.techStack.length - 4}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
