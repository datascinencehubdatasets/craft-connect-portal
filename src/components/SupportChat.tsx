
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: number;
  content: string;
  sender: "user" | "support";
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: 1,
    content: "Hello! How can I help you today?",
    sender: "support",
    timestamp: new Date(),
  },
];

export function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    
    // Simulate support agent response
    setTimeout(() => {
      const responses = [
        "Thank you for your message! I'll look into that for you.",
        "I'd be happy to help you with that question.",
        "Let me check that information for you.",
        "That's a great question. Here's what you need to know...",
        "I'll connect you with a specialist who can help with that specific issue.",
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const supportMessage: Message = {
        id: messages.length + 2,
        content: randomResponse,
        sender: "support",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, supportMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

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
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`${
                      message.sender === "support"
                        ? "bg-blue-100 dark:bg-blue-900 text-gray-800 dark:text-gray-100 rounded-lg rounded-bl-none self-start"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg rounded-br-none self-end"
                    } p-3 max-w-[80%]`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type a message..."
                  className="flex-1"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Button 
                  size="icon" 
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                >
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
