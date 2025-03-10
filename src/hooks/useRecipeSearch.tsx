import { useState, useEffect } from "react";
import { Recipe } from "../components/RecipeCard";
import { toast } from "sonner";

interface UseRecipeSearchProps {
  query: string;
  filters: Record<string, boolean>;
}

export const useRecipeSearch = ({ query, filters }: UseRecipeSearchProps) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Spoonacular API key
  const API_KEY = "3ee13bf895bb480e8fac38e6501f451b";

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!query) return;

      setLoading(true);
      setError(null);

      try {
        // Get active filters
        const activeFilters = Object.entries(filters)
          .filter(([_, isActive]) => isActive)
          .map(([key]) => key);

        // Build query parameters
        const params = new URLSearchParams({
          apiKey: API_KEY,
          query: query,
          number: "10", // Number of results to return
          addRecipeInformation: "true", // Include additional recipe information
          fillIngredients: "false", // Don't need detailed ingredient info for search results
        });

        // Add diet filters if present
        if (activeFilters.length > 0) {
          // Map your filter keys to Spoonacular diet parameters
          const dietFilters = activeFilters.join(",");
          params.append("diet", dietFilters);
        }

        // Make API call to Spoonacular API
        const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }

        const data = await response.json();

        // Map Spoonacular API response to Recipe type
        const mappedRecipes: Recipe[] = data.results.map((recipe: any) => ({
          id: recipe.id.toString(),
          title: recipe.title,
          image: recipe.image,
          readyInMinutes: recipe.readyInMinutes || 30,
          servings: recipe.servings || 4,
          summary: recipe.summary || "No summary available.",
        }));

        setRecipes(mappedRecipes);
      } catch (err) {
        console.error("Error fetching recipes:", err);
        setError("Failed to fetch recipes. Please try again.");
        toast.error("Failed to fetch recipes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    // Debounce the search to avoid excessive API calls
    const timeoutId = setTimeout(() => {
      if (query) {
        fetchRecipes();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query, filters, API_KEY]);

  return { recipes, loading, error };
};
