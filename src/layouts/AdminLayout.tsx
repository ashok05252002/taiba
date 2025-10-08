import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import SwitchToUserPanelButton from '../components/admin/SwitchToUserPanelButton';

const AdminLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-8">
          <Outlet />
        </main>
      </div>
      <SwitchToUserPanelButton />
    </div>
  );
};

export default AdminLayout;
