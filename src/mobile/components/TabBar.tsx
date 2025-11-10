import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

const TabBar: React.FC = () => {
  const { cartCount } = useCart();

  const navItems = [
    { path: '/mobile', icon: Home, label: 'Home' },
    { path: '/mobile/search', icon: Search, label: 'Search' },
    { path: '/mobile/cart', icon: ShoppingCart, label: 'Cart', badge: cartCount },
    { path: '/mobile/profile', icon: User, label: 'Profile' },
  ];

  const activeLinkClass = 'text-taiba-purple';
  const inactiveLinkClass = 'text-gray-500';

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex flex-col items-center justify-center space-y-1 w-16 transition-colors ${
                isActive ? activeLinkClass : inactiveLinkClass
              }`
            }
          >
            <div className="relative">
              <item.icon size={24} />
              {item.badge > 0 && (
                <span className="absolute -top-2 -right-3 bg-taiba-mustard text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default TabBar;
