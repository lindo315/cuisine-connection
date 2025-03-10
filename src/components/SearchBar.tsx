
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialValue = '' }) => {
  const [inputValue, setInputValue] = useState(initialValue);

  // Update the input field when initialValue changes
  useEffect(() => {
    if (initialValue) {
      setInputValue(initialValue);
    }
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-xl mx-auto relative animate-fade-in"
    >
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter ingredients (e.g., chicken, pasta, tomatoes...)"
        className="w-full px-5 py-4 pl-12 rounded-full border border-gray-200 
                   dark:border-gray-700 dark:bg-gray-800 dark:text-white
                   shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20
                   focus:border-primary transition-all duration-300
                   placeholder:text-gray-400 dark:placeholder:text-gray-500 text-base"
      />
      <button 
        type="submit" 
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground p-2.5 
                   rounded-full transition-transform duration-200 hover:scale-105
                   active:scale-95 shadow-sm"
      >
        <Search className="w-5 h-5" />
      </button>
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
        <Search className="w-5 h-5" />
      </div>
    </form>
  );
};

export default SearchBar;
