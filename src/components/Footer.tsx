import { Link } from "react-router-dom";
import { Github, Instagram, Linkedin, User2Icon } from "lucide-react";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white">
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
                  to="/favorites"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Favorites
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Quick Recipes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">About</h4>
            <p className="text-gray-400 mt-3">
              This site used the Spoonacular API to fetch the data you see.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://github.com/lindo315"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
                title="github"
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
    </div>
  );
};

export default Footer;
