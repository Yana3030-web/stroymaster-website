import React, { useState, useRef, useEffect } from 'react';
import { Send, Check, ShoppingBag, AlertCircle, Mail, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { sendOrderEmail, isEmailJSConfigured } from '../services/emailService';

interface FormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  message: string;
}

const ContactForm = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    address: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isVisible, setIsVisible] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    // Clear submit error
    if (submitError) {
      setSubmitError('');
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Телефон обязателен';
    } else if (!/^(\+7|8)[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/.test(formData.phone)) {
      newErrors.phone = 'Неверный формат телефона';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Неверный формат email';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Адрес обязателен';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const orderData = {
        ...formData,
        items,
        totalPrice,
        orderDate: new Date().toISOString(),
      };

      // Проверяем, настроен ли EmailJS
      if (!isEmailJSConfigured()) {
        // Если EmailJS не настроен, показываем предупреждение и открываем почтовый клиент
        console.warn('EmailJS не настроен, используем fallback');
        
        const subject = `Новый заказ от ${formData.name} - СтройМастер`;
        const body = `
Новый заказ с сайта СтройМастер

ДАННЫЕ КЛИЕНТА:
Имя: ${formData.name}
Телефон: ${formData.phone}
Email: ${formData.email}
Адрес доставки: ${formData.address}
${formData.message ? `Комментарий: ${formData.message}` : ''}

ЗАКАЗАННЫЕ ТОВАРЫ:
${items.map(item => {
  const itemTotal = item.price > 0 ? item.price * item.quantity : 0;
  const priceDisplay = item.price > 0 ? `${item.price.toLocaleString()} ₽` : 'По запросу';
  const totalDisplay = itemTotal > 0 ? `${itemTotal.toLocaleString()} ₽` : 'По запросу';
  return `• ${item.name}\n  Количество: ${item.quantity} шт.\n  Цена: ${priceDisplay}\n  Сумма: ${totalDisplay}`;
}).join('\n\n')}

ОБЩАЯ СУММА: ${totalPrice > 0 ? `${totalPrice.toLocaleString()} ₽` : 'По запросу'}

Дата заказа: ${new Date().toLocaleString('ru-RU')}
        `;
        
        window.open(`mailto:info@stroymaster.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
        
        // Показываем сообщение об успехе
        setIsSubmitted(true);
        clearCart();
        
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            phone: '',
            email: '',
            address: '',
            message: '',
          });
        }, 5000);
        
        return;
      }

      // Если EmailJS настроен, отправляем через него
      await sendOrderEmail(orderData);
      
      setIsSubmitted(true);
      clearCart();
      
      // Reset form after showing success message
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          phone: '',
          email: '',
          address: '',
          message: '',
        });
      }, 5000);
      
    } catch (error) {
      console.error('Ошибка отправки заказа:', error);
      setSubmitError(
        'Произошла ошибка при отправке заказа. Письмо было отправлено через ваш почтовый клиент.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 100;
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const inputClassName = "w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300";
  const errorClassName = "text-red-500 text-sm mt-1";

  return (
    <section id="contact" className="py-16 bg-gradient-to-b from-white to-gray-100">
      <div 
        ref={formRef}
        className={`container mx-auto px-4 transform transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
      >
        <h2 className="text-3xl font-bold text-center mb-2">Оформление заказа</h2>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          Заполните контактную форму, и мы свяжемся с вами для подтверждения заказа и обсуждения деталей доставки
        </p>
        
        {/* Контактная информация */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-4 text-center">
              📞 Или свяжитесь с нами напрямую
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
              <div className="flex items-center justify-center">
                <Phone size={18} className="mr-2 text-blue-600" />
                <span className="text-blue-700 font-medium">+7 (977) 453-61-61</span>
              </div>
              <div className="flex items-center justify-center">
                <Mail size={18} className="mr-2 text-blue-600" />
                <span className="text-blue-700 font-medium">info@stroymaster.ru</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-6 md:p-8 lg:p-10">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <ShoppingBag className="mr-2 text-blue-600" size={22} />
                Ваш заказ
              </h3>
              
              {items.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingBag size={48} className="mx-auto mb-3 opacity-30" />
                  <p>В корзине пока пусто</p>
                  <button 
                    onClick={() => scrollToSection('catalog')}
                    className="mt-4 inline-block text-blue-600 hover:text-blue-800 transition-colors duration-300"
                  >
                    Перейти к каталогу
                  </button>
                </div>
              ) : (
                <>
                  <div className="max-h-64 overflow-y-auto mb-4 pr-2">
                    <ul className="space-y-3">
                      {items.map(item => (
                        <li key={item.id} className="flex items-center border-b border-gray-100 pb-3">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-14 h-14 object-cover rounded-md mr-3"
                          />
                          <div className="flex-1">
                            <h4 className="text-sm font-medium">{item.name}</h4>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-gray-600 text-sm">
                                {item.quantity} × {item.price > 0 ? `${item.price.toLocaleString()} ₽` : 'По запросу'}
                              </span>
                              <span className="font-medium">
                                {item.price > 0 ? `${(item.price * item.quantity).toLocaleString()} ₽` : 'По запросу'}
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t border-gray-200 pt-4 pb-2">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Итого:</span>
                      <span>{totalPrice > 0 ? `${totalPrice.toLocaleString()} ₽` : 'По запросу'}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <div className="md:w-1/2 bg-gradient-to-br from-blue-50 to-blue-100 p-6 md:p-8 lg:p-10">
              {isSubmitted ? (
                <div className="text-center py-10 flex flex-col items-center justify-center h-full animate-fade-in-up">
                  <div className="bg-green-100 rounded-full p-4 mb-4">
                    <Check size={42} className="text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Спасибо за заказ!</h3>
                  <p className="text-gray-600 mb-6">
                    Мы получили вашу заявку и скоро свяжемся с вами для подтверждения
                  </p>
                  <button 
                    onClick={() => scrollToSection('catalog')}
                    className="btn-smooth px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
                  >
                    Вернуться в каталог
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-semibold mb-6">Ваши данные</h3>
                  
                  {submitError && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start text-yellow-700">
                      <AlertCircle size={20} className="mr-2 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p>{submitError}</p>
                      </div>
                    </div>
                  )}

                  {!isEmailJSConfigured() && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-blue-700">
                      <div className="flex items-start">
                        <Mail size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                        <div className="text-sm">
                          <p className="font-medium">Отправка через почтовый клиент</p>
                          <p>Заказ будет отправлен через ваш почтовый клиент</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label htmlFor="name" className="block mb-1 font-medium text-gray-700">
                      Имя <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`${inputClassName} ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="Иван Иванов"
                    />
                    {errors.name && <p className={errorClassName}>{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block mb-1 font-medium text-gray-700">
                      Телефон <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`${inputClassName} ${errors.phone ? 'border-red-500' : ''}`}
                      placeholder="+7 (999) 123-45-67"
                    />
                    {errors.phone && <p className={errorClassName}>{errors.phone}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
                      Email 
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`${inputClassName} ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="example@mail.ru"
                    />
                    {errors.email && <p className={errorClassName}>{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block mb-1 font-medium text-gray-700">
                      Адрес доставки 
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`${inputClassName} ${errors.address ? 'border-red-500' : ''}`}
                      placeholder="г. Москва, ул. Примерная, д. 1, кв. 123"
                    />
                    {errors.address && <p className={errorClassName}>{errors.address}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-1 font-medium text-gray-700">
                      Комментарий к заказу
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className={inputClassName}
                      rows={3}
                      placeholder="Дополнительная информация по заказу или доставке"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting || items.length === 0}
                    className={`btn-smooth w-full py-3 px-6 mt-2 flex items-center justify-center rounded-lg font-medium text-white transition-all duration-300 ${
                      items.length === 0
                        ? 'bg-gray-400 cursor-not-allowed'
                        : isSubmitting
                        ? 'bg-blue-400'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <div className="loading-spinner -ml-1 mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        Отправка...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send size={18} className="mr-2" />
                        Оформить заказ
                      </span>
                    )}
                  </button>
                  
                  {items.length === 0 && (
                    <p className="text-center text-sm text-gray-500 mt-2">
                      Добавьте товары в корзину, чтобы оформить заказ
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;