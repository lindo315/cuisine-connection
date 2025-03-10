
import React, { useState } from 'react';

interface FilterOption {
  id: string;
  label: string;
  category: 'diet' | 'cuisine' | 'mealType';
}

interface FilterSectionProps {
  onFilterChange: (filters: Record<string, boolean>) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ onFilterChange }) => {
  const filterOptions: FilterOption[] = [
    // Diet
    { id: 'vegetarian', label: 'Vegetarian', category: 'diet' },
    { id: 'vegan', label: 'Vegan', category: 'diet' },
    { id: 'gluten-free', label: 'Gluten Free', category: 'diet' },
    { id: 'keto', label: 'Keto', category: 'diet' },
    // Cuisine
    { id: 'italian', label: 'Italian', category: 'cuisine' },
    { id: 'mexican', label: 'Mexican', category: 'cuisine' },
    { id: 'asian', label: 'Asian', category: 'cuisine' },
    { id: 'mediterranean', label: 'Mediterranean', category: 'cuisine' },
    // Meal Type
    { id: 'breakfast', label: 'Breakfast', category: 'mealType' },
    { id: 'lunch', label: 'Lunch', category: 'mealType' },
    { id: 'dinner', label: 'Dinner', category: 'mealType' },
    { id: 'dessert', label: 'Dessert', category: 'mealType' },
  ];

  const [selectedFilters, setSelectedFilters] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState<string>('diet');

  const handleFilterClick = (id: string) => {
    const updatedFilters = { 
      ...selectedFilters, 
      [id]: !selectedFilters[id] 
    };
    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in pt-4 pb-8">
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
                     ${activeCategory === 'diet' 
                       ? 'bg-primary text-white shadow-sm' 
                       : 'text-gray-500 hover:bg-gray-100'}`}
          onClick={() => setActiveCategory('diet')}
        >
          Dietary
        </button>
        <button
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
                     ${activeCategory === 'cuisine' 
                       ? 'bg-primary text-white shadow-sm' 
                       : 'text-gray-500 hover:bg-gray-100'}`}
          onClick={() => setActiveCategory('cuisine')}
        >
          Cuisine
        </button>
        <button
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
                     ${activeCategory === 'mealType' 
                       ? 'bg-primary text-white shadow-sm' 
                       : 'text-gray-500 hover:bg-gray-100'}`}
          onClick={() => setActiveCategory('mealType')}
        >
          Meal Type
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-2 px-4">
        {filterOptions
          .filter(option => option.category === activeCategory)
          .map(option => (
            <button
              key={option.id}
              onClick={() => handleFilterClick(option.id)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-200
                         ${selectedFilters[option.id]
                           ? 'bg-primary/10 text-primary border-primary/20'
                           : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                         border border-transparent`}
            >
              {option.label}
            </button>
          ))}
      </div>
    </div>
  );
};

export default FilterSection;
