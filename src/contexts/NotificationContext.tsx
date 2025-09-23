import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  product?: {
    name: string;
    image: string;
  };
}

interface NotificationContextType {
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  notifications: Notification[];
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString();
    setNotifications(prev => [...prev, { id, ...notification }]);

    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  }, []);

  const value = { addNotification, notifications };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
