import React, { useState, useEffect } from 'react';
import { Menu, ShoppingCart, X, Phone, Mail, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartDropdown from './CartDropdown';

interface HeaderProps {
  onSearchChange?: (searchTerm: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    setIsMenuOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    if (onSearchChange) {
      onSearchChange('');
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled ? 'bg-white shadow-lg py-2' : 'bg-white/95 backdrop-blur-sm py-3'
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="hidden lg:flex justify-between items-center py-2 border-b border-gray-100">
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center transition-colors duration-300 hover:text-blue-600">
              <Phone size={16} className="mr-2 text-blue-600" />
              <span>+7 (977) 453-61-61</span>
            </div>
            <div className="flex items-center transition-colors duration-300 hover:text-blue-600">
              <Mail size={16} className="mr-2 text-blue-600" />
              <span>stroymaster.store@bk.ru</span>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Пн-Сб: 9:00-18:00, Вс: 9:00-16:00
          </div>
        </div>

        {/* Main Header */}
        <div className="flex justify-between items-center py-2">
          {/* Logo */}
          <div className="flex flex-col">
            <div className="text-2xl font-bold text-blue-600 transition-all duration-300 hover:scale-105">
              СтройМастер
            </div>
            <div className="hidden md:block text-sm text-gray-500">
              Профессиональные решения
            </div>
            {/* Mobile Phone Number */}
            <div className="md:hidden flex items-center text-xs text-gray-600 mt-1">
              <Phone size={12} className="mr-1 text-blue-600" />
              <span>+7 (977) 453-61-61</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('hero')}
              className="nav-link text-gray-700 font-medium"
            >
              Главная
            </button>
            <button 
              onClick={() => scrollToSection('catalog')}
              className="nav-link text-gray-700 font-medium"
            >
              Каталог
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="nav-link text-gray-700 font-medium"
            >
              Заказать
            </button>
          </nav>

          {/* Search, Cart and Mobile Menu Buttons */}
          <div className="flex items-center space-x-2">
            {/* Search Button */}
            <button 
              className="p-2 text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-110"
              onClick={() => setIsSearchVisible(!isSearchVisible)}
            >
              <Search size={20} />
            </button>

            {/* Cart Button */}
            <button 
              className="relative p-2 text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-110"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-110"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}>
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </div>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isSearchVisible ? 'max-h-20 opacity-100 pb-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="mt-4 py-4 bg-white rounded-lg shadow-lg border border-gray-100">
            <div className="flex flex-col space-y-4 px-4">
              <button 
                onClick={() => scrollToSection('hero')}
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 py-2 font-medium text-left hover:translate-x-2"
              >
                Главная
              </button>
              <button 
                onClick={() => scrollToSection('catalog')}
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 py-2 font-medium text-left hover:translate-x-2"
              >
                Каталог
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 py-2 font-medium text-left hover:translate-x-2"
              >
                Заказать
              </button>
              
              {/* Mobile Contact Info */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center text-sm text-gray-600 mb-2 transition-colors duration-300 hover:text-blue-600">
                  <Phone size={16} className="mr-2 text-blue-600" />
                  <span>+7 (977) 453-61-61</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 transition-colors duration-300 hover:text-blue-600">
                  <Mail size={16} className="mr-2 text-blue-600" />
                  <span>stroymaster.store@bk.ru</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cart Dropdown */}
        {isCartOpen && <CartDropdown onClose={() => setIsCartOpen(false)} />}
      </div>
    </header>
  );
};

export default Header;