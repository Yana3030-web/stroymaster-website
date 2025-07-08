# Руководство по развертыванию на Vercel

## Почему Vercel?

Vercel работает в России без VPN и обеспечивает:
- Быструю загрузку сайта в России
- Автоматическое развертывание из GitHub
- Бесплатный SSL сертификат
- CDN с серверами по всему миру
- Простую настройку переменных окружения

## Пошаговая инструкция

### 1. Подготовка GitHub репозитория

1. Создайте новый репозиторий на GitHub:
   - Перейдите на [github.com](https://github.com)
   - Нажмите "New repository"
   - Название: `stroymaster-website`
   - Сделайте репозиторий публичным
   - Нажмите "Create repository"

2. Загрузите код в репозиторий:
   ```bash
   # В папке с проектом выполните:
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/ВАШ_USERNAME/stroymaster-website.git
   git push -u origin main
   ```

### 2. Регистрация и настройка Vercel

1. Перейдите на [vercel.com](https://vercel.com)
2. Нажмите "Sign Up" и войдите через GitHub
3. Разрешите Vercel доступ к вашим репозиториям
4. Нажмите "Import Project"
5. Выберите репозиторий `stroymaster-website`

### 3. Настройка проекта в Vercel

1. **Project Name**: `stroymaster-website`
2. **Framework Preset**: Vite
3. **Root Directory**: оставьте пустым (корень проекта)
4. **Build Command**: `npm run vercel-build`
5. **Output Directory**: `dist`
6. **Install Command**: `npm install`

### 4. Настройка переменных окружения

В настройках проекта Vercel перейдите в **Settings** → **Environment Variables** и добавьте:

**Обязательные переменные:**
```
VITE_SUPABASE_URL = https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY = your-anon-key
```

**Опциональные переменные (для EmailJS):**
```
VITE_EMAILJS_SERVICE_ID = your-service-id
VITE_EMAILJS_TEMPLATE_ID = your-template-id
VITE_EMAILJS_PUBLIC_KEY = your-public-key
```

**Важно**: Добавьте переменные для всех окружений:
- Production
- Preview
- Development

### 5. Настройка кастомного домена (опционально)

1. В настройках проекта перейдите в **Domains**
2. Нажмите "Add Domain"
3. Введите ваш домен: `stroymaster11.ru`
4. Настройте DNS записи у вашего регистратора:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   
   Type: A
   Name: @
   Value: 76.76.19.19
   ```

### 6. Первое развертывание

1. Нажмите "Deploy" в Vercel
2. Дождитесь завершения сборки (обычно 1-3 минуты)
3. Получите ссылку на сайт: `https://stroymaster-website.vercel.app`

### 7. Проверка работоспособности

1. Откройте сайт в браузере **без VPN**
2. Проверьте загрузку товаров из Supabase
3. Протестируйте отправку заказа
4. Убедитесь, что все изображения загружаются

## Автоматическое развертывание

После настройки каждый push в GitHub будет автоматически:
1. Запускать новую сборку в Vercel
2. Развертывать изменения на сайте
3. Обновлять production версию

## Мониторинг и аналитика

### Встроенная аналитика Vercel
1. В панели Vercel перейдите в **Analytics**
2. Просматривайте статистику посещений
3. Отслеживайте производительность сайта

### Подключение внешней аналитики
Добавьте в `index.html`:

**Яндекс.Метрика:**
```html
<!-- Yandex.Metrika counter -->
<script type="text/javascript">
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(XXXXXXXX, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   });
</script>
```

## Оптимизация для России

### 1. Настройка CDN
Vercel автоматически использует ближайшие серверы, включая европейские.

### 2. Сжатие ресурсов
Vercel автоматически сжимает CSS, JS и изображения.

### 3. Кэширование
Статические ресурсы кэшируются на 1 год, HTML - на короткое время.

## Устранение проблем

### Ошибка 404 при переходе по ссылкам
Файл `vercel.json` уже настроен для SPA маршрутизации.

### Переменные окружения не работают
1. Проверьте правильность названий переменных
2. Убедитесь, что они добавлены для всех окружений
3. Пересоберите проект после добавления переменных

### Медленная загрузка в России
1. Проверьте размер изображений (оптимизируйте до 300KB)
2. Используйте WebP формат для изображений
3. Минимизируйте количество внешних запросов

### Проблемы с Supabase
1. Убедитесь, что Supabase URL и ключи корректны
2. Проверьте RLS политики в Supabase
3. Увеличьте таймауты для мобильных соединений

## Резервное копирование

### Автоматическое
Vercel сохраняет все развертывания, можно откатиться к любой версии.

### Ручное
```bash
# Скачать текущую версию
vercel pull
```

## Стоимость

**Hobby план (бесплатно):**
- 100GB пропускной способности
- Неограниченные сайты
- Автоматический SSL
- Аналитика

**Pro план ($20/месяц):**
- 1TB пропускной способности
- Расширенная аналитика
- Приоритетная поддержка

Для большинства сайтов бесплатного плана достаточно.

## Поддержка

- [Документация Vercel](https://vercel.com/docs)
- [Сообщество Discord](https://vercel.com/discord)
- [GitHub Issues](https://github.com/vercel/vercel/issues)

## Контрольный список

- [ ] Создан GitHub репозиторий
- [ ] Код загружен в GitHub
- [ ] Проект импортирован в Vercel
- [ ] Настроены переменные окружения
- [ ] Выполнено первое развертывание
- [ ] Сайт работает без VPN в России
- [ ] Товары загружаются из Supabase
- [ ] Форма заказа работает корректно
- [ ] Настроен кастомный домен (опционально)
- [ ] Подключена аналитика (опционально)

После выполнения всех шагов ваш сайт будет доступен в России без VPN!