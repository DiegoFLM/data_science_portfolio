import { fetchProjects } from '@/lib/api';
import ProjectCard from '@/components/ProjectCard';

export default async function ProjectsPage() {
  let projects = [];

  try {
    projects = await fetchProjects();
  } catch (error) {
    console.error('Failed to fetch projects:', error);
  }

  return (
    <div className="section">
      <div className="container-custom">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            All Projects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
            A collection of data science and machine learning projects demonstrating
            end-to-end development from research to production deployment.
          </p>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              Unable to load projects. Make sure the backend API is running at{' '}
              <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                http://localhost:8000
              </code>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
