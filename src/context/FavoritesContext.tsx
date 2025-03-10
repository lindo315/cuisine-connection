import React, { createContext, useState, useContext, useEffect } from "react";
import { Recipe } from "../components/RecipeCard";
import { useAuth } from "./AuthContext";

interface FavoritesContextType {
  favorites: Recipe[];
  toggleFavorite: (recipe: Recipe) => void;
  isFavorite: (recipeId: number) => boolean;
  clearAllFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const { user } = useAuth();

  // Load favorites from localStorage when component mounts or user changes
  useEffect(() => {
    const loadFavorites = () => {
      if (!user) {
        // If not logged in, use anonymous favorites (old behavior)
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
          try {
            setFavorites(JSON.parse(storedFavorites));
          } catch (error) {
            console.error("Failed to parse favorites:", error);
            localStorage.removeItem("favorites");
            setFavorites([]);
          }
        }
      } else {
        // If logged in, use user-specific favorites
        const storedFavorites = localStorage.getItem(`favorites_${user.id}`);
        if (storedFavorites) {
          try {
            setFavorites(JSON.parse(storedFavorites));
          } catch (error) {
            console.error("Failed to parse user favorites:", error);
            localStorage.removeItem(`favorites_${user.id}`);
            setFavorites([]);
          }
        } else {
          // If no user-specific favorites found, check if anonymous favorites exist and migrate them
          const anonFavorites = localStorage.getItem("favorites");
          if (anonFavorites) {
            try {
              setFavorites(JSON.parse(anonFavorites));
            } catch (error) {
              console.error("Failed to migrate anonymous favorites:", error);
              setFavorites([]);
            }
          } else {
            setFavorites([]);
          }
        }
      }
    };

    loadFavorites();
  }, [user]);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (favorites.length > 0) {
      if (user) {
        localStorage.setItem(`favorites_${user.id}`, JSON.stringify(favorites));
      } else {
        localStorage.setItem("favorites", JSON.stringify(favorites));
      }
    } else {
      if (user) {
        localStorage.removeItem(`favorites_${user.id}`);
      } else {
        localStorage.removeItem("favorites");
      }
    }
  }, [favorites, user]);

  const toggleFavorite = (recipe: Recipe) => {
    setFavorites((prevFavorites) => {
      const existingIndex = prevFavorites.findIndex(
        (item) => item.id === recipe.id
      );
      if (existingIndex >= 0) {
        // Remove from favorites
        const updatedFavorites = [...prevFavorites];
        updatedFavorites.splice(existingIndex, 1);
        return updatedFavorites;
      } else {
        // Add to favorites
        return [recipe, ...prevFavorites];
      }
    });
  };

  const isFavorite = (recipeId: number) => {
    return favorites.some((recipe) => recipe.id === recipeId);
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    if (user) {
      localStorage.removeItem(`favorites_${user.id}`);
    } else {
      localStorage.removeItem("favorites");
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite, clearAllFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
