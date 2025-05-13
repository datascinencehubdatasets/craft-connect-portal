
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SupportChat } from "@/components/SupportChat";

const FreelancerProfile = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <motion.div 
          className="container mx-auto px-4 py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Freelancer Profile
            </h1>
            <div className="text-gray-700 dark:text-gray-300">
              <p className="mb-4">Freelancer ID: {id}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This is a placeholder for the freelancer profile page. In a complete implementation,
                this would display the freelancer's full profile information, portfolio, reviews, etc.
              </p>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
      <SupportChat />
    </div>
  );
};

export default FreelancerProfile;
