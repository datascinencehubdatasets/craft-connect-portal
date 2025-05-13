
import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

export function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 w-80 mb-4"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-white">Support Chat</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X size={18} />
              </Button>
            </div>
            <div className="h-64 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
              <div className="flex flex-col space-y-3">
                <div className="bg-blue-100 dark:bg-blue-900 text-gray-800 dark:text-gray-100 p-3 rounded-lg rounded-bl-none max-w-[80%] self-start">
                  <p className="text-sm">Hello! How can I help you today?</p>
                </div>
              </div>
            </div>
            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type a message..."
                  className="flex-1"
                />
                <Button size="icon" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <MessageCircle size={24} />
        )}
      </Button>
    </div>
  );
}
