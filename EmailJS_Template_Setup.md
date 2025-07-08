# Правильная настройка шаблона EmailJS

## Шаг 1: Создание Email Template в EmailJS

1. Войдите в панель управления EmailJS
2. Перейдите в раздел **"Email Templates"**
3. Нажмите **"Create New Template"**

## Шаг 2: Настройка шаблона

### Settings (Настройки):
- **Template Name:** `order_notification`
- **Template ID:** скопируйте этот ID в код

### Email Template:

**To Email:**
```
your-email@example.com
```
*Замените на ваш реальный email для получения заказов*

**From Name:**
```
{{site_name}}
```

**Subject:**
```
Новый заказ №{{order_id}} от {{customer_name}}
```

**Content (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Новый заказ</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .section { margin-bottom: 20px; }
        .section h3 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 5px; }
        .info-row { margin: 5px 0; }
        .info-label { font-weight: bold; }
        table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        th, td { padding: 8px; border: 1px solid #ddd; text-align: left; }
        th { background-color: #f5f5f5; font-weight: bold; }
        .total { font-size: 18px; font-weight: bold; color: #2563eb; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏗️ Новый заказ с сайта {{site_name}}</h1>
            <p>Заказ №{{order_id}}</p>
        </div>
        
        <div class="content">
            <div class="section">
                <h3>👤 Данные клиента</h3>
                <div class="info-row"><span class="info-label">Имя:</span> {{customer_name}}</div>
                <div class="info-row"><span class="info-label">Телефон:</span> {{customer_phone}}</div>
                <div class="info-row"><span class="info-label">Email:</span> {{customer_email}}</div>
                <div class="info-row"><span class="info-label">Адрес доставки:</span> {{customer_address}}</div>
                <div class="info-row"><span class="info-label">Комментарий:</span> {{customer_message}}</div>
            </div>

            <div class="section">
                <h3>📦 Детали заказа</h3>
                <div class="info-row"><span class="info-label">Дата заказа:</span> {{order_date}}</div>
                <div class="info-row"><span class="info-label">Количество товаров:</span> {{items_count}}</div>
            </div>

            <div class="section">
                <h3>🛒 Заказанные товары</h3>
                {{{order_items_html}}}
                <div class="total">
                    Общая сумма: {{total_price}}
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>Это письмо отправлено автоматически с сайта {{site_name}}</p>
            <p>Дата отправки: {{order_date}}</p>
        </div>
    </div>
</body>
</html>
```

**Reply To:**
```
{{customer_email}}
```

## Шаг 3: Настройка Service

1. Перейдите в **"Email Services"**
2. Добавьте ваш email сервис (Gmail, Outlook и т.д.)
3. Скопируйте **Service ID**

## Шаг 4: Получение Public Key

1. Перейдите в **"Account"** → **"General"**
2. Скопируйте **Public Key**

## Шаг 5: Обновление кода

Откройте `src/services/emailService.ts` и замените:

```typescript
const EMAILJS_CONFIG = {
  serviceId: 'ваш_service_id',      // Например: service_abc123
  templateId: 'ваш_template_id',    // Например: template_xyz789  
  publicKey: 'ваш_public_key',      // Например: abc123xyz789
};
```

## Шаг 6: Тестирование

1. Сохраните изменения
2. Перезапустите приложение
3. Добавьте товары в корзину
4. Заполните форму заказа
5. Отправьте заказ
6. Проверьте почту

## Возможные проблемы и решения

### Письма не приходят
- Проверьте папку "Спам"
- Убедитесь, что все ID указаны правильно
- Проверьте настройки email сервиса в EmailJS

### Ошибка "Template not found"
- Убедитесь, что Template ID скопирован правильно
- Проверьте, что шаблон сохранен и активен

### Ошибка "Service not found"
- Проверьте Service ID
- Убедитесь, что email сервис подключен и активен

### Ошибка "Invalid public key"
- Проверьте Public Key
- Убедитесь, что используете Public Key, а не Private Key

## Дополнительные возможности

### Автоответ клиенту
Создайте второй шаблон для отправки подтверждения клиенту:
- **To Email:** `{{customer_email}}`
- **Subject:** `Спасибо за заказ! Заказ №{{order_id}} принят`

### Уведомления в Telegram
Можно настроить дополнительные уведомления через Telegram Bot API

### Сохранение заказов
Рассмотрите интеграцию с Google Sheets или Airtable для сохранения заказов