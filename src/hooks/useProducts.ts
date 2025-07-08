import { useState, useEffect } from 'react';
import { Product } from '../lib/supabase';
import { ProductService } from '../services/productService';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ProductService.getAllProducts();
      setProducts(data);
    } catch (err) {
      setError('Ошибка загрузки товаров');
      console.error('Ошибка загрузки товаров:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return {
    products,
    loading,
    error,
    refetch: loadProducts
  };
};

export const useProductsByCategory = (category: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = category === 'all' 
          ? await ProductService.getAllProducts()
          : await ProductService.getProductsByCategory(category);
        setProducts(data);
      } catch (err) {
        setError('Ошибка загрузки товаров');
        console.error('Ошибка загрузки товаров:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category]);

  return {
    products,
    loading,
    error
  };
};

export const useProductSearch = (searchTerm: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setProducts([]);
      return;
    }

    const searchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await ProductService.searchProducts(searchTerm);
        setProducts(data);
      } catch (err) {
        setError('Ошибка поиска товаров');
        console.error('Ошибка поиска товаров:', err);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(searchProducts, 300); // Debounce
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return {
    products,
    loading,
    error
  };
};