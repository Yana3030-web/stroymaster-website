import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">СтройМастер</h3>
            <p className="mb-4 text-gray-400">
              Создаем уют и стиль в вашем доме с 2020 года. Лучшие товары по доступным ценам с доставкой по всей России.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <a href="#hero" className="text-gray-400 hover:text-white transition-colors">Главная</a>
              </li>
              <li>
                <a href="#catalog" className="text-gray-400 hover:text-white transition-colors">Каталог</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Контакты</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Доставка и оплата</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">О компании</a>
              </li>
            </ul>
          </div>
          
          
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Связаться с нами</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone size={18} className="mr-2 mt-1 text-blue-400" />
                <span>+7 (977) 453-61-61</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mr-2 mt-1 text-blue-400" />
                <span>stroymaster.store@bk.ru</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-blue-400" />
                <span>Одинцовский городской округ, деревня Марфино, 100</span>
              </li>
              <li className="mt-4">
                <p className="text-sm text-gray-500">
                  Пн-Сб: 9:00 – 18:00<br />
                  Вс: 9:00 – 16:00
                </p>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © 2025 СтройМастер. Все права защищены.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-4 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-gray-300 transition-colors">Политика конфиденциальности</a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300 transition-colors">Условия использования</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;