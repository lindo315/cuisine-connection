import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Heart, Moon, Sun, LogOut, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    const checkDarkMode = () => {
      if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        document.documentElement.classList.add("dark");
        setIsDarkMode(true);
      } else {
        document.documentElement.classList.remove("dark");
        setIsDarkMode(false);
      }
    };

    // Check dark mode on mount
    checkDarkMode();
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setIsDarkMode(true);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <header
      className={`fixed w-full top-0 left-0 z-50 ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={closeMenu}>
            <span className="text-xl font-display font-medium tracking-tight">
              <span className="text-primary">Cuisine</span>
              <span className={isDarkMode ? "text-white" : "text-gray-900"}>
                Connection
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === "/"
                  ? "text-primary"
                  : isDarkMode
                  ? "text-gray-300 hover:text-primary"
                  : "text-gray-700 hover:text-primary"
              }`}
            >
              Home
            </Link>
            <Link
              to="/recipes"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === "/recipes" ||
                location.pathname.startsWith("/recipes/")
                  ? "text-primary"
                  : isDarkMode
                  ? "text-gray-300 hover:text-primary"
                  : "text-gray-700 hover:text-primary"
              }`}
            >
              Recipes
            </Link>
            {isAuthenticated && (
              <Link
                to="/favorites"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === "/favorites"
                    ? "text-primary"
                    : isDarkMode
                    ? "text-gray-300 hover:text-primary"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                <span className="flex items-center">
                  <Heart className="w-4 h-4 mr-1" />
                  Favorites
                </span>
              </Link>
            )}
            <Link
              to="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === "/about"
                  ? "text-primary"
                  : isDarkMode
                  ? "text-gray-300 hover:text-primary"
                  : "text-gray-700 hover:text-primary"
              }`}
            >
              About
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="ml-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center ml-4">
                <div
                  className={`mr-3 text-sm font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Hi, {user?.name.split(" ")[0]}
                </div>
                <div className="relative group">
                  <button
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20"
                    aria-label="User menu"
                  >
                    <User className="w-4 h-4" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-10">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Log out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center ml-4 space-x-2">
                <Link
                  to="/login"
                  className={`px-4 py-2 text-sm font-medium ${
                    isDarkMode
                      ? "text-gray-300 hover:text-primary"
                      : "text-gray-700 hover:text-primary"
                  }`}
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg shadow-sm"
                >
                  Create account
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`md:hidden ${
            isDarkMode ? "bg-gray-900" : "bg-white"
          } shadow-lg`}
        >
          <div className="px-4 pt-2 pb-6 space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === "/"
                  ? "text-primary"
                  : isDarkMode
                  ? "text-gray-300 hover:text-primary"
                  : "text-gray-700 hover:text-primary"
              }`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/recipes"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === "/recipes" ||
                location.pathname.startsWith("/recipes/")
                  ? "text-primary"
                  : isDarkMode
                  ? "text-gray-300 hover:text-primary"
                  : "text-gray-700 hover:text-primary"
              }`}
              onClick={closeMenu}
            >
              Recipes
            </Link>
            {isAuthenticated && (
              <Link
                to="/favorites"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === "/favorites"
                    ? "text-primary"
                    : isDarkMode
                    ? "text-gray-300 hover:text-primary"
                    : "text-gray-700 hover:text-primary"
                }`}
                onClick={closeMenu}
              >
                <span className="flex items-center">
                  <Heart className="w-4 h-4 mr-2" />
                  Favorites
                </span>
              </Link>
            )}
            <Link
              to="/about"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === "/about"
                  ? "text-primary"
                  : isDarkMode
                  ? "text-gray-300 hover:text-primary"
                  : "text-gray-700 hover:text-primary"
              }`}
              onClick={closeMenu}
            >
              About
            </Link>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <>
                    <Sun className="w-5 h-5 mr-2" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5 mr-2" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>

            {/* Auth Buttons - Mobile */}
            {isAuthenticated ? (
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                <div
                  className={`mb-3 text-sm font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Signed in as{" "}
                  <span className="font-semibold">{user?.name}</span>
                </div>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={closeMenu}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Log out
                </button>
              </div>
            ) : (
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                <Link
                  to="/login"
                  className="block w-full px-4 py-2 text-base font-medium text-center text-primary border border-primary rounded-lg hover:bg-primary/10"
                  onClick={closeMenu}
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="block w-full px-4 py-2 text-base font-medium text-center text-white bg-primary hover:bg-primary-dark rounded-lg shadow-sm"
                  onClick={closeMenu}
                >
                  Create account
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
