import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../../common/SafeIcon';
import Card from '../../../components/UI/Card';
import Badge from '../../../components/UI/Badge';

const { FiActivity, FiTruck, FiDollarSign, FiUser, FiPackage } = FiIcons;

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'rental',
      icon: FiTruck,
      title: 'New rental order #RO-2024-001',
      description: 'ABC Construction rented a 20-yard container',
      time: '2 minutes ago',
      status: 'success',
    },
    {
      id: 2,
      type: 'payment',
      icon: FiDollarSign,
      title: 'Payment received',
      description: '$450 payment from Home Depot (Invoice #INV-2024-045)',
      time: '15 minutes ago',
      status: 'success',
    },
    {
      id: 3,
      type: 'customer',
      icon: FiUser,
      title: 'New customer registered',
      description: 'Green Building Solutions joined the platform',
      time: '1 hour ago',
      status: 'info',
    },
    {
      id: 4,
      type: 'maintenance',
      icon: FiPackage,
      title: 'Container maintenance scheduled',
      description: '30-yard container #C-301 scheduled for maintenance',
      time: '2 hours ago',
      status: 'warning',
    },
    {
      id: 5,
      type: 'delivery',
      icon: FiTruck,
      title: 'Delivery completed',
      description: 'Mike Johnson completed delivery to XYZ Renovations',
      time: '3 hours ago',
      status: 'success',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'success';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'default';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <SafeIcon icon={FiActivity} className="h-5 w-5 text-primary-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <Badge variant="info">{activities.length} recent</Badge>
        </div>

        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className={`flex-shrink-0 p-2 rounded-lg ${
                activity.status === 'success' ? 'bg-green-100' :
                activity.status === 'warning' ? 'bg-yellow-100' :
                activity.status === 'info' ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <SafeIcon 
                  icon={activity.icon} 
                  className={`h-4 w-4 ${
                    activity.status === 'success' ? 'text-green-600' :
                    activity.status === 'warning' ? 'text-yellow-600' :
                    activity.status === 'info' ? 'text-blue-600' : 'text-gray-600'
                  }`} 
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 mb-1">
                  {activity.title}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-500">
                  {activity.time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

export default RecentActivity;