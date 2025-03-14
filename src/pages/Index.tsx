import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import FilterSection from "../components/FilterSection";
import RecipeGrid from "../components/RecipeGrid";
import RecipeSuggestions from "../components/RecipeSuggestions";
import { useRecipeSearch } from "../hooks/useRecipeSearch";
import { BookOpen, Clock, Utensils } from "lucide-react";
import Footer from "../components/Footer";

const Index = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, boolean>>({});
  const { recipes, loading, featuredRecipes, quickRecipes } = useRecipeSearch({
    query: searchQuery,
    filters,
  });

  // Extract search param from URL if present
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchFromUrl = searchParams.get("search");
    const collectionFromUrl = searchParams.get("collection");

    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }

    if (collectionFromUrl) {
      // Set filters based on collection type
      const newFilters = { ...filters };

      // Reset all filters first
      Object.keys(newFilters).forEach((key) => {
        newFilters[key] = false;
      });

      // Set the appropriate filters based on collection
      switch (collectionFromUrl) {
        case "quick":
          setSearchQuery("quick easy"); // You could set a search term too
          newFilters.quick = true;
          break;
        case "healthy":
          setSearchQuery("healthy");
          newFilters.vegetarian = true;
          newFilters.healthy = true;
          break;
        case "dinner":
          setSearchQuery("dinner main course");
          newFilters.main = true;
          break;
        case "classic":
          setSearchQuery("classic");
          break;
        default:
          break;
      }

      setFilters(newFilters);
    }
  }, [location]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: Record<string, boolean>) => {
    setFilters(newFilters);
  };

  // Rendering content conditionally based on whether there's a search query
  const renderContent = () => {
    if (searchQuery) {
      return (
        <div className="mt-8">
          <RecipeGrid
            recipes={recipes}
            loading={loading}
            category={`Results for "${searchQuery}"`}
          />
        </div>
      );
    }

    return (
      <>
        {!loading && (
          <div className="my-12 text-center">
            <h2 className="text-3xl font-display font-semibold tracking-tight mb-2">
              Explore Delicious Recipes
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover recipes for any occasion, from quick weeknight meals to
              impressive dinner party dishes.
            </p>
          </div>
        )}

        {/* Quick Recipes Section */}
        {!loading && quickRecipes && quickRecipes.length > 0 && (
          <div className="mt-8 mb-16">
            <div className="flex items-center mb-6 px-4">
              <Clock className="w-5 h-5 text-primary mr-2" />
              <h2 className="text-xl font-display font-semibold">
                Ready in 30 Minutes or Less
              </h2>
              <div className="ml-4 h-px bg-gray-200 dark:bg-gray-700 flex-grow"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 animate-fade-in">
              {quickRecipes.slice(0, 4).map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        )}

        {/* Featured Recipes Section */}
        {!loading && featuredRecipes && featuredRecipes.length > 0 && (
          <div className="mt-8 mb-16">
            <div className="flex items-center mb-6 px-4">
              <BookOpen className="w-5 h-5 text-primary mr-2" />
              <h2 className="text-xl font-display font-semibold">
                Featured Recipes
              </h2>
              <div className="ml-4 h-px bg-gray-200 dark:bg-gray-700 flex-grow"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 animate-fade-in">
              {featuredRecipes.slice(0, 8).map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        )}

        {/* All Recipes Section */}
        <div className="mt-8">
          <div className="flex items-center mb-6 px-4">
            <Utensils className="w-5 h-5 text-primary mr-2" />
            <h2 className="text-xl font-display font-semibold">All Recipes</h2>
            <div className="ml-4 h-px bg-gray-200 dark:bg-gray-700 flex-grow"></div>
          </div>
          <RecipeGrid recipes={recipes} loading={loading} />
        </div>
      </>
    );
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <NavBar />

      <main className="pb-20 flex-grow container mx-auto pt-28 px-4">
        <div>
          <div className="text-center mb-10 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Find the Perfect Recipe
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Enter ingredients you have on hand, set dietary preferences, and
              discover delicious recipes for any occasion.
            </p>
          </div>

          <SearchBar onSearch={handleSearch} initialValue={searchQuery} />

          <RecipeSuggestions query={searchQuery} />

          {/* <FilterSection onFilterChange={handleFilterChange} /> */}

          {renderContent()}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

// ADD: Back button to RecipeDetails.tsx
// FIX: Clear Favorites button to actually clear favorites
// FIX: Add missing alt text to images
// ADD: State management for searches (keep search query in URL?)
