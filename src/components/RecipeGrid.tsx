import React from "react";
import RecipeCard, { Recipe } from "./RecipeCard";
import { SparklesIcon } from "lucide-react";

interface RecipeGridProps {
  recipes: Recipe[];
  loading: boolean;
  category?: string;
}

const RecipeGrid: React.FC<RecipeGridProps> = ({
  recipes,
  loading,
  category,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden shadow-sm bg-white dark:bg-gray-800"
          >
            <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="mx-auto bg-gray-100 dark:bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mb-4">
          <SparklesIcon className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
          No recipes found
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          Try adjusting your search or filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div>
      {category && (
        <div className="flex items-center mb-6 px-4">
          <h2 className="text-xl font-display font-semibold">{category}</h2>
          <div className="ml-4 h-px bg-gray-200 dark:bg-gray-700 flex-grow"></div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 animate-fade-in">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipeGrid;
