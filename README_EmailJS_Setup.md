# Настройка EmailJS для отправки заказов на почту

## Что такое EmailJS?

EmailJS - это сервис, который позволяет отправлять email прямо из браузера без серверной части. Это идеальное решение для статических сайтов и SPA приложений.

## Пошаговая настройка

### 1. Регистрация в EmailJS

1. Перейдите на сайт [EmailJS](https://www.emailjs.com/)
2. Нажмите "Sign Up" и создайте аккаунт
3. Подтвердите email адрес

### 2. Создание Email Service

1. В панели управления EmailJS перейдите в раздел **"Email Services"**
2. Нажмите **"Add New Service"**
3. Выберите ваш email провайдер (Gmail, Outlook, Yahoo и др.)
4. Следуйте инструкциям для подключения вашего email аккаунта
5. Скопируйте **Service ID** (например: `service_abc123`)

### 3. Создание Email Template

1. Перейдите в раздел **"Email Templates"**
2. Нажмите **"Create New Template"**
3. Настройте шаблон письма:

**Пример шаблона для заказа:**

**Subject (Тема письма):**
```
Новый заказ от {{customer_name}} - СтройМатериалы
```

**Content (Содержимое письма):**
```html
<h2>Новый заказ с сайта СтройМатериалы</h2>

<h3>Данные клиента:</h3>
<p><strong>Имя:</strong> {{customer_name}}</p>
<p><strong>Телефон:</strong> {{customer_phone}}</p>
<p><strong>Email:</strong> {{customer_email}}</p>
<p><strong>Адрес доставки:</strong> {{customer_address}}</p>
<p><strong>Комментарий:</strong> {{customer_message}}</p>

<h3>Детали заказа:</h3>
<p><strong>Дата заказа:</strong> {{order_date}}</p>
<p><strong>Количество товаров:</strong> {{items_count}}</p>
<p><strong>Общая сумма:</strong> {{total_price}}</p>

<h3>Заказанные товары:</h3>
<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #f5f5f5;">
      <th style="padding: 8px; text-align: left;">Товар</th>
      <th style="padding: 8px; text-align: center;">Количество</th>
      <th style="padding: 8px; text-align: right;">Цена</th>
      <th style="padding: 8px; text-align: right;">Сумма</th>
    </tr>
  </thead>
  <tbody>
    {{{order_items_html}}}
  </tbody>
</table>

<hr>
<p style="color: #666; font-size: 12px;">
  Это письмо отправлено автоматически с сайта СтройМатериалы
</p>
```

4. Сохраните шаблон и скопируйте **Template ID** (например: `template_xyz789`)

### 4. Получение Public Key

1. Перейдите в раздел **"Account"** → **"General"**
2. Найдите **"Public Key"** и скопируйте его (например: `abc123xyz789`)

### 5. Настройка в коде

Откройте файл `src/services/emailService.ts` и замените значения:

```typescript
const EMAILJS_CONFIG = {
  serviceId: 'service_abc123',     // Ваш Service ID
  templateId: 'template_xyz789',   // Ваш Template ID
  publicKey: 'abc123xyz789',       // Ваш Public Key
};
```

### 6. Тестирование

1. Запустите приложение: `npm run dev`
2. Добавьте товары в корзину
3. Заполните форму заказа
4. Отправьте заказ
5. Проверьте почту - должно прийти письмо с деталями заказа

## Дополнительные настройки

### Настройка получателей

В шаблоне EmailJS вы можете указать:
- **To Email:** ваш email для получения заказов
- **From Name:** название вашего сайта
- **Reply To:** email клиента (используйте `{{customer_email}}`)

### Автоответ клиенту

Создайте второй шаблон для отправки подтверждения клиенту:

1. Создайте новый шаблон с **To Email:** `{{customer_email}}`
2. Настройте содержимое как подтверждение заказа
3. Добавьте отправку второго письма в код

### Ограничения бесплатного плана

- 200 писем в месяц
- Базовая поддержка
- Для больших объемов рассмотрите платные планы

## Устранение проблем

### Письма не приходят

1. Проверьте папку "Спам"
2. Убедитесь, что Service ID, Template ID и Public Key указаны правильно
3. Проверьте настройки email провайдера в EmailJS

### Ошибки в консоли

1. Откройте Developer Tools (F12)
2. Проверьте вкладку Console на наличие ошибок
3. Убедитесь, что все поля шаблона заполнены

### Fallback решение

Если EmailJS не работает, система автоматически откроет почтовый клиент пользователя с предзаполненным письмом.

## Безопасность

- Public Key безопасен для использования в браузере
- Никогда не используйте Private Key в frontend коде
- Рассмотрите добавление капчи для защиты от спама

## Поддержка

- [Документация EmailJS](https://www.emailjs.com/docs/)
- [Примеры интеграции](https://www.emailjs.com/docs/examples/)
- [FAQ](https://www.emailjs.com/docs/faq/)