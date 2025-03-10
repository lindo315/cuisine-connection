import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChefHat,
  Heart,
  Search,
  Clock,
  Star,
  Instagram,
  Linkedin,
  Github,
  User2Icon,
  Filter,
  BookOpen,
  ShieldCheck,
} from "lucide-react";
import NavBar from "../components/NavBar";

const LandingPage = () => {
  return (
    <div className="max-h-screen pb-20 bg-gray-50 dark:bg-gray-900">
      <NavBar />

      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark/90 z-10" />
        <div className="absolute inset-0 bg-[url('/hero-image.jpg')] bg-cover bg-center mix-blend-overlay" />

        <div className="container mx-auto px-4 pt-40 pb-24 relative z-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-display font-semibold tracking-tight mb-6 text-white animate-fade-in">
              Discover Delicious Recipes for Every Occasion
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mb-8 animate-fade-in delay-100">
              Find, save, and cook amazing dishes tailored to your preferences
              and dietary needs.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in delay-200">
              <Link
                to="/recipes"
                className="px-6 py-3 bg-white text-primary font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Explore Recipes
              </Link>
              <Link
                to="/favorites"
                className="px-6 py-3 bg-transparent text-white border border-white/70 font-medium rounded-full hover:bg-white/10 transition-all duration-300"
              >
                View Favorites
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-semibold tracking-tight mb-4">
            Everything You Need in One Place
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            CuisineConnection brings together all the tools you need to
            discover, save, and prepare amazing meals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-3">Smart Recipe Search</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Find recipes by ingredients, dietary preferences, or cooking time
              with our powerful search tools.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-3">Save Your Favorites</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Build your personal collection of favorite recipes for quick
              access anytime.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Filter className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-3">Personalized Filters</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Customize your recipe search with filters for cooking time,
              difficulty level, and more.
            </p>
          </div>
        </div>
      </div>

      {/* Recipe Categories */}
      <div className="bg-gray-100 dark:bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-semibold tracking-tight mb-4">
              Explore Recipe Collections
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Find inspiration with our curated collections for every taste and
              occasion.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Quick & Easy",
                icon: <Clock className="w-5 h-5" />,
                image: "/quick-meals.jpg",
                description: "Ready in 30 minutes or less",
                filter: "quick",
              },
              {
                title: "Healthy Options",
                icon: <ShieldCheck className="w-5 h-5" />,
                image: "/healthy.jpg",
                description: "Nutritious and delicious recipes",
                filter: "healthy",
              },
              {
                title: "Dinner Favorites",
                icon: <Star className="w-5 h-5" />,
                image: "/dinner.jpg",
                description: "Top-rated main course recipes",
                filter: "dinner",
              },
              {
                title: "Classic Cuisine",
                icon: <BookOpen className="w-5 h-5" />,
                image: "/classics.jpg",
                description: "Timeless traditional recipes",
                filter: "classic",
              },
            ].map((category, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-xl shadow-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
                <div className="absolute inset-0 bg-gray-400 dark:bg-gray-700" />{" "}
                {/* Placeholder for images */}
                <div className="relative z-20 p-6 h-full flex flex-col justify-end">
                  <div className="flex items-center mb-2">
                    <div className="p-1.5 rounded-full bg-primary/90 text-white mr-2">
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-medium text-white">
                      {category.title}
                    </h3>
                  </div>
                  <p className="text-white/90 text-sm mb-4">
                    {category.description}
                  </p>
                  <Link
                    to={`/recipes?collection=${category.filter}`}
                    className="inline-flex items-center text-sm text-white font-medium hover:underline"
                  >
                    Browse Collection
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-semibold tracking-tight mb-4">
            How CuisineConnection Works
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your journey from finding a recipe to enjoying a delicious meal is
            simple and enjoyable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              number: "01",
              title: "Discover",
              description:
                "Search or browse our extensive collection of recipes based on your preferences and available ingredients.",
            },
            {
              number: "02",
              title: "Save",
              description:
                "Add your favorite recipes to your personal collection for quick and easy access anytime.",
            },
            {
              number: "03",
              title: "Cook",
              description:
                "Follow our detailed instructions and tips to prepare delicious meals in your own kitchen.",
            },
          ].map((step, index) => (
            <div key={index} className="relative">
              <div className="text-6xl font-display font-bold text-primary absolute -top-10 -left-3 z-10">
                {step.number}
              </div>
              <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-medium mb-3">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className=" bg-primary text-white m-20 dark:bg-primary-darker border-t border-b border-primary/10 rounded-lg">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-semibold tracking-tight mb-4 text-white">
              Start Your Culinary Journey Today
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Join thousands of food enthusiasts who have discovered their new
              favorite recipes through CuisineConnection.
            </p>
            <Link
              to="/recipes"
              className="px-8 py-3 bg-white text-primary font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 inline-block"
            >
              Find Your Next Meal
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link
                to="/"
                className="text-xl font-display font-medium tracking-tight mb-6 block"
              >
                <span className="text-primary">Cuisine</span>
                <span className="text-white">Connection</span>
              </Link>
              <p className="text-gray-400 mt-3">
                Discover, save, and enjoy delicious recipes for every taste and
                occasion.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Explore</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/recipes"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    Recipes
                  </Link>
                </li>
                <li>
                  <Link
                    to="/favorites"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    Favorites
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">About</h4>
              <p className="text-gray-400 mt-3">
                This site used the Spoonacular API to fetch the data you see.
                The images and recipes are not owned by me. The icons are from{" "}
                <a href="https://www.freepik.com/">Freepik</a>.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Connect</h4>
              <div className="flex space-x-4 mb-4">
                <a
                  href="https://github.com/lindo315"
                  title="github"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label="Github"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/lindokuhle-dlamini-211271263/"
                  title="linkedin"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label="Twitter"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://www.instagram.com/lindo.315/"
                  title="instagram"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://my-portfolio-project-black.vercel.app/"
                  title="author"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label="Instagram"
                >
                  <User2Icon size={20} />
                </a>
              </div>
              <p className="text-sm text-gray-500">
                Reach out to me on social media for more updates and enquiries
                about my work.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2025 CuisineConnection. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
