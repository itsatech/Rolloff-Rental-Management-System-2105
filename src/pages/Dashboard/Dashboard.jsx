import React from 'react';
import { motion } from 'framer-motion';
import StatsCards from './components/StatsCards';
import RecentActivity from './components/RecentActivity';
import ScheduleOverview from './components/ScheduleOverview';
import AssetStatus from './components/AssetStatus';
import QuickActions from './components/QuickActions';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
          </div>
          <QuickActions />
        </div>
      </motion.div>

      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ScheduleOverview />
        </div>
        <div>
          <AssetStatus />
        </div>
      </div>

      <RecentActivity />
    </div>
  );
};

export default Dashboard;