import { useState, useEffect } from 'react';
import { CategoryService } from '../services/productService';

export const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await CategoryService.getAllCategories();
        setCategories(data);
      } catch (err) {
        setError('Ошибка загрузки категорий');
        console.error('Ошибка загрузки категорий:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return {
    categories,
    loading,
    error
  };
};