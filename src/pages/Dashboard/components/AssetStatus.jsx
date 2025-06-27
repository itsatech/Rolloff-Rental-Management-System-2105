import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../../common/SafeIcon';
import Card from '../../../components/UI/Card';

const { FiPackage } = FiIcons;

const AssetStatus = () => {
  const assetData = [
    { name: '10-yard Containers', total: 45, rented: 32, available: 13, maintenance: 0 },
    { name: '15-yard Containers', total: 38, rented: 28, available: 8, maintenance: 2 },
    { name: '20-yard Containers', total: 52, rented: 41, available: 9, maintenance: 2 },
    { name: '30-yard Containers', total: 35, rented: 27, available: 6, maintenance: 2 },
    { name: '40-yard Containers', total: 28, rented: 19, available: 8, maintenance: 1 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="p-6">
        <div className="flex items-center mb-6">
          <SafeIcon icon={FiPackage} className="h-5 w-5 text-primary-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Asset Status</h2>
        </div>

        <div className="space-y-6">
          {assetData.map((asset, index) => (
            <motion.div
              key={asset.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-900">{asset.name}</span>
                <span className="text-sm text-gray-500">{asset.total} total</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div className="flex h-full rounded-full overflow-hidden">
                  <div
                    className="bg-red-500"
                    style={{ width: `${(asset.rented / asset.total) * 100}%` }}
                  />
                  <div
                    className="bg-green-500"
                    style={{ width: `${(asset.available / asset.total) * 100}%` }}
                  />
                  <div
                    className="bg-yellow-500"
                    style={{ width: `${(asset.maintenance / asset.total) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-600">
                <span>Rented: {asset.rented}</span>
                <span>Available: {asset.available}</span>
                {asset.maintenance > 0 && <span>Maintenance: {asset.maintenance}</span>}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-gray-600">Rented</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-gray-600">Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-gray-600">Maintenance</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default AssetStatus;