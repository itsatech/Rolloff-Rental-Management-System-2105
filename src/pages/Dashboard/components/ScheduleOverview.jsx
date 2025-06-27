import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../../common/SafeIcon';
import Card from '../../../components/UI/Card';
import Badge from '../../../components/UI/Badge';

const { FiCalendar, FiClock, FiMapPin, FiUser } = FiIcons;

const ScheduleOverview = () => {
  const schedules = [
    {
      id: 1,
      type: 'Delivery',
      customer: 'ABC Construction',
      address: '123 Main St, Boston, MA',
      time: '9:00 AM',
      driver: 'Mike Johnson',
      status: 'scheduled',
      containerType: '20-yard',
    },
    {
      id: 2,
      type: 'Pickup',
      customer: 'Home Depot',
      address: '456 Oak Ave, Cambridge, MA',
      time: '11:30 AM',
      driver: 'Sarah Wilson',
      status: 'in-progress',
      containerType: '30-yard',
    },
    {
      id: 3,
      type: 'Delivery',
      customer: 'XYZ Renovations',
      address: '789 Pine Rd, Somerville, MA',
      time: '2:00 PM',
      driver: 'Tom Brown',
      status: 'scheduled',
      containerType: '15-yard',
    },
    {
      id: 4,
      type: 'Pickup',
      customer: 'Green Building Co.',
      address: '321 Elm St, Newton, MA',
      time: '4:30 PM',
      driver: 'Lisa Davis',
      status: 'completed',
      containerType: '40-yard',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'primary';
      case 'in-progress': return 'warning';
      case 'completed': return 'success';
      default: return 'default';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <SafeIcon icon={FiCalendar} className="h-5 w-5 text-primary-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
          </div>
          <Badge variant="info">{schedules.length} tasks</Badge>
        </div>

        <div className="space-y-4">
          {schedules.map((schedule, index) => (
            <motion.div
              key={schedule.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className={`w-3 h-3 rounded-full ${
                    schedule.type === 'Delivery' ? 'bg-blue-500' : 'bg-green-500'
                  }`}></div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">
                      {schedule.type} - {schedule.containerType}
                    </span>
                    <Badge variant={getStatusColor(schedule.status)} size="xs">
                      {schedule.status}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-1">{schedule.customer}</p>
                  
                  <div className="flex items-center text-xs text-gray-500 space-x-4">
                    <div className="flex items-center">
                      <SafeIcon icon={FiClock} className="h-3 w-3 mr-1" />
                      {schedule.time}
                    </div>
                    <div className="flex items-center">
                      <SafeIcon icon={FiMapPin} className="h-3 w-3 mr-1" />
                      {schedule.address}
                    </div>
                    <div className="flex items-center">
                      <SafeIcon icon={FiUser} className="h-3 w-3 mr-1" />
                      {schedule.driver}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

export default ScheduleOverview;