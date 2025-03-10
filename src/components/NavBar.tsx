import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Heart,
  Sun,
  Moon,
  Menu,
  X,
  Home,
  BookOpen,
  Search,
} from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const NavBar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Check if a link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300
                ${
                  isScrolled
                    ? "shadow-md bg-white/90 dark:bg-gray-900/90"
                    : "bg-white/70 dark:bg-gray-900/70"
                }
                border-b border-gray-200 dark:border-gray-800`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-display font-medium tracking-tight transform transition-transform duration-200 hover:scale-105"
          aria-label="CuisineConnection Home"
        >
          <span className="text-primary">Cuisine</span>
          <span className="text-gray-900 dark:text-white">Connection</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`flex items-center text-sm font-medium transition-colors ${
              isActive("/")
                ? "text-primary"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <Home className="w-4 h-4 mr-1.5" />
            Home
          </Link>

          <Link
            to="/recipes"
            className={`flex items-center text-sm font-medium transition-colors ${
              isActive("/recipes")
                ? "text-primary"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <Search className="w-4 h-4 mr-1.5" />
            Recipes
          </Link>

          <Link
            to="/favorites"
            className={`flex items-center text-sm font-medium transition-colors ${
              isActive("/favorites")
                ? "text-primary"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <Heart className="w-4 h-4 mr-1.5" />
            Favorites
          </Link>

          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={toggleMobileMenu}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              to="/"
              className={`flex items-center p-2 rounded-lg text-sm font-medium ${
                isActive("/")
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home className="w-4 h-4 mr-3" />
              Home
            </Link>

            <Link
              to="/recipes"
              className={`flex items-center p-2 rounded-lg text-sm font-medium ${
                isActive("/recipes")
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Search className="w-4 h-4 mr-3" />
              Recipes
            </Link>

            <Link
              to="/favorites"
              className={`flex items-center p-2 rounded-lg text-sm font-medium ${
                isActive("/favorites")
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Heart className="w-4 h-4 mr-3" />
              Favorites
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
