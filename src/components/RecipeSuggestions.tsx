import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Search, TrendingUp } from "lucide-react";

interface SuggestionProps {
  query: string;
}

// Predefined suggestion categories based on potential user interests
const suggestionsMap: Record<string, string[]> = {
  default: [
    "Quick weeknight dinners",
    "Healthy meal prep",
    "Comfort food classics",
    "Breakfast ideas",
  ],
  chicken: [
    "Chicken stir-fry",
    "Baked chicken parmesan",
    "Grilled chicken salad",
    "Chicken soup",
  ],
  beef: ["Beef stew", "Classic hamburgers", "Beef and broccoli", "Beef tacos"],
  vegetarian: [
    "Vegetable curry",
    "Stuffed bell peppers",
    "Mushroom risotto",
    "Veggie burgers",
  ],
  pasta: [
    "Spaghetti carbonara",
    "Creamy pasta primavera",
    "Pesto pasta with vegetables",
    "Lasagna",
  ],
  quick: [
    "30-minute meals",
    "5-ingredient recipes",
    "Sheet pan dinners",
    "One-pot recipes",
  ],
  healthy: [
    "Low-calorie options",
    "High-protein meals",
    "Plant-based alternatives",
    "Mediterranean diet",
  ],
  dessert: ["Chocolate cake", "Apple pie", "Ice cream", "Cookies"],
};

// Helper function to get relevant suggestions based on the query
const getRelevantSuggestions = (query: string): string[] => {
  if (!query) return suggestionsMap.default;

  // Check if query matches any of our predefined categories
  const lowerQuery = query.toLowerCase();
  for (const [key, suggestions] of Object.entries(suggestionsMap)) {
    if (lowerQuery.includes(key)) {
      return suggestions;
    }
  }

  // If no match, try to intelligently create suggestions based on the query
  return [
    `Easy ${query} recipes`,
    `${query} for beginners`,
    `Quick ${query} meals`,
    `Healthy ${query} options`,
  ];
};

// Define types for suggestions with icons
type IconType = "trending" | "popular" | "related";

const getSuggestionIcon = (index: number, type: IconType = "related") => {
  if (type === "trending") return <TrendingUp className="w-4 h-4" />;
  if (type === "popular") return <Sparkles className="w-4 h-4" />;
  return <Search className="w-4 h-4" />;
};

const RecipeSuggestions: React.FC<SuggestionProps> = ({ query }) => {
  const suggestions = getRelevantSuggestions(query);
  const suggestionType: IconType = query ? "related" : "popular";

  if (!suggestions.length) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 backdrop-blur-lg rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-3">
          {query ? (
            <Search className="w-4 h-4 text-primary" />
          ) : (
            <TrendingUp className="w-4 h-4 text-primary" />
          )}
          <h3 className="font-medium text-sm">
            {query ? `Ideas for "${query}"` : "Popular Searches"}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <Link
              key={index}
              to={`/?search=${encodeURIComponent(suggestion)}`}
              className="px-3 py-1.5 text-sm bg-primary/10 hover:bg-primary/20 
                       text-primary rounded-full transition-colors duration-200 flex items-center"
            >
              {getSuggestionIcon(index, suggestionType)}
              <span className="ml-1">{suggestion}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeSuggestions;
