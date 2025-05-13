
import { useState } from "react";
import { Code, PenTool, FileText, Video, Music } from "lucide-react";
import { motion } from "framer-motion";
import { CategoryModal } from "./CategoryModal";

const categories = [
  {
    name: "Web Development",
    icon: Code,
  },
  {
    name: "Design",
    icon: PenTool,
  },
  {
    name: "Writing",
    icon: FileText,
  },
  {
    name: "Video & Animation",
    icon: Video,
  },
  {
    name: "Music/Audio",
    icon: Music,
  },
];

export function Categories() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  return (
    <section className="py-16">
      <div className="container px-4 sm:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
          Popular Categories
        </h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              variants={item}
              className="card-hover flex flex-col items-center justify-center p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 cursor-pointer transition-all hover:shadow-md hover:border-blue-300 dark:hover:border-blue-500"
              onClick={() => handleCategoryClick(category.name)}
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
            >
              <div className="h-12 w-12 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mb-4">
                <category.icon size={24} />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {category.name}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Category Details Modal */}
      {selectedCategory && (
        <CategoryModal 
          isOpen={!!selectedCategory}
          onClose={() => setSelectedCategory(null)}
          category={selectedCategory}
        />
      )}
    </section>
  );
}
