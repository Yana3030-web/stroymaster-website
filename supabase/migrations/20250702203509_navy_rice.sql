/*
  # Создание таблицы товаров и категорий

  1. Новые таблицы
    - `products`
      - `id` (bigint, primary key)
      - `name` (text) - название товара
      - `price` (numeric) - цена товара
      - `image` (text) - URL изображения
      - `description` (text) - описание товара
      - `category` (text) - категория товара
      - `is_active` (boolean) - активен ли товар
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Безопасность
    - Включить RLS для таблицы products
    - Разрешить чтение всем пользователям
    - Разрешить изменения только аутентифицированным пользователям

  3. Индексы
    - Индекс по категории для быстрого поиска
    - Индекс по активности товара
*/

-- Создание таблицы товаров
CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(10,2) DEFAULT 0,
  image TEXT NOT NULL,
  description TEXT DEFAULT '',
  category TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Включение Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Политика для чтения - все могут читать активные товары
CREATE POLICY "Все могут читать активные товары"
  ON products
  FOR SELECT
  USING (is_active = true);

-- Политика для вставки - только аутентифицированные пользователи
CREATE POLICY "Только аутентифицированные могут добавлять товары"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Политика для обновления - только аутентифицированные пользователи
CREATE POLICY "Только аутентифицированные могут обновлять товары"
  ON products
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Политика для удаления - только аутентифицированные пользователи
CREATE POLICY "Только аутентифицированные могут удалять товары"
  ON products
  FOR DELETE
  TO authenticated
  USING (true);

-- Создание индексов для оптимизации запросов
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);

-- Функция для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Триггер для автоматического обновления updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();