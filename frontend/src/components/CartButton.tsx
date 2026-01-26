import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { ShoppingCart, Plus, Check } from 'lucide-react';

const CartButton = ({ variant, quantity = 1, className = '', size = 'md', disabled = false }) => {
  const { user } = useAuth();
  const { addItem, loading } = useCart();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = async () => {
    if (!user) {
      toast.error('Please log in to add items');
      return;
    }

    if (!variant || disabled) return;

    setAdding(true);
    
    try {
      await addItem({
        variant_id: variant.id,
        quantity,
        price_per_unit: variant.current_price,
        variant,
      });
      
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (error) {
      toast.error(error.message || 'Failed to add item');
    } finally {
      setAdding(false);
    }
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const icons = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const baseClass = `
    inline-flex items-center justify-center gap-2 font-medium rounded-lg
    transition-all duration-200 ${sizes[size]}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}
  `;

  if (added) {
    return (
      <button className={`${baseClass} bg-green-600 text-white ${className}`} disabled>
        <Check className={icons[size]} />
        Added!
      </button>
    );
  }

  if (adding || loading) {
    return (
      <button className={`${baseClass} bg-blue-500 text-white ${className}`} disabled>
        <div className={`border-2 border-white border-t-transparent rounded-full animate-spin ${icons[size]}`}></div>
        Adding...
      </button>
    );
  }

  return (
    <button
      onClick={handleAdd}
      disabled={disabled}
      className={`${baseClass} bg-blue-600 text-white hover:bg-blue-700 ${className}`}
    >
      <Plus className={icons[size]} />
      Add to Cart
    </button>
  );
};

export default CartButton;