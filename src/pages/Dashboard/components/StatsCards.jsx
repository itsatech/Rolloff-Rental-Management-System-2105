import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../../common/SafeIcon';
import Card from '../../../components/UI/Card';

const { FiTruck, FiUsers, FiDollarSign, FiPackage, FiTrendingUp, FiTrendingDown } = FiIcons;

const StatsCards = () => {
  const stats = [
    {
      title: 'Active Rentals',
      value: '147',
      change: '+12%',
      trend: 'up',
      icon: FiTruck,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Customers',
      value: '2,847',
      change: '+5.2%',
      trend: 'up',
      icon: FiUsers,
      color: 'bg-green-500',
    },
    {
      title: 'Monthly Revenue',
      value: '$48,392',
      change: '+8.1%',
      trend: 'up',
      icon: FiDollarSign,
      color: 'bg-purple-500',
    },
    {
      title: 'Available Assets',
      value: '89',
      change: '-3.2%',
      trend: 'down',
      icon: FiPackage,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <SafeIcon 
                    icon={stat.trend === 'up' ? FiTrendingUp : FiTrendingDown} 
                    className={`h-4 w-4 mr-1 ${
                      stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`}
                  />
                  <span className={`text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <SafeIcon icon={stat.icon} className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;