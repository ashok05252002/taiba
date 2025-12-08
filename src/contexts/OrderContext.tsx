import React, { createContext, useState, useContext, ReactNode } from 'react';
import { generateAddresses, storeLocations } from '../utils/mockData';

type DeliveryMode = 'delivery' | 'takeaway';
type Address = ReturnType<typeof generateAddresses>[0];
type Store = typeof storeLocations[0];

interface OrderContextType {
  deliveryMode: DeliveryMode;
  setDeliveryMode: (mode: DeliveryMode) => void;
  deliveryModeChosen: boolean;
  setDeliveryModeChosen: (chosen: boolean) => void;
  shippingAddress: Address | null;
  setShippingAddress: (address: Address) => void;
  allAddresses: Address[];
  addAddress: (address: Address) => void;
  selectedStore: Store | null;
  setSelectedStore: (store: Store) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>('delivery');
  const [deliveryModeChosen, setDeliveryModeChosen] = useState(false);
  const [allAddresses, setAllAddresses] = useState(() => generateAddresses(2));
  const [shippingAddress, setShippingAddress] = useState<Address | null>(allAddresses.find(a => a.isDefault) || allAddresses[0] || null);
  const [selectedStore, setSelectedStore] = useState<Store | null>(storeLocations[0]);

  const addAddress = (address: Address) => {
    setAllAddresses(prev => [address, ...prev]);
    setShippingAddress(address); // Set new address as current
  };

  const value = {
    deliveryMode,
    setDeliveryMode,
    deliveryModeChosen,
    setDeliveryModeChosen,
    shippingAddress,
    setShippingAddress,
    allAddresses,
    addAddress,
    selectedStore,
    setSelectedStore,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
