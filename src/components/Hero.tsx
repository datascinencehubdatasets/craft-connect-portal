
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const searchSuggestions = [
  "Website Design",
  "Logo Design",
  "WordPress Development",
  "Article Writing",
  "Video Editing",
  "Mobile App Development",
  "SEO Services",
  "Content Creation"
];

export function Hero() {
  const [searchValue, setSearchValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  
  // Filter suggestions based on search input
  useEffect(() => {
    if (searchValue.length > 0) {
      setFilteredSuggestions(
        searchSuggestions.filter(suggestion =>
          suggestion.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchValue]);
  
  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.section 
      className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 md:py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container px-4 sm:px-6 mx-auto text-center">
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Find the perfect freelance services<br className="hidden md:block" /> for your business
        </motion.h1>
        
        <motion.div 
          className="relative max-w-xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="flex rounded-xl overflow-hidden shadow-md bg-white dark:bg-gray-800">
            <Input
              type="text"
              placeholder="Search for any service"
              className="flex-1 px-4 py-3 text-lg border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => {
                if (searchValue.length > 0) setShowSuggestions(true);
              }}
            />
            <Button className="rounded-l-none px-6 py-6 text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
              <Search className="mr-2 h-5 w-5" />
              Search
            </Button>
          </div>
          
          {/* Search suggestions */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div 
              ref={suggestionsRef}
              className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <ul className="py-2">
                {filteredSuggestions.map((suggestion, index) => (
                  <li 
                    key={index} 
                    className="px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      setSearchValue(suggestion);
                      setShowSuggestions(false);
                    }}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
