
import { X, Clock, Calendar, CheckCircle, User, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

type Project = {
  id: number;
  title: string;
  client: string;
  freelancer: {
    id: number;
    name: string;
    avatar: string;
  };
  budget: string;
  description?: string;
  deadline?: string;
  skills?: string[];
  status?: string;
};

export function ProjectDetailModal({
  isOpen,
  onClose,
  project,
}: {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}) {
  // Add description if not provided
  const enrichedProject = {
    ...project,
    description: project.description || "A detailed project requiring expertise in this domain. The client is looking for a professional to deliver high-quality work within the specified timeframe.",
    deadline: project.deadline || "2 weeks",
    skills: project.skills || ["HTML", "CSS", "JavaScript", "React"],
    status: project.status || "Open"
  };

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
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-xl shadow-lg overflow-hidden max-h-[90vh] flex flex-col"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{enrichedProject.title}</h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X size={20} />
                </Button>
              </div>
              
              {/* Content */}
              <div className="flex-1 overflow-auto">
                <Tabs defaultValue="details" className="p-4">
                  <TabsList>
                    <TabsTrigger value="details">Project Details</TabsTrigger>
                    <TabsTrigger value="submit">Submit Proposal</TabsTrigger>
                    <TabsTrigger value="client">Client Info</TabsTrigger>
                  </TabsList>
                  
                  {/* Details Tab */}
                  <TabsContent value="details" className="pt-4 space-y-4">
                    <div className="flex flex-wrap gap-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-md flex items-center gap-2">
                        <DollarSign size={18} className="text-blue-500" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{enrichedProject.budget}</span>
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-md flex items-center gap-2">
                        <Clock size={18} className="text-green-500" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">Deadline: {enrichedProject.deadline}</span>
                      </div>
                      
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded-md flex items-center gap-2">
                        <CheckCircle size={18} className="text-purple-500" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">Status: {enrichedProject.status}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">Description</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {enrichedProject.description}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">Required Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {enrichedProject.skills.map((skill, index) => (
                          <span 
                            key={index} 
                            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">About the Client</h3>
                      <div className="flex items-center">
                        <div className="bg-gray-200 dark:bg-gray-700 h-10 w-10 rounded-full flex items-center justify-center mr-3">
                          <User size={18} className="text-gray-500 dark:text-gray-400" />
                        </div>
                        <div>
                          <p className="text-gray-900 dark:text-white text-sm font-medium">{enrichedProject.client}</p>
                          <p className="text-gray-500 dark:text-gray-400 text-xs">Member since October 2023</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* Submit Proposal Tab */}
                  <TabsContent value="submit" className="pt-4 space-y-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Your Bid Amount
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <DollarSign size={16} className="text-gray-500 dark:text-gray-400" />
                          </div>
                          <input 
                            type="text"
                            className="pl-8 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your bid amount"
                          />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Budget range: {enrichedProject.budget}
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Delivery Time
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar size={16} className="text-gray-500 dark:text-gray-400" />
                          </div>
                          <input 
                            type="text"
                            className="pl-8 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter delivery time"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Cover Letter
                        </label>
                        <Textarea 
                          placeholder="Explain why you're the best fit for this project..."
                          className="min-h-32"
                        />
                      </div>
                      
                      <div>
                        <Button className="w-full">
                          Submit Proposal
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* Client Tab */}
                  <TabsContent value="client" className="pt-4">
                    <div className="space-y-5">
                      <div className="flex items-center">
                        <div className="bg-gray-200 dark:bg-gray-700 h-16 w-16 rounded-full flex items-center justify-center mr-4">
                          <User size={24} className="text-gray-500 dark:text-gray-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{enrichedProject.client}</h3>
                          <p className="text-gray-500 dark:text-gray-400">Member since October 2023</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">About the Client</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          This client is looking for skilled professionals to help with various projects. They have a history of fair collaboration and timely payments.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Location</h4>
                          <p className="text-sm text-gray-900 dark:text-gray-200">United States</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Projects Posted</h4>
                          <p className="text-sm text-gray-900 dark:text-gray-200">12</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Hire Rate</h4>
                          <p className="text-sm text-gray-900 dark:text-gray-200">85%</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Average Rating</h4>
                          <p className="text-sm text-gray-900 dark:text-gray-200">4.8/5.0</p>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        Contact Client
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
