import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../../common/SafeIcon';
import Button from '../../../components/UI/Button';

const { FiPlus, FiTruck, FiUser, FiPackage } = FiIcons;

const QuickActions = () => {
  const actions = [
    { label: 'New Order', icon: FiPlus, variant: 'primary' },
    { label: 'Schedule Delivery', icon: FiTruck, variant: 'outline' },
    { label: 'Add Customer', icon: FiUser, variant: 'outline' },
    { label: 'Add Asset', icon: FiPackage, variant: 'outline' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex space-x-3"
    >
      {actions.map((action, index) => (
        <motion.div
          key={action.label}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Button
            variant={action.variant}
            size="sm"
            className="flex items-center space-x-2"
          >
            <SafeIcon icon={action.icon} className="h-4 w-4" />
            <span className="hidden sm:inline">{action.label}</span>
          </Button>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default QuickActions;