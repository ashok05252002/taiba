import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Package,
  Truck,
  CreditCard,
  Ticket,
  FileText,
  BarChart2,
  Settings,
  Bike,
  LogOut,
  ChevronDown,
  Store,
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { name: 'User Management', icon: Users, path: '/admin/users' },
  { name: 'Product & Inventory', icon: Package, path: '/admin/products' },
  { name: 'Order & Delivery', icon: Truck, path: '/admin/orders' },
  { name: 'Stores', icon: Store, path: '/admin/stores' },
  { name: 'Delivery Partners', icon: Bike, path: '/admin/delivery-partners' },
  { name: 'Payments', icon: CreditCard, path: '/admin/payments' },
  { name: 'Promotions', icon: Ticket, path: '/admin/promotions' },
  { name: 'CMS', icon: FileText, path: '/admin/cms' },
  { name: 'Analytics', icon: BarChart2, path: '/admin/analytics' },
  { name: 'Settings', icon: Settings, path: '/admin/settings' },
];

const AdminSidebar: React.FC = () => {
  const [isProfileOpen, setProfileOpen] = useState(false);

  return (
    <aside className="w-72 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <Link to="/" className="flex items-center space-x-2">
           <img src="https://taibarare.com/wp-content/themes/taiba/assets/img/home/footer/TAIBA%20ACCESS%20RARE%20FOOTER%20LOGO_.png" alt="Taiba Pharmacy" className="h-10 w-auto" />
           <span className="font-bold text-xl text-gray-800">Admin Panel</span>
        </Link>
      </div>

      {/* Profile Summary */}
      <div className="p-4 border-b border-gray-200 relative">
        <button 
          onClick={() => setProfileOpen(!isProfileOpen)}
          className="w-full flex items-center justify-between text-left"
        >
          <div className="flex items-center space-x-3">
            <img src="https://i.pravatar.cc/40" alt="Admin" className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-semibold text-sm text-gray-800">Admin User</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
          </div>
          <ChevronDown size={18} className={`transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
            {isProfileOpen && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white shadow-lg rounded-lg border p-2"
                >
                    <Link to="/admin/profile" className="block px-3 py-2 text-sm rounded-md hover:bg-gray-100">My Profile</Link>
                    <Link to="/admin/settings" className="block px-3 py-2 text-sm rounded-md hover:bg-gray-100">Settings</Link>
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                end={item.path === '/admin'}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-taiba-blue/10 text-taiba-blue'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
