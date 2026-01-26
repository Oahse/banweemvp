import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { Plus, Check } from 'lucide-react';
import { ProductVariant, AddToCartRequest } from '../types';

interface CartButtonProps {
  variant: ProductVariant;
  quantity?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const CartButton = ({ variant, quantity = 1, className = '', size = 'md', disabled = false }: CartButtonProps) => {
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
      const request: AddToCartRequest = {
        variant_id: variant.id,
        quantity,
      };
      
      await addItem(request);
      
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add item';
      toast.error(errorMessage);
    } finally {
      setAdding(false);
    }
  };

  const sizes: Record<string, string> = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
  };

  const icons: Record<string, string> = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const baseClass = `
    inline-flex items-center justify-center font-medium rounded-lg
    transition-all duration-200 ${sizes[size]}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}
  `;

  if (added) {
    return (
      <button className={`${baseClass} bg-green-600 text-white ${className}`} disabled title="Added to Cart">
        <Check className={icons[size]} />
      </button>
    );
  }

  if (adding || loading) {
    return (
      <button className={`${baseClass} bg-blue-500 text-white ${className}`} disabled title="Adding to Cart">
        <div className={`border-2 border-white border-t-transparent rounded-full animate-spin ${icons[size]}`}></div>
      </button>
    );
  }

  return (
    <button
      onClick={handleAdd}
      disabled={disabled}
      className={`${baseClass} bg-blue-600 text-white hover:bg-blue-700 ${className}`}
      title="Add to Cart"
    >
      <Plus className={icons[size]} />
    </button>
  );
};

export default CartButton;