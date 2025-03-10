import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Save, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";

const Profile = () => {
  const { user, logout } = useAuth();
  const { favorites, clearAllFavorites } = useFavorites();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-display font-semibold tracking-tight mb-2">
            Not Signed In
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please sign in to view your profile
          </p>
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg shadow-sm"
          >
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      // In a real app, this would make an API call to update user info
      await new Promise((resolve) => setTimeout(resolve, 800));

      // In a real implementation, this would be handled by your backend
      // For now, we'll just show a success message
      toast.success("Profile updated successfully!");

      // Note: This demo doesn't actually update the user context
      // In a real app, you would update the Auth context with the new user data
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleClearFavorites = () => {
    clearAllFavorites();
    toast.success("All favorites have been cleared");
  };

  const handleDeleteAccount = async () => {
    setIsUpdating(true);

    try {
      // In a real app, this would make an API call to delete the account
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Clear all user data
      clearAllFavorites();
      logout();

      toast.success("Your account has been deleted");
      // The logout function will redirect to home
    } catch (error) {
      console.error("Delete account error:", error);
      toast.error("Failed to delete account. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar />

      <div className="container mx-auto py-32 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link
                to="/recipes"
                className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to recipes
              </Link>
            </div>
            <h1 className="text-2xl font-display font-semibold tracking-tight">
              Your Profile
            </h1>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      placeholder="Your name"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70"
                  >
                    {isUpdating ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
            <h2 className="text-xl font-display font-medium mb-4">
              Account Statistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Member Since
                </p>
                <p className="text-lg font-medium">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Saved Recipes
                </p>
                <p className="text-lg font-medium">{favorites.length}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Account Type
                </p>
                <p className="text-lg font-medium">Free</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
            <h2 className="text-xl font-display font-medium mb-4">
              Account Actions
            </h2>
            <div className="space-y-4">
              <button
                onClick={handleClearFavorites}
                className="w-full text-left px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white flex items-center justify-between"
              >
                <span>Clear all saved recipes</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {favorites.length} items
                </span>
              </button>

              <div>
                {!showDeleteConfirm ? (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="w-full text-left px-4 py-3 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
                  >
                    Delete account
                  </button>
                ) : (
                  <div className="p-4 border border-red-300 rounded-lg bg-red-50 dark:bg-red-900/20 dark:border-red-900/30">
                    <p className="text-sm text-red-600 dark:text-red-400 mb-3">
                      Are you sure? This will permanently delete your account
                      and all saved data.
                    </p>
                    <div className="flex space-x-3">
                      <button
                        onClick={handleDeleteAccount}
                        disabled={isUpdating}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg flex items-center"
                      >
                        {isUpdating ? (
                          <>
                            <Loader2 className="animate-spin h-4 w-4 mr-2" />
                            Deleting...
                          </>
                        ) : (
                          "Yes, delete account"
                        )}
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm font-medium rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
