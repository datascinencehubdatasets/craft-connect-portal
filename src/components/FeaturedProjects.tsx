
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ProjectDetailModal } from "./ProjectDetailModal";
import { useLanguage } from "@/contexts/LanguageContext";

export function FeaturedProjects() {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const projects = [
    {
      id: 1,
      title: "Build a WordPress Website",
      client: "Digital Agency Co.",
      freelancer: {
        id: 101,
        name: "Alex Johnson",
        avatar: "https://i.pravatar.cc/100?img=1",
      },
      budget: "$500 USD",
    },
    {
      id: 2,
      title: "Logo Design for Startup",
      client: "Tech Innovate LLC",
      freelancer: {
        id: 102,
        name: "Sarah Miller",
        avatar: "https://i.pravatar.cc/100?img=5",
      },
      budget: "$300 USD",
    },
    {
      id: 3,
      title: "Content Writing for Blog",
      client: "Marketing Masters",
      freelancer: {
        id: 103,
        name: "Mike Wilson",
        avatar: "https://i.pravatar.cc/100?img=3",
      },
      budget: "$250 USD",
    },
    {
      id: 4,
      title: "Mobile App UI/UX Design",
      client: "App Solutions Inc.",
      freelancer: {
        id: 104,
        name: "Emily Chen",
        avatar: "https://i.pravatar.cc/100?img=9",
      },
      budget: "$800 USD",
    },
  ];

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 sm:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
          {t('featuredProjects.title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="block">
              <motion.div
                className="card-hover rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/70"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300 
                }}
                onClick={() => handleProjectClick(project)}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t('featuredProjects.client')}: {project.client}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-sm font-medium rounded-full">
                      {project.budget}
                    </span>
                  </div>

                  <div className="flex items-center mt-6">
                    <Link to={`/freelancer/${project.freelancer.id}`} onClick={(e) => e.stopPropagation()}>
                      <img
                        src={project.freelancer.avatar}
                        alt={project.freelancer.name}
                        className="h-10 w-10 rounded-full mr-3"
                      />
                    </Link>
                    <Link 
                      to={`/freelancer/${project.freelancer.id}`}
                      className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {project.freelancer.name}
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal 
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          project={selectedProject}
        />
      )}
    </section>
  );
}
