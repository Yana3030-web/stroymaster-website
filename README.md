# СтройМастер - Интернет-магазин строительных материалов

Современный интернет-магазин строительных материалов, построенный на React + TypeScript + Vite с использованием Supabase в качестве backend.

## 🚀 Технологии

- **Frontend**: React 18, TypeScript, Vite
- **Стилизация**: Tailwind CSS
- **База данных**: Supabase (PostgreSQL)
- **Email**: EmailJS
- **Иконки**: Lucide React
- **Хостинг**: Vercel

## 📦 Возможности

- ✅ Каталог товаров с поиском и фильтрацией
- ✅ Корзина покупок
- ✅ Форма заказа с отправкой на email
- ✅ Адаптивный дизайн
- ✅ SEO оптимизация
- ✅ Админ-панель через Supabase
- ✅ Работает в России без VPN

## 🛠 Установка и запуск

### Локальная разработка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/your-username/stroymaster-website.git
cd stroymaster-website
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл `.env` и добавьте переменные окружения:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_EMAILJS_SERVICE_ID=your-service-id
VITE_EMAILJS_TEMPLATE_ID=your-template-id
VITE_EMAILJS_PUBLIC_KEY=your-public-key
```

4. Запустите проект:
```bash
npm run dev
```

### Развертывание на Vercel

Подробная инструкция находится в файле `VERCEL_DEPLOYMENT_GUIDE.md`.

## 📁 Структура проекта

```
src/
├── components/          # React компоненты
├── context/            # React Context (корзина)
├── hooks/              # Кастомные хуки
├── lib/                # Конфигурация Supabase
├── services/           # Сервисы (email, продукты)
└── index.css          # Глобальные стили

supabase/
└── migrations/         # SQL миграции для базы данных

public/                 # Статические файлы
```

## 🗄 База данных

Проект использует Supabase с таблицей `products`:

- `id` - уникальный идентификатор
- `name` - название товара
- `price` - цена (0 = по запросу)
- `image` - URL изображения
- `description` - описание
- `category` - категория
- `is_active` - активность товара

## 📧 Настройка Email

1. Зарегистрируйтесь на [EmailJS](https://www.emailjs.com/)
2. Создайте email service
3. Создайте email template
4. Добавьте ключи в переменные окружения

Подробная инструкция в файле `README_EmailJS_Setup.md`.

## 👨‍💼 Управление товарами

Товары управляются через админ-панель Supabase:

1. Откройте [supabase.com](https://supabase.com)
2. Перейдите в Table Editor
3. Выберите таблицу `products`
4. Добавляйте, редактируйте или деактивируйте товары

Подробное руководство в файле `ADMIN_GUIDE.md`.

## 🔧 Скрипты

- `npm run dev` - запуск в режиме разработки
- `npm run build` - сборка для продакшена
- `npm run vercel-build` - сборка для Vercel
- `npm run preview` - предварительный просмотр сборки
- `npm run lint` - проверка кода ESLint

## 🌐 SEO

- Настроены meta теги
- Добавлен robots.txt
- Создан sitemap.xml
- Оптимизированы изображения
- Настроена структура URL

## 📱 Адаптивность

Сайт полностью адаптирован для:
- Мобильных устройств (320px+)
- Планшетов (768px+)
- Десктопов (1024px+)

## 🚀 Производительность

- Lazy loading изображений
- Минификация CSS/JS
- Сжатие ресурсов
- CDN через Vercel
- Оптимизированные шрифты

## 📞 Поддержка

- Email: stroymaster.store@bk.ru
- Телефон: +7 (977) 453-61-61
- Рабочие часы: Пн-Сб 9:00-18:00, Вс 9:00-16:00

## 📄 Лицензия

Этот проект создан для компании СтройМастер. Все права защищены.# stroymaster-website
# stroymaster-website
