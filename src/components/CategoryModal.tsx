
import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type CategoryProject = {
  id: number;
  title: string;
  description: string;
  budget: string;
  freelancer: {
    name: string;
    avatar: string;
    rating: number;
  };
};

const mockProjects: Record<string, CategoryProject[]> = {
  "Web Development": [
    {
      id: 1,
      title: "E-commerce Website Development",
      description: "Need a full-featured online store with payment integration",
      budget: "$1,500 - $3,000",
      freelancer: {
        name: "Mike Wilson",
        avatar: "https://i.pravatar.cc/100?img=3",
        rating: 4.9,
      },
    },
    {
      id: 2,
      title: "WordPress Blog Customization",
      description: "Looking for expert to customize my WordPress theme",
      budget: "$400 - $800",
      freelancer: {
        name: "Jennifer Lee",
        avatar: "https://i.pravatar.cc/100?img=5",
        rating: 4.7,
      },
    },
    {
      id: 3,
      title: "React.js Dashboard",
      description: "Build an admin dashboard with React and Chart.js",
      budget: "$800 - $1,500",
      freelancer: {
        name: "David Park",
        avatar: "https://i.pravatar.cc/100?img=8",
        rating: 4.8,
      },
    },
  ],
  "Design": [
    {
      id: 1,
      title: "Brand Identity Package",
      description: "Need logo, business cards, and brand guidelines",
      budget: "$500 - $1,200",
      freelancer: {
        name: "Sarah Miller",
        avatar: "https://i.pravatar.cc/100?img=5",
        rating: 4.9,
      },
    },
    {
      id: 2,
      title: "UI/UX for Mobile App",
      description: "Design 15 screens for fitness tracking app",
      budget: "$1,200 - $2,000",
      freelancer: {
        name: "Michael Chen",
        avatar: "https://i.pravatar.cc/100?img=11",
        rating: 5.0,
      },
    },
  ],
  "Writing": [
    {
      id: 1,
      title: "Blog Content Series",
      description: "10 SEO-optimized articles about digital marketing",
      budget: "$350 - $700",
      freelancer: {
        name: "Emma Watson",
        avatar: "https://i.pravatar.cc/100?img=9",
        rating: 4.7,
      },
    },
    {
      id: 2,
      title: "Product Descriptions",
      description: "Write compelling descriptions for 50 products",
      budget: "$250 - $500",
      freelancer: {
        name: "James Smith",
        avatar: "https://i.pravatar.cc/100?img=12",
        rating: 4.5,
      },
    },
  ],
  "Video & Animation": [
    {
      id: 1,
      title: "Explainer Video",
      description: "60-second animated explainer for SaaS product",
      budget: "$800 - $1,500",
      freelancer: {
        name: "Chris Johnson",
        avatar: "https://i.pravatar.cc/100?img=15",
        rating: 4.9,
      },
    },
    {
      id: 2,
      title: "Video Editing for YouTube",
      description: "Edit 10 videos for my YouTube channel",
      budget: "$500 - $900",
      freelancer: {
        name: "Lisa Wang",
        avatar: "https://i.pravatar.cc/100?img=20",
        rating: 4.8,
      },
    },
  ],
  "Music/Audio": [
    {
      id: 1,
      title: "Podcast Editing",
      description: "Weekly podcast editing and production (12 episodes)",
      budget: "$600 - $1,200",
      freelancer: {
        name: "Ryan Adams",
        avatar: "https://i.pravatar.cc/100?img=22",
        rating: 4.9,
      },
    },
    {
      id: 2,
      title: "Voice Over for Commercial",
      description: "Professional voice over for 30-second ad",
      budget: "$200 - $400",
      freelancer: {
        name: "Sophia Martinez",
        avatar: "https://i.pravatar.cc/100?img=25",
        rating: 5.0,
      },
    },
  ],
};

export function CategoryModal({
  isOpen,
  onClose,
  category,
}: {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}) {
  const [activeTab, setActiveTab] = useState("projects");
  const categoryProjects = mockProjects[category] || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 w-full max-w-3xl rounded-xl shadow-lg overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{category}</h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X size={20} />
                </Button>
              </div>
              
              <div className="p-6">
                <Tabs defaultValue="projects" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-6">
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="freelancers">Top Freelancers</TabsTrigger>
                    <TabsTrigger value="guides">Guides</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="projects" className="space-y-4">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                      Available Projects
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {categoryProjects.map((project) => (
                        <div 
                          key={project.id}
                          className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {project.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {project.description}
                          </p>
                          <div className="flex justify-between items-center mt-3">
                            <div className="flex items-center">
                              <img 
                                src={project.freelancer.avatar} 
                                alt={project.freelancer.name} 
                                className="h-8 w-8 rounded-full mr-2"
                              />
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                {project.freelancer.name}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                              {project.budget}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 text-center">
                      <Button onClick={onClose}>
                        Browse all {category} projects
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="freelancers">
                    <div className="text-center py-8">
                      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                        Top {category} Freelancers
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Find the best talent in {category} for your project
                      </p>
                      <Button className="mt-4">
                        View all freelancers
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="guides">
                    <div className="text-center py-8">
                      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                        {category} Resources & Guides
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Learn how to make the most of your {category} projects
                      </p>
                      <Button className="mt-4">
                        View resources
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
