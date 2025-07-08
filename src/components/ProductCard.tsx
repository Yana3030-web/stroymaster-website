import React, { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart, type Product } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div 
      className="product-card bg-white rounded-lg overflow-hidden shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-56">
        <img 
          src={product.image} 
          alt={product.name} 
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isHovered ? 'opacity-10' : 'opacity-0'
        }`}></div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 transition-colors duration-300 hover:text-blue-600">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">
            {product.price > 0 ? `${product.price.toLocaleString()} ₽` : 'Цена по запросу'}
          </span>
          
          <button 
            onClick={handleAddToCart}
            className={`flex items-center justify-center p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
              isAdded 
                ? 'bg-green-500 text-white scale-110' 
                : 'bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-lg'
            }`}
            disabled={isAdded}
          >
            <div className={`transition-transform duration-300 ${isAdded ? 'scale-110' : ''}`}>
              {isAdded ? <Check size={20} /> : <ShoppingCart size={20} />}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;