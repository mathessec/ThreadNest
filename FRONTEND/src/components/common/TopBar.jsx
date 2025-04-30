
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ThreadNestTopbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle logout
  const handleLogout = () => {
    // Add your logout logic here, like clearing tokens, etc.
    setDropdown(false);
    navigate('/login');
  };

  // Navigation items with their paths
  const navItems = [
    { name: "Home", path: "/home" },
    { name: "Service", path: "/service" },
    { name: "About", path: "/about" },
    { name: "Tailor", path: "/tailor/list" }
  ];

  // Check if a navItem is active
  const isActive = (path) => {
    if (path === '/home' && (location.pathname === '/' || location.pathname === '/home' || location.pathname === '/dashboard')) {
      return true;
    }
    return location.pathname === path || location.pathname.startsWith(path);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 30 
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled ? "bg-black/90 backdrop-blur-sm" : "bg-black/70 backdrop-blur-md"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Elegant ThreadNest Wordmark Logo */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="flex items-center">
              {/* Main ThreadNest Text */}
              <div className="relative">
                <span className="text-white text-xl tracking-widest font-light">
                  <span className="font-normal tracking-wider">T</span>HREAD
                  <motion.span 
                    className="inline-block mx-0.5 w-3 h-px bg-amber-300 transform translate-y-[-6px]"
                    initial={{ width: 0 }}
                    animate={{ width: "0.75rem" }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                  ></motion.span>
                  <span className="font-normal tracking-wider">N</span>EST
                </span>
                
                {/* Golden decorative elements */}
                <motion.div 
                  className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                ></motion.div>
                
                <motion.div 
                  className="absolute -top-1.5 right-0 w-6 h-px bg-amber-300"
                  initial={{ width: 0 }}
                  animate={{ width: "1.5rem" }}
                  transition={{ delay: 1.2, duration: 0.4 }}
                ></motion.div>
                
                {/* Diamond accent */}
                <motion.div 
                  className="absolute -top-2 right-5 w-1.5 h-1.5 bg-amber-300 transform rotate-45"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.4, duration: 0.3, type: "spring" }}
                ></motion.div>
              </div>
              
              {/* Luxury mark */}
              <motion.div 
                className="ml-1 text-[10px] text-amber-300 uppercase tracking-widest font-light transform translate-y-[-6px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.4 }}
              >
                ™
              </motion.div>
            </div>
            
            {/* Tagline */}
            <motion.div 
              className="text-[9px] text-gray-400 tracking-wider uppercase text-right"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 1.8, duration: 0.4 }}
            >
              Bespoke Tailoring
            </motion.div>
          </motion.div>

          {/* Navigation Links (Center) - Desktop */}
          <motion.nav 
            className="hidden md:block"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.ul className="flex space-x-12">
              {navItems.map((item, index) => (
                <motion.li 
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    to={item.path}
                    className={`text-gray-300 hover:text-amber-300 font-light tracking-widest text-sm uppercase transition-colors relative group ${
                      isActive(item.path) ? 'text-amber-300' : ''
                    }`}
                  >
                    {item.name}
                    <span className={`absolute -bottom-2 left-0 h-px bg-amber-300 transition-all duration-300 ${
                      isActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.nav>

          {/* User Icon + Dropdown */}
          <div className="flex items-center space-x-6">
            <motion.div 
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <motion.button
                className="flex items-center text-gray-300 hover:text-amber-300 transition-colors"
                onClick={() => setDropdown(!dropdown)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User size={20} className="text-amber-300" />
                <ChevronDown 
                  size={16} 
                  className={`ml-1 transition-transform duration-300 ${dropdown ? "rotate-180" : ""}`} 
                />
              </motion.button>

              <AnimatePresence>
                {dropdown && (
                  <motion.div
                    className="absolute right-0 mt-2 w-40 py-2 bg-black/90 backdrop-blur-md border border-amber-300/20 rounded shadow-lg"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <button
                      className="w-full text-left block px-4 py-2 text-sm text-gray-300 hover:text-amber-300 hover:bg-black/50 transition-colors"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.div 
              className="md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-amber-300 focus:outline-none"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-black/95 backdrop-blur-md"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="px-4 py-6"
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="mb-4"
                >
                  <Link
                    to={item.path}
                    className={`block text-gray-300 hover:text-amber-300 font-light tracking-widest uppercase py-2 border-b border-gray-800 ${
                      isActive(item.path) ? 'text-amber-300' : ''
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                className="mt-6 pt-4 border-t border-gray-800 text-center"
                variants={itemVariants}
              >
                <div className="text-[10px] text-gray-400 tracking-wider uppercase">
                  Bespoke Tailoring
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default ThreadNestTopbar;