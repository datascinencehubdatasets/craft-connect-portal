
import { useState, useEffect } from "react";
import { X, Calendar, MessageCircle, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type Notification = {
  id: string;
  type: "message" | "bid" | "calendar";
  title: string;
  description: string;
  time: string;
  read: boolean;
};

export function NotificationsPanel({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Simulate loading notifications when panel opens
    if (isOpen) {
      setNotifications([
        {
          id: "1",
          type: "message",
          title: "New message from Alex",
          description: "Hey, can we discuss the project details?",
          time: "5 minutes ago",
          read: false,
        },
        {
          id: "2",
          type: "bid",
          title: "New bid on your project",
          description: "Sarah has placed a bid for $350 on your logo project",
          time: "30 minutes ago",
          read: false,
        },
        {
          id: "3",
          type: "calendar",
          title: "Meeting reminder",
          description: "Call with client at 3:00 PM today",
          time: "1 hour ago",
          read: true,
        },
        {
          id: "4",
          type: "message",
          title: "Message from support team",
          description: "Your ticket has been resolved. Please check details.",
          time: "Yesterday",
          read: true,
        },
      ]);
    }
  }, [isOpen]);

  const markAsRead = (id: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case "message":
        return <MessageCircle className="h-5 w-5 text-blue-500" />;
      case "bid":
        return <DollarSign className="h-5 w-5 text-green-500" />;
      case "calendar":
        return <Calendar className="h-5 w-5 text-purple-500" />;
      default:
        return <MessageCircle className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/20 dark:bg-black/50 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Panel */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-xs bg-white dark:bg-gray-800 shadow-lg flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30 }}
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X size={18} />
              </Button>
            </div>
            
            <div className="flex-1 overflow-auto p-3">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                  <p>No notifications yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg cursor-pointer ${
                        notification.read 
                          ? "bg-gray-50 dark:bg-gray-800" 
                          : "bg-blue-50 dark:bg-blue-900/20"
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex gap-3">
                        <div className="mt-1">
                          {getIconForType(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className={`font-medium ${notification.read ? "text-gray-700 dark:text-gray-300" : "text-gray-900 dark:text-white"}`}>
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {notification.description}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" className="w-full" onClick={() => {}}>
                Mark all as read
              </Button>
              <Button variant="ghost" className="w-full mt-2" onClick={() => {}}>
                View all notifications
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
