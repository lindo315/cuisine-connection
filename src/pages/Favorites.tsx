import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Clock, Filter, Search, Trash2 } from "lucide-react";
import NavBar from "../components/NavBar";
import RecipeGrid from "../components/RecipeGrid";
import { useFavorites } from "../context/FavoritesContext";
import { Recipe } from "../components/RecipeCard";
import { toast } from "sonner";

const Favorites = () => {
  const { favorites, toggleFavorite, clearAllFavorites } = useFavorites();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFavorites, setFilteredFavorites] =
    useState<Recipe[]>(favorites);
  const [sortMethod, setSortMethod] = useState<
    "newest" | "oldest" | "quickest"
  >("newest");
  const [isConfirmingClear, setIsConfirmingClear] = useState(false);

  // Filter and sort favorites when dependencies change
  useEffect(() => {
    let result = [...favorites];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((recipe) =>
        recipe.title.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    result = sortFavorites(result, sortMethod);

    setFilteredFavorites(result);
  }, [favorites, searchQuery, sortMethod]);

  // Sort favorites based on selected method
  const sortFavorites = (recipes: Recipe[], method: string) => {
    const sorted = [...recipes];

    switch (method) {
      case "quickest":
        return sorted.sort(
          (a, b) => (a.readyInMinutes || 0) - (b.readyInMinutes || 0)
        );
      case "oldest":
        // Assuming we could add a savedAt timestamp to each favorite
        return sorted.reverse();
      case "newest":
      default:
        return sorted;
    }
  };

  const handleRemoveFavorite = (recipe: Recipe, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(recipe);
    toast.success(`"${recipe.title}" removed from favorites`);
  };

  const handleClearAllFavorites = () => {
    if (isConfirmingClear) {
      clearAllFavorites();
      setIsConfirmingClear(false);
      toast.success("All favorites have been cleared");
    } else {
      setIsConfirmingClear(true);
      // Auto-reset confirmation state after 3 seconds
      setTimeout(() => setIsConfirmingClear(false), 3000);
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-gray-50 dark:bg-gray-900">
      <NavBar />

      <div className="container mx-auto pt-28 px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-display font-semibold tracking-tight animate-fade-in mb-2">
              Your Favorite Recipes
            </h1>
            <p className="text-gray-600 dark:text-gray-400 animate-fade-in">
              {filteredFavorites.length}{" "}
              {filteredFavorites.length === 1 ? "recipe" : "recipes"} saved
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 text-sm rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Back
            </Link>

            {favorites.length > 0 && (
              <button
                onClick={handleClearAllFavorites}
                className={`inline-flex items-center px-4 py-2 text-sm rounded-full 
                           ${
                             isConfirmingClear
                               ? "bg-red-500 text-white hover:bg-red-600"
                               : "text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                           } transition-colors`}
              >
                <Trash2 className="w-4 h-4 mr-1.5" />
                {isConfirmingClear ? "Confirm Clear" : "Clear All"}
              </button>
            )}
          </div>
        </div>

        {favorites.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-8 animate-fade-in">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search your favorites..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                            bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 
                            focus:ring-primary focus:border-transparent outline-none"
                />
              </div>

              <div className="flex items-center">
                <label
                  htmlFor="sort-select"
                  className="mr-2 flex items-center text-gray-700 dark:text-gray-300 text-sm"
                >
                  <Filter className="w-4 h-4 mr-1.5" />
                  Sort by:
                </label>
                <select
                  id="sort-select"
                  value={sortMethod}
                  onChange={(e) =>
                    setSortMethod(
                      e.target.value as "newest" | "oldest" | "quickest"
                    )
                  }
                  className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 
                            text-gray-900 dark:text-gray-100 px-3 py-2 focus:ring-2 focus:ring-primary 
                            focus:border-transparent outline-none"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="quickest">Quickest to Make</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Custom RecipeGrid with remove button option */}
        {filteredFavorites.length > 0 ? (
          <div className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
              {filteredFavorites.map((recipe) => (
                <div key={recipe.id} className="relative group">
                  <Link
                    to={`/recipe/${recipe.id}`}
                    className="absolute inset-0 z-10"
                    aria-label={`View ${recipe.title}`}
                  />
                  <div className="h-full rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-800">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <button
                        onClick={(e) => handleRemoveFavorite(recipe, e)}
                        className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 
                                 hover:bg-red-500 hover:text-white transition-all duration-200 shadow-sm"
                        aria-label="Remove from favorites"
                      >
                        <Heart className="w-5 h-5 fill-red-500 text-red-500 group-hover:text-white" />
                      </button>

                      {recipe.difficulty && (
                        <div
                          className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-xs font-semibold 
                                       bg-white/90 text-gray-800 shadow-sm"
                        >
                          {recipe.difficulty === "easy"
                            ? "Easy"
                            : recipe.difficulty === "medium"
                            ? "Medium"
                            : "Advanced"}
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="font-medium text-base tracking-tight leading-tight mb-2.5 line-clamp-2">
                        {recipe.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                        {recipe.readyInMinutes && (
                          <div className="flex items-center">
                            <Clock className="w-3.5 h-3.5 mr-1" />
                            <span>{recipe.readyInMinutes} mins</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm animate-fade-in">
            {searchQuery ? (
              <>
                <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                  No matching favorites
                </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
                  Try adjusting your search to find what you're looking for.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-full 
                          hover:bg-primary/90 transition-colors shadow-sm"
                >
                  Clear Search
                </button>
              </>
            ) : (
              <>
                <div className="mx-auto bg-gray-100 dark:bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                  No favorites yet
                </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
                  Save your favorite recipes to quickly access them later.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center px-5 py-2.5 bg-primary text-white rounded-full 
                          hover:bg-primary/90 transition-colors shadow-sm"
                >
                  Find Recipes
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
