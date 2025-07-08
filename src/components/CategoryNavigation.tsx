import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Grid3X3 } from 'lucide-react';
import { useCategories } from '../hooks/useCategories';

interface CategoryNavigationProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryNavigation: React.FC<CategoryNavigationProps> = ({ 
  activeCategory, 
  onCategoryChange 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Загружаем категории из базы данных
  const { categories, loading: categoriesLoading } = useCategories();

  const filteredCategories = categories.filter(category =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategorySelect = (category: string) => {
    onCategoryChange(category);
    setIsDropdownOpen(false);
    setSearchTerm('');
  };

  const getCurrentCategoryName = () => {
    if (activeCategory === 'all') return 'Все категории';
    return activeCategory;
  };

  // Популярные категории для быстрого доступа
  const popularCategories = [
    'Утеплитель Техноплекс Технониколь', 
    'Гидро-пароизоляция Дельта (Delta)', 
    'Гидро-пароизоляция Финка и Ситко', 
    'Гидро-пароизоляция Ондутис'
  ].filter(cat => categories.includes(cat));

  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        {/* Category Dropdown */}
        <div className="relative w-full lg:w-80" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={categoriesLoading}
          >
            <div className="flex items-center">
              <Grid3X3 size={20} className="text-gray-500 mr-3" />
              <span className="text-gray-700 font-medium truncate">
                {categoriesLoading ? 'Загрузка...' : getCurrentCategoryName()}
              </span>
            </div>
            <ChevronDown 
              size={20} 
              className={`text-gray-500 transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`} 
            />
          </button>

          {isDropdownOpen && !categoriesLoading && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-hidden">
              {/* Search */}
              <div className="p-3 border-b border-gray-100">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Поиск категории..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Categories List */}
              <div className="max-h-80 overflow-y-auto">
                <button
                  onClick={() => handleCategorySelect('all')}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 ${
                    activeCategory === 'all' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                  }`}
                >
                  Все категории
                </button>
                
                {filteredCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 ${
                      activeCategory === category ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
                
                {filteredCategories.length === 0 && (
                  <div className="px-4 py-6 text-center text-gray-500">
                    Категории не найдены
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Quick Category Buttons */}
        {popularCategories.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center lg:justify-end">
            {popularCategories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                {category.length > 20 ? `${category.substring(0, 20)}...` : category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Active Category Display */}
      {activeCategory !== 'all' && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-blue-800">
                {activeCategory}
              </h3>
              <p className="text-blue-600 text-sm mt-1">
                Выбранная категория товаров
              </p>
            </div>
            <button
              onClick={() => onCategoryChange('all')}
              className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-md transition-colors"
            >
              Сбросить
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryNavigation;