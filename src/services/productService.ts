import { supabase, Product } from '../lib/supabase';

// Сервис для работы с товарами
export class ProductService {
  // Получить все активные товары
  static async getAllProducts(): Promise<Product[]> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Ошибка загрузки товаров:', error);
        // Возвращаем пустой массив вместо выброса ошибки
        return [];
      }

      return data || [];
    } catch (error: unknown) {
      console.error('Ошибка при получении товаров:', error);
      // Возвращаем пустой массив для graceful degradation
      return [];
    }
  }

  // Получить товары по категории
  static async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Ошибка загрузки товаров по категории:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Ошибка при получении товаров по категории:', error);
      return [];
    }
  }

  // Поиск товаров с улучшенной обработкой ошибок
  static async searchProducts(searchTerm: string): Promise<Product[]> {
    try {
      // Добавляем таймаут для мобильных соединений
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 секунд

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`)
        .order('created_at', { ascending: false })
        .abortSignal(controller.signal);

      clearTimeout(timeoutId);

      if (error) {
        console.error('Ошибка поиска товаров:', error);
        return [];
      }

      return data || [];
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.warn('Поиск товаров прерван по таймауту');
      } else {
        console.error('Ошибка при поиске товаров:', error);
      }
      return [];
    }
  }

  // Получить товар по ID
  static async getProductById(id: number): Promise<Product | null> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single();

      if (error) {
        console.error('Ошибка загрузки товара:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Ошибка при получении товара:', error);
      return null;
    }
  }
}

// Сервис для работы с категориями
export class CategoryService {
  // Получить все активные категории с улучшенной обработкой ошибок
  static async getAllCategories(): Promise<string[]> {
    try {
      // Добавляем таймаут для мобильных соединений
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 секунд

      const { data, error } = await supabase
        .from('products')
        .select('category')
        .eq('is_active', true)
        .abortSignal(controller.signal);

      clearTimeout(timeoutId);

      if (error) {
        console.error('Ошибка загрузки категорий:', error);
        // Возвращаем базовые категории как fallback
        return [
          'Штукатурка',
          'Аквапанель Кнауф и АрмПанель',
          'Белтермо',
          'Бетоноконтакт и грунтовки',
          'Геотекстиль',
          'Гипсокартон',
          'Утеплитель Пеноплекс',
          'Утеплитель Роквул'
        ];
      }

      // Получаем уникальные категории
      const uniqueCategories = [...new Set(data?.map(item => item.category) || [])];
      return uniqueCategories.sort();
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.warn('Загрузка категорий прервана по таймауту');
      } else {
        console.error('Ошибка при получении категорий:', error);
      }
      // Возвращаем базовые категории как fallback
      return [
        'Штукатурка',
        'Аквапанель Кнауф и АрмПанель',
        'Белтермо',
        'Бетоноконтакт и грунтовки',
        'Геотекстиль',
        'Гипсокартон',
        'Утеплитель Пеноплекс',
        'Утеплитель Роквул'
      ];
    }
  }
}