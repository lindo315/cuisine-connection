import React, { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Heart,
  Star,
  ChefHat,
  Bookmark,
  Share2,
  Users,
  Info,
  Printer,
  ExternalLink,
} from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import LoadingState from "../components/LoadingState";
import NavBar from "../components/NavBar";
import NutritionLabel from "../components/NutritionLabel";
import { toast } from "sonner";

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [recipe, setRecipe] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"ingredients" | "instructions">(
    "ingredients"
  );
  const isFavorite = favorites.some((fav) => fav.id === id);

  // Spoonacular API key
  const API_KEY = "3ee13bf895bb480e8fac38e6501f451b";

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      setLoading(true);

      try {
        // Fetch recipe details from Spoonacular API
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=true`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recipe details");
        }

        const data = await response.json();

        // Map Spoonacular API response to the expected recipe format
        const mappedRecipe = {
          id: data.id.toString(),
          title: data.title,
          image: data.image,
          readyInMinutes: data.readyInMinutes,
          servings: data.servings,
          summary: data.summary,
          difficulty: getDifficultyLevel(data.healthScore),
          method: data.dishTypes?.length > 0 ? data.dishTypes[0] : "Mixed",
          instructions:
            data.analyzedInstructions?.length > 0
              ? data.analyzedInstructions[0].steps.map((step: any) => step.step)
              : [data.instructions || "No instructions available."],
          ingredients: data.extendedIngredients?.map((ingredient: any) => ({
            name: ingredient.name,
            amount: `${ingredient.amount} ${ingredient.unit}`,
            image: `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`,
          })) || [{ name: "No ingredients available", amount: "", image: "" }],
          nutrition: {
            calories:
              data.nutrition?.nutrients.find((n: any) => n.name === "Calories")
                ?.amount || 0,
            protein:
              data.nutrition?.nutrients.find((n: any) => n.name === "Protein")
                ?.amount || 0,
            fat:
              data.nutrition?.nutrients.find((n: any) => n.name === "Fat")
                ?.amount || 0,
            carbs:
              data.nutrition?.nutrients.find(
                (n: any) => n.name === "Carbohydrates"
              )?.amount || 0,
          },
          sourceUrl: data.sourceUrl || "",
          sourceName: data.sourceName || "Recipe Source",
        };

        setRecipe(mappedRecipe);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        toast.error("Failed to fetch recipe details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id, API_KEY]);

  // Helper function to determine difficulty based on health score
  const getDifficultyLevel = (healthScore: number): string => {
    if (!healthScore) return "medium";
    if (healthScore < 40) return "easy";
    if (healthScore < 70) return "medium";
    return "hard";
  };

  const handleFavoriteClick = () => {
    if (recipe) {
      toggleFavorite(recipe);
      toast.success(
        isFavorite ? "Removed from favorites" : "Added to favorites"
      );
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: recipe.title,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing:", error));
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handlePrintClick = () => {
    window.print();
  };

  const handleSourceClick = () => {
    if (recipe?.sourceUrl) {
      window.open(recipe.sourceUrl, "_blank");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <NavBar />
        <div className="container mx-auto pt-28 px-4">
          <LoadingState message="Loading recipe details..." />
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <NavBar />
        <div className="container mx-auto pt-28 px-4 text-center">
          <div className="max-w-md mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <h2 className="text-2xl font-medium text-gray-700 dark:text-gray-200 mb-2">
              Recipe not found
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              The recipe you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={handleBackClick}
              className="inline-flex items-center px-5 py-2.5 bg-primary text-white rounded-full 
                      hover:bg-primary/90 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-gray-50 dark:bg-gray-900">
      <NavBar />

      <div className="w-full h-[60vh] relative overflow-hidden">
        <div
          className={`absolute inset-0 ${
            !imageLoaded ? "bg-gray-300 dark:bg-gray-700 animate-pulse" : ""
          }`}
        />
        <img
          src={recipe.image}
          alt={recipe.title}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="absolute top-20 left-4 z-10">
          <button
            onClick={handleBackClick}
            className="p-2 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-md transition-all duration-200 hover:scale-105"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute top-20 right-4 z-10 flex space-x-2">
          <button
            onClick={handlePrintClick}
            className="p-2 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-md transition-all duration-200 hover:scale-105"
            aria-label="Print recipe"
          >
            <Printer className="w-5 h-5" />
          </button>
          <button
            onClick={handleShareClick}
            className="p-2 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-md transition-all duration-200 hover:scale-105"
            aria-label="Share recipe"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <button
            onClick={handleFavoriteClick}
            className="p-2 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-md transition-all duration-200 hover:scale-105"
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <Heart
              className={`w-5 h-5 transition-colors duration-300 ${
                isFavorite ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary text-white mb-3 shadow-sm">
              {recipe.difficulty === "easy"
                ? "Easy"
                : recipe.difficulty === "medium"
                ? "Medium"
                : "Advanced"}
            </div>

            <h1 className="text-3xl md:text-5xl font-display font-semibold tracking-tight mb-4 animate-fade-in">
              {recipe.title}
            </h1>

            <div className="flex flex-wrap items-center space-x-6 text-white/90 mb-10 animate-fade-in">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1.5" />
                <span>{recipe.readyInMinutes} mins</span>
              </div>

              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1.5" />
                <span>{recipe.servings} servings</span>
              </div>

              <div className="flex items-center">
                <ChefHat className="w-4 h-4 mr-1.5" />
                <span>{recipe.method}</span>
              </div>

              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1.5 fill-yellow-400 text-yellow-400" />
                <span>{(Math.random() * (5 - 4) + 4).toFixed(1)}</span>
              </div>

              {recipe.sourceUrl && (
                <button
                  onClick={handleSourceClick}
                  className="flex items-center text-white/90 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4 mr-1.5" />
                  <span>{recipe.sourceName}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <div
              className="prose dark:prose-invert max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: recipe.summary }}
            />

            <div className="flex mb-6 border-b dark:border-gray-700">
              <button
                className={`pb-3 px-4 font-medium text-sm transition-colors relative ${
                  activeTab === "ingredients"
                    ? "text-primary"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
                onClick={() => setActiveTab("ingredients")}
              >
                Ingredients
                {activeTab === "ingredients" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
              <button
                className={`pb-3 px-4 font-medium text-sm transition-colors relative ${
                  activeTab === "instructions"
                    ? "text-primary"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
                onClick={() => setActiveTab("instructions")}
              >
                Instructions
                {activeTab === "instructions" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            </div>

            {activeTab === "ingredients" && (
              <div className="animate-fade-in">
                <div className="mb-6">
                  <h2 className="text-lg font-medium mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-primary" />
                    Ingredients for {recipe.servings} servings
                  </h2>
                  <ul className="grid gap-3 md:grid-cols-2">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li
                        key={index}
                        className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                      >
                        {ingredient.image && (
                          <img
                            src={ingredient.image}
                            alt={ingredient.name}
                            className="w-10 h-10 rounded-full object-cover mr-3"
                          />
                        )}
                        <div>
                          <div className="font-medium">{ingredient.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {ingredient.amount}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5">
                  <h2 className="text-lg font-medium mb-4 flex items-center">
                    <Info className="w-5 h-5 mr-2 text-primary" />
                    Nutrition Information
                  </h2>
                  <NutritionLabel
                    nutrition={recipe.nutrition}
                    servings={recipe.servings}
                  />
                </div>
              </div>
            )}

            {activeTab === "instructions" && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-medium mb-6">
                  Cooking Instructions
                </h2>
                <ol className="space-y-6 mb-6">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex">
                      <div className="mr-4 flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
                          {index + 1}
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-700 dark:text-gray-300 mb-3">
                          {instruction}
                        </p>
                        {index < recipe.instructions.length - 1 && (
                          <div className="border-b border-dashed dark:border-gray-700 pt-3" />
                        )}
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5">
                  <h3 className="font-medium mb-2">Tips for Success</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Read through the recipe completely before starting.</li>
                    <li>Prep all ingredients before beginning to cook.</li>
                    <li>Adjust seasoning to your personal taste.</li>
                    <li>
                      Use a meat thermometer for perfect results, if applicable.
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleSourceClick}
            className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full 
                      hover:bg-primary/20 transition-colors"
          >
            <ExternalLink className="w-4 h-4 mr-1.5" />
            View Original Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
