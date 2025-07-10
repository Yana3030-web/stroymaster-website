import emailjs from '@emailjs/browser';

// Конфигурация EmailJS
const EMAILJS_CONFIG = {
  serviceId: 'service_skko54h', // Замените на ваш Service ID
  templateId: 'template_dgrsx62', // Замените на ваш Template ID
  publicKey: '_UQmfmuTVOm_5kXNh', // Замените на ваш Public Key
};

// Инициализация EmailJS с дополнительными настройками
try {
  emailjs.init({
    publicKey: EMAILJS_CONFIG.publicKey,
    blockHeadless: true,
    limitRate: {
      id: 'app',
      throttle: 10000,
    },
  });
} catch (error) {
  console.warn('EmailJS initialization failed:', error);
}

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface OrderData {
  name: string;
  phone: string;
  email: string;
  address: string;
  message: string;
  items: OrderItem[];
  totalPrice: number;
  orderDate: string;
}

// Функция для форматирования цены
const formatPrice = (price: number): string => {
  return price > 0 ? `${price.toLocaleString('ru-RU')} ₽` : 'По запросу';
};

// Функция для форматирования даты
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Функция для создания HTML таблицы товаров
const createItemsTable = (items: OrderItem[]): string => {
  const rows = items.map(item => {
    const itemTotal = item.price > 0 ? item.price * item.quantity : 0;
    return `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${item.name}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${formatPrice(item.price)}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${formatPrice(itemTotal)}</td>
      </tr>
    `;
  }).join('');

  return `
    <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
      <thead>
        <tr style="background-color: #f5f5f5;">
          <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Товар</th>
          <th style="padding: 8px; border: 1px solid #ddd; text-align: center;">Количество</th>
          <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Цена за ед.</th>
          <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Сумма</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
};

export const sendOrderEmail = async (orderData: OrderData): Promise<boolean> => {
  try {
    // Создаем HTML таблицу товаров
    const itemsTableHTML = createItemsTable(orderData.items);
    
    // Создаем простой список товаров для текстовой версии
    const itemsList = orderData.items.map(item => {
      const itemTotal = item.price > 0 ? item.price * item.quantity : 0;
      return `• ${item.name} - ${item.quantity} шт. × ${formatPrice(item.price)} = ${formatPrice(itemTotal)}`;
    }).join('\n');

    // Параметры для шаблона EmailJS
    const templateParams = {
      // Данные клиента
      customer_name: orderData.name,
      customer_phone: orderData.phone,
      customer_email: orderData.email,
      customer_address: orderData.address,
      customer_message: orderData.message || 'Нет комментариев',
      
      // Данные заказа
      order_date: formatDate(orderData.orderDate),
      items_count: orderData.items.length,
      total_price: formatPrice(orderData.totalPrice),
      
      // HTML таблица товаров
      order_items_html: itemsTableHTML,
      
      // Текстовый список товаров (для резерва)
      order_items_text: itemsList,
      
      // Дополнительная информация
      site_name: 'СтройМастер',
      order_id: `ORD-${Date.now()}`,
    };

    console.log('Отправка email с параметрами:', templateParams);

    // Отправка email через EmailJS с таймаутом
    const emailPromise = emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );

    // Добавляем таймаут для мобильных соединений
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Email timeout')), 15000);
    });

    const response = await Promise.race([emailPromise, timeoutPromise]);

    console.log('Email отправлен успешно:', response);
    return true;

  } catch (error) {
    console.error('Ошибка отправки email:', error);
    
    // Альтернативный способ - открыть почтовый клиент
    const subject = `Новый заказ от ${orderData.name} - СтройМастер`;
    const body = `
Новый заказ с сайта СтройМастер

ДАННЫЕ КЛИЕНТА:
Имя: ${orderData.name}
Телефон: ${orderData.phone}
Email: ${orderData.email}
Адрес доставки: ${orderData.address}
${orderData.message ? `Комментарий: ${orderData.message}` : ''}

ДЕТАЛИ ЗАКАЗА:
Дата заказа: ${formatDate(orderData.orderDate)}
Количество товаров: ${orderData.items.length}

ЗАКАЗАННЫЕ ТОВАРЫ:
${orderData.items.map(item => {
  const itemTotal = item.price > 0 ? item.price * item.quantity : 0;
  return `• ${item.name}\n  Количество: ${item.quantity} шт.\n  Цена: ${formatPrice(item.price)}\n  Сумма: ${formatPrice(itemTotal)}`;
}).join('\n\n')}

ОБЩАЯ СУММА: ${formatPrice(orderData.totalPrice)}

---
Это письмо отправлено автоматически с сайта СтройМастер
    `;
    
    // Открываем почтовый клиент как fallback
    try {
      window.open(`mailto:stroymaster.store@bk.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    } catch (mailError) {
      console.error('Не удалось открыть почтовый клиент:', mailError);
    }
    
    throw error;
  }
};

// Функция для проверки конфигурации
export const isEmailJSConfigured = (): boolean => {
  return EMAILJS_CONFIG.serviceId !== 'YOUR_SERVICE_ID' && 
         EMAILJS_CONFIG.templateId !== 'YOUR_TEMPLATE_ID' && 
         EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY';
};
