import { useEffect, useState } from 'react';
import { ArrowRight, Shield, Truck, Award } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
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
  };

  return (
    <section id="hero" className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/80 z-0"></div>
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://i.pinimg.com/736x/99/80/9b/99809b44f96c3fa93e1e24cd9c8601ad.jpg')",
          filter: "brightness(0.3)"
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <h1 
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 transform transition-all duration-1000 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            Строительные материалы
            <span className="block text-blue-300">высшего качества</span>
          </h1>
          <p 
            className={`text-lg md:text-xl text-gray-100 mb-8 max-w-2xl transform transition-all duration-1000 ease-out delay-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            Полный ассортимент строительных материалов от ведущих производителей. 
            Качество, надежность и выгодные цены для профессионалов и частных клиентов.
          </p>
          
          <div 
            className={`flex flex-col sm:flex-row gap-4 mb-12 transform transition-all duration-1000 ease-out delay-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <button 
              onClick={() => scrollToSection('catalog')}
              className="btn-smooth inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl"
            >
              Смотреть каталог
              <ArrowRight size={20} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="btn-smooth inline-flex items-center bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold"
            >
              Связаться с нами
            </button>
          </div>

          {/* Features */}
          <div 
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 transform transition-all duration-1000 ease-out delay-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="flex items-center text-white transition-all duration-300 hover:scale-105">
              <div className="bg-blue-600 p-3 rounded-lg mr-4 transition-all duration-300 hover:bg-blue-500">
                <Shield size={24} />
              </div>
              <div>
                <h3 className="font-semibold">Гарантия качества</h3>
                <p className="text-sm text-gray-200">Только сертифицированные материалы</p>
              </div>
            </div>
            
            <div className="flex items-center text-white transition-all duration-300 hover:scale-105">
              <div className="bg-blue-600 p-3 rounded-lg mr-4 transition-all duration-300 hover:bg-blue-500">
                <Truck size={24} />
              </div>
              <div>
                <h3 className="font-semibold">Быстрая доставка</h3>
                <p className="text-sm text-gray-200">Доставка по Москве и МО</p>
              </div>
            </div>
            
            <div className="flex items-center text-white transition-all duration-300 hover:scale-105">
              <div className="bg-blue-600 p-3 rounded-lg mr-4 transition-all duration-300 hover:bg-blue-500">
                <Award size={24} />
              </div>
              <div>
                <h3 className="font-semibold">Более 5 лет опыта</h3>
                <p className="text-sm text-gray-200">Проверенный поставщик</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </section>
  );
};

export default Hero;