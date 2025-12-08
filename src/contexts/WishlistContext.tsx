import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

interface WishlistContextType {
  wishlistItems: string[]; // Array of product IDs
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<string[]>(['p1', 'p3']); // Start with some items

  const addToWishlist = useCallback((productId: string) => {
    setWishlistItems(prev => [...prev, productId]);
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlistItems(prev => prev.filter(id => id !== productId));
  }, []);

  const isInWishlist = useCallback((productId: string): boolean => {
    return wishlistItems.includes(productId);
  }, [wishlistItems]);

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
