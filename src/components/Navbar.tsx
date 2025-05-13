
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Bell, MessageCircle, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { NotificationsPanel } from "./NotificationsPanel";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { LanguageSelector } from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

export function Navbar() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(1);
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [signupDialogOpen, setSignupDialogOpen] = useState(false);
  
  // Simulate new notification every 30 seconds
  useState(() => {
    const interval = setInterval(() => {
      setNotificationCount(prev => prev + 1);
    }, 30000);
    return () => clearInterval(interval);
  });

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">YourLogo</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              {t('navbar.howItWorks')}
            </a>
            <a href="#browse-jobs" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              {t('navbar.browseJobs')}
            </a>
            <button 
              onClick={() => setSignupDialogOpen(true)} 
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {t('navbar.signUp')}
            </button>
            <button 
              onClick={() => setLoginDialogOpen(true)} 
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {t('navbar.logIn')}
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <ThemeToggle />
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => setNotificationsPanelOpen(true)}
            >
              <Bell size={20} />
              {notificationCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white rounded-full">
                  {notificationCount}
                </Badge>
              )}
            </Button>
            
            <Button variant="ghost" size="icon">
              <MessageCircle size={20} />
            </Button>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              <a href="#how-it-works" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                {t('navbar.howItWorks')}
              </a>
              <a href="#browse-jobs" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                {t('navbar.browseJobs')}
              </a>
              <button 
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => {
                  setSignupDialogOpen(true);
                  setIsOpen(false);
                }}
              >
                {t('navbar.signUp')}
              </button>
              <button 
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => {
                  setLoginDialogOpen(true);
                  setIsOpen(false);
                }}
              >
                {t('navbar.logIn')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notifications Panel */}
      <NotificationsPanel 
        isOpen={notificationsPanelOpen} 
        onClose={() => setNotificationsPanelOpen(false)} 
      />

      {/* Login Dialog */}
      <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('modals.login.title')}</DialogTitle>
            <DialogDescription>
              {t('modals.login.description')}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {t('modals.login.email')}
              </label>
              <input
                type="email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="example@email.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {t('modals.login.password')}
              </label>
              <input
                type="password"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>
            <Button className="w-full">{t('modals.login.button')}</Button>
            <div className="text-center text-sm">
              {t('modals.login.noAccount')}{" "}
              <button 
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                onClick={() => {
                  setLoginDialogOpen(false);
                  setSignupDialogOpen(true);
                }}
              >
                {t('modals.login.signUp')}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Signup Dialog */}
      <Dialog open={signupDialogOpen} onOpenChange={setSignupDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('modals.signup.title')}</DialogTitle>
            <DialogDescription>
              {t('modals.signup.description')}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {t('modals.signup.fullName')}
              </label>
              <input
                type="text"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {t('modals.signup.email')}
              </label>
              <input
                type="email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="example@email.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {t('modals.signup.password')}
              </label>
              <input
                type="password"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="terms" className="h-4 w-4 rounded border-gray-300" />
              <label htmlFor="terms" className="text-sm text-gray-500 dark:text-gray-400">
                {t('modals.signup.agree')}{" "}
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                  {t('modals.signup.termsOfService')}
                </a>{" "}
                {t('modals.signup.and')}{" "}
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                  {t('modals.signup.privacyPolicy')}
                </a>
              </label>
            </div>
            <Button className="w-full">{t('modals.signup.button')}</Button>
            <div className="text-center text-sm">
              {t('modals.signup.hasAccount')}{" "}
              <button 
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                onClick={() => {
                  setSignupDialogOpen(false);
                  setLoginDialogOpen(true);
                }}
              >
                {t('modals.signup.logIn')}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
}
