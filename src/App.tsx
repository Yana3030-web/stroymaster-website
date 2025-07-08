import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    
    // Автоматически прокручиваем к каталогу при поиске
    if (term.trim()) {
      setTimeout(() => {
        const catalogElement = document.getElementById('catalog');
        if (catalogElement) {
          const headerHeight = 120;
          const elementPosition = catalogElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header onSearchChange={handleSearchChange} />
        <main className="flex-grow">
          <Hero />
          <Catalog searchTerm={searchTerm} />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;