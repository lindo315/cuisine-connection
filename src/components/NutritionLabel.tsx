
import React from 'react';

interface NutritionInfo {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  [key: string]: number;
}

interface NutritionLabelProps {
  nutrition: NutritionInfo;
  servings: number;
}

const NutritionLabel: React.FC<NutritionLabelProps> = ({ nutrition, servings = 1 }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
      <div className="border-b border-gray-200 dark:border-gray-700 pb-3 mb-3">
        <h3 className="text-lg font-bold tracking-tight">Nutrition Facts</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Serving Size: 1 serving ({servings > 1 ? `${servings} servings per recipe` : 'single serving'})</p>
      </div>
      
      <div className="space-y-2 mb-3">
        <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 py-1">
          <div className="font-bold">Calories</div>
          <div>{nutrition.calories}</div>
        </div>
        
        <div className="flex justify-between py-1">
          <div className="font-bold">Total Fat</div>
          <div>{nutrition.fat}g</div>
        </div>
        
        <div className="flex justify-between py-1">
          <div className="font-bold">Total Carbohydrates</div>
          <div>{nutrition.carbs}g</div>
        </div>
        
        <div className="flex justify-between py-1">
          <div className="font-bold">Protein</div>
          <div>{nutrition.protein}g</div>
        </div>
      </div>
      
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-3">
        * Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs.
      </div>
    </div>
  );
};

export default NutritionLabel;
