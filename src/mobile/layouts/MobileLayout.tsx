import React from 'react';
import { Outlet } from 'react-router-dom';
import TabBar from '../components/TabBar';
import MobileHeader from '../components/MobileHeader';

const MobileLayout: React.FC = () => {
  return (
    <div className="w-full min-h-screen font-sans bg-gray-100 flex flex-col">
      <MobileHeader />
      <main className="flex-grow pb-20">
        <Outlet />
      </main>
      <TabBar />
    </div>
  );
};

export default MobileLayout;
