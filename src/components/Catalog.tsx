import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import CategoryNavigation from './CategoryNavigation';
import LoadingSpinner from './LoadingSpinner';
import { useProducts } from '../hooks/useProducts';
import { useProductSearch } from '../hooks/useProducts';

interface CatalogProps {
  searchTerm?: string;
}

const Catalog: React.FC<CatalogProps> = ({ searchTerm = '' }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Используем хуки для загрузки данных
  const { products: allProducts, loading: allLoading, error: allError } = useProducts();
  const { products: searchProducts, loading: searchLoading } = useProductSearch(searchTerm);

  // Определяем какие товары показывать
  const filteredProducts = useMemo(() => {
    // Если есть поисковый запрос, показываем результаты поиска
    if (searchTerm.trim()) {
      return searchProducts;
    }

    // Иначе фильтруем по категории
    if (activeCategory === 'all') {
      return allProducts;
    }

    return allProducts.filter(product => product.category === activeCategory);
  }, [allProducts, searchProducts, activeCategory, searchTerm]);

  const loading = searchTerm.trim() ? searchLoading : allLoading;

  if (allError) {
    return (
      <section id="catalog" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="text-orange-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Проблемы с подключением
            </h3>
            <p className="text-gray-500 mb-4">
              Не удается загрузить товары. Проверьте подключение к интернету.
            </p>
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <p>• Попробуйте обновить страницу</p>
              <p>• Проверьте настройки сети</p>
              <p>• Если проблема повторяется, свяжитесь с нами</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Обновить страницу
              </button>
              <a
                href="tel:+79774536161"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Позвонить нам
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="catalog" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Каталог строительных материалов
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Широкий ассортимент качественных строительных материалов от ведущих производителей. 
            Все необходимое для вашего строительства и ремонта в одном месте.
          </p>
        </div>
        
        <CategoryNavigation 
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        
        {/* Search Results Info */}
        {searchTerm.trim() && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-800">
                  Результаты поиска: "{searchTerm}"
                </h3>
                <p className="text-blue-600 text-sm mt-1">
                  {loading ? 'Поиск...' : `Найдено товаров: ${filteredProducts.length}`}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        )}
        
        {/* Products Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-4m-12 0H4m8 0V9m0 4v6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {searchTerm.trim() ? 'Товары не найдены' : 'Товары не найдены'}
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm.trim() 
                ? `По запросу "${searchTerm}" ничего не найдено. Попробуйте изменить поисковый запрос.`
                : 'В выбранной категории пока нет товаров'
              }
            </p>
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <p>Вы можете:</p>
              <p>• Связаться с нами для уточнения наличия</p>
              <p>• Посмотреть другие категории</p>
              <p>• Позвонить для консультации</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {searchTerm.trim() && (
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Сбросить поиск
                </button>
              )}
              <a
                href="tel:+79774536161"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Позвонить нам
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Catalog;