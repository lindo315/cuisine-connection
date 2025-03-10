import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Clock, ChefHat, Star } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";

export interface Recipe {
  id: string;
  title: string;
  image: string;
  readyInMinutes?: number;
  servings?: number;
  summary?: string;
  difficulty?: "easy" | "medium" | "hard";
  method?: string;
  rating?: number;
}

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isFavorite = favorites.some((fav) => fav.id === recipe.id);

  // Determine difficulty if not provided (based on cooking time)
  const difficulty =
    recipe.difficulty || determineDifficulty(recipe.readyInMinutes);

  // Generate a cooking method if not provided
  const method = recipe.method || generateMethod(recipe.title);

  // Use a default rating if not provided
  const rating = recipe.rating || generateRating();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(recipe);
  };

  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className="block h-full transform transition-all duration-300 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="recipe-card group h-full rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-800">
        <div className="relative aspect-[4/3] overflow-hidden">
          <div
            className={`absolute inset-0 ${
              !imageLoaded ? "bg-gray-200 dark:bg-gray-700 animate-pulse" : ""
            }`}
          />
          <img
            src={recipe.image}
            alt={recipe.title}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 
                       ${isHovered ? "scale-110" : "scale-100"}
                       ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 
                     hover:bg-white transition-all duration-200 shadow-sm transform 
                     group-hover:scale-110"
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
              } 
                        transition-colors duration-300`}
            />
          </button>

          {/* Difficulty badge */}
          <div
            className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-xs font-semibold 
                        bg-white/90 text-gray-800 shadow-sm transition-transform duration-300
                        group-hover:scale-105"
          >
            {getDifficultyLabel(difficulty)}
          </div>
        </div>

        <div className="p-4">
          <h3
            className="font-medium text-base tracking-tight leading-tight mb-2.5 
                       group-hover:text-primary transition-colors duration-200 line-clamp-2"
          >
            {recipe.title}
          </h3>

          <div className="flex items-center mb-3">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="ml-1 text-sm font-medium">{rating}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            {recipe.readyInMinutes && (
              <div className="flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1" />
                <span>{recipe.readyInMinutes} mins</span>
              </div>
            )}

            <div className="flex items-center">
              <ChefHat className="w-3.5 h-3.5 mr-1" />
              <span>{method}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Helper functions
function determineDifficulty(time?: number): "easy" | "medium" | "hard" {
  if (!time) return "medium";
  if (time <= 20) return "easy";
  if (time <= 45) return "medium";
  return "hard";
}

function getDifficultyLabel(difficulty: "easy" | "medium" | "hard"): string {
  const labels = {
    easy: "Easy",
    medium: "Medium",
    hard: "Advanced",
  };
  return labels[difficulty];
}

function generateMethod(title: string): string {
  const methods = [
    "Baked",
    "Grilled",
    "Sautéed",
    "Roasted",
    "Fried",
    "Steamed",
  ];

  // Try to extract method from title
  for (const method of methods) {
    if (title.toLowerCase().includes(method.toLowerCase())) {
      return method;
    }
  }

  // Default to a random method
  return methods[Math.floor(Math.random() * methods.length)];
}

function generateRating(): string {
  // Generate a random rating between 4.0 and 5.0
  return (4 + Math.random()).toFixed(1);
}

export default RecipeCard;
