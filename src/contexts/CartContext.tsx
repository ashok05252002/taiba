import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product, CartItem } from '../types';
import { generateProducts } from '../utils/mockData';
import { useNotification } from './NotificationContext';

interface AnimationState {
  image: string;
  startRect: DOMRect;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  buyNow: (product: Product, startRect?: DOMRect) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isShaking: boolean;
  triggerAnimation: (image: string, startRect: DOMRect) => void;
  animationState: AnimationState | null;
  clearAnimation: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const initialProducts = generateProducts(2);
const initialCartItems: CartItem[] = initialProducts.map(p => ({ product: p, quantity: 1 }));

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [isShaking, setIsShaking] = useState(false);
  const [animationState, setAnimationState] = useState<AnimationState | null>(null);
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const triggerAnimation = (image: string, startRect: DOMRect) => {
    setAnimationState({ image, startRect });
  };

  const clearAnimation = () => {
    setAnimationState(null);
  };

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, quantity }];
    });
    
    addNotification({
        message: 'Added to cart',
        type: 'success',
        product: {
            name: product.name,
            image: product.image,
        }
    });

    triggerShake();
  }, [addNotification]);

  const buyNow = (product: Product) => {
    // Ensure item is in cart before navigating
    const existingItem = cartItems.find(item => item.product.id === product.id);
    if (!existingItem) {
        addToCart(product, 1);
    }
    navigate('/checkout');
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    buyNow,
    clearCart,
    cartCount,
    cartTotal,
    isShaking,
    triggerAnimation,
    animationState,
    clearAnimation,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
