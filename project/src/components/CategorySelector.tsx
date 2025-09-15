import React from 'react';
import { categories } from '../data/faq';
import { ChevronRight } from 'lucide-react';

interface CategorySelectorProps {
  onCategorySelect: (category: string) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({ onCategorySelect }) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Browse by category:</h3>
      <div className="grid grid-cols-2 gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onCategorySelect(category)}
            className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
          >
            <span className="text-sm text-gray-700 group-hover:text-blue-700">
              {category}
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
          </button>
        ))}
      </div>
    </div>
  );
};