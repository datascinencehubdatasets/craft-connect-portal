
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SupportChat } from "@/components/SupportChat";
import { 
  CheckCircle, 
  Calendar, 
  Briefcase, 
  DollarSign, 
  Star,
  Search as SearchIcon
} from "lucide-react";

type SearchResult = {
  id: number;
  title: string;
  type: "project" | "freelancer" | "service";
  description: string;
  tags: string[];
  rating?: number;
  price?: string;
  deadline?: string;
  image?: string;
};

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>("all");

  useEffect(() => {
    // Simulate API request
    setLoading(true);
    
    setTimeout(() => {
      // Mock search results based on query
      const mockResults: SearchResult[] = [
        {
          id: 1,
          title: "WordPress Website Development",
          type: "project",
          description: "Need a custom WordPress site with e-commerce functionality",
          tags: ["WordPress", "PHP", "E-commerce"],
          deadline: "2 weeks",
          price: "$500-$1000",
        },
        {
          id: 2,
          title: "Logo Design for Tech Company",
          type: "project",
          description: "Modern logo design for SaaS startup in the AI space",
          tags: ["Logo Design", "Branding", "AI"],
          deadline: "1 week",
          price: "$200-$500",
        },
        {
          id: 3,
          title: "Alex Johnson",
          type: "freelancer",
          description: "Full-stack developer with 5 years experience",
          tags: ["React", "Node.js", "MongoDB"],
          rating: 4.8,
          image: "https://i.pravatar.cc/100?img=1",
        },
        {
          id: 4,
          title: "Professional Web Design",
          type: "service",
          description: "Custom web design services for businesses of all sizes",
          tags: ["Web Design", "UI/UX", "Responsive Design"],
          rating: 4.9,
          price: "From $350",
        },
        {
          id: 5,
          title: "Sarah Miller",
          type: "freelancer",
          description: "Graphic designer specializing in brand identity",
          tags: ["Adobe Photoshop", "Illustrator", "Logo Design"],
          rating: 4.7,
          image: "https://i.pravatar.cc/100?img=5",
        },
        {
          id: 6,
          title: "SEO Optimization Service",
          type: "service",
          description: "Improve your website's search engine ranking",
          tags: ["SEO", "Digital Marketing", "Analytics"],
          rating: 4.6,
          price: "From $200/month",
        },
      ];
      
      setResults(mockResults.filter(result => 
        result.title.toLowerCase().includes(query.toLowerCase()) || 
        result.description.toLowerCase().includes(query.toLowerCase()) ||
        result.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      ));
      
      setLoading(false);
    }, 800);
  }, [query]);

  const filteredResults = selectedType === "all" 
    ? results 
    : results.filter(result => result.type === selectedType);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pb-16">
        <div className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-8">
          <div className="container px-4 sm:px-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Search Results for "{query}"
            </h1>
            
            <div className="relative max-w-xl mb-8">
              <div className="flex rounded-xl overflow-hidden shadow-md bg-white dark:bg-gray-800">
                <Input
                  type="text"
                  defaultValue={query}
                  placeholder="Search for any service"
                  className="flex-1 px-4 py-3 text-base border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button className="rounded-l-none bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                  <SearchIcon className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-8">
              <Button
                variant={selectedType === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType("all")}
              >
                All
              </Button>
              <Button
                variant={selectedType === "project" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType("project")}
              >
                Projects
              </Button>
              <Button
                variant={selectedType === "freelancer" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType("freelancer")}
              >
                Freelancers
              </Button>
              <Button
                variant={selectedType === "service" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType("service")}
              >
                Services
              </Button>
            </div>
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 dark:text-gray-400">Searching...</p>
              </div>
            ) : (
              <>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Found {filteredResults.length} results for "{query}"
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResults.length > 0 ? (
                    filteredResults.map((result) => (
                      <div 
                        key={result.id} 
                        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                      >
                        {result.type === "freelancer" && result.image && (
                          <div className="h-32 bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-4">
                            <img 
                              src={result.image} 
                              alt={result.title}
                              className="h-20 w-20 rounded-full object-cover"
                            />
                          </div>
                        )}
                        
                        <div className="p-5">
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                              result.type === "project" 
                                ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" 
                                : result.type === "freelancer"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                            }`}>
                              {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                            </span>
                            
                            {result.rating && (
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  {result.rating}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {result.title}
                          </h3>
                          
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            {result.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {result.tags.map((tag, i) => (
                              <span 
                                key={i} 
                                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex justify-between items-center mt-4">
                            {result.price && (
                              <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                <DollarSign className="h-4 w-4 mr-1 text-green-500" />
                                {result.price}
                              </div>
                            )}
                            
                            {result.deadline && (
                              <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                <Calendar className="h-4 w-4 mr-1 text-blue-500" />
                                {result.deadline}
                              </div>
                            )}
                            
                            {result.type === "freelancer" && (
                              <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                <Briefcase className="h-4 w-4 mr-1 text-purple-500" />
                                View Profile
                              </div>
                            )}
                            
                            {result.type === "service" && (
                              <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                                Available Now
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-12">
                      <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">No results found</p>
                      <p className="text-gray-500 dark:text-gray-500 mb-6">
                        Try adjusting your search terms or browse categories instead
                      </p>
                      <Button>Browse Categories</Button>
                    </div>
                  )}
                </div>
                
                {filteredResults.length > 0 && (
                  <div className="mt-10 flex justify-center">
                    <Button variant="outline" className="mr-2">Previous</Button>
                    <Button variant="outline" className="bg-blue-50 dark:bg-blue-900/20">1</Button>
                    <Button variant="outline" className="mx-1">2</Button>
                    <Button variant="outline" className="mr-2">3</Button>
                    <Button variant="outline">Next</Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <SupportChat />
    </div>
  );
};

export default SearchResults;
