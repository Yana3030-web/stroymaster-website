import React from 'react';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartDropdownProps {
  onClose: () => void;
}

const CartDropdown: React.FC<CartDropdownProps> = ({ onClose }) => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <div className="absolute top-full right-0 mt-2 w-72 md:w-96 bg-white rounded-lg shadow-xl p-4 z-50 animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Корзина</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>
      
      <div className="max-h-80 overflow-y-auto">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-500">
            <ShoppingBag size={48} className="mb-2 opacity-50" />
            <p>Корзина пуста</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {items.map(item => (
              <li key={item.id} className="flex items-center py-2 border-b">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-16 h-16 object-cover rounded-md mr-3"
                />
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.price.toLocaleString()} ₽</p>
                  
                  <div className="flex items-center mt-1">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="mx-2 text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                >
                  <X size={18} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {items.length > 0 && (
        <div className="mt-4 pt-3 border-t">
          <div className="flex justify-between font-semibold">
            <span>Итого:</span>
            <span>{totalPrice.toLocaleString()} ₽</span>
          </div>
          <a 
            href="#contact" 
            className="block mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-center font-medium transition-colors"
            onClick={onClose}
          >
            Оформить заказ
          </a>
        </div>
      )}
    </div>
  );
};

export default CartDropdown;