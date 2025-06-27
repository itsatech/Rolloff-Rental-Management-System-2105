import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import Modal from '../../components/UI/Modal';

const { FiPackage, FiPlus, FiSearch, FiEdit, FiTrash2, FiTruck } = FiIcons;

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containers = [
    {
      id: 1,
      name: '10-yard Container',
      type: '10-yard',
      dimensions: '12\' L × 8\' W × 3.5\' H',
      capacity: '10 cubic yards',
      weight: '4 tons',
      dailyRate: '$45',
      weeklyRate: '$200',
      monthlyRate: '$600',
      total: 45,
      available: 13,
      rented: 32,
      maintenance: 0,
      description: 'Perfect for small cleanouts, minor renovations, and landscaping projects.',
    },
    {
      id: 2,
      name: '15-yard Container',
      type: '15-yard',
      dimensions: '16\' L × 8\' W × 4.5\' H',
      capacity: '15 cubic yards',
      weight: '6 tons',
      dailyRate: '$55',
      weeklyRate: '$275',
      monthlyRate: '$750',
      total: 38,
      available: 8,
      rented: 28,
      maintenance: 2,
      description: 'Ideal for medium-sized renovation projects and home cleanouts.',
    },
    {
      id: 3,
      name: '20-yard Container',
      type: '20-yard',
      dimensions: '22\' L × 8\' W × 4.5\' H',
      capacity: '20 cubic yards',
      weight: '8 tons',
      dailyRate: '$65',
      weeklyRate: '$325',
      monthlyRate: '$900',
      total: 52,
      available: 9,
      rented: 41,
      maintenance: 2,
      description: 'Most popular size for construction projects and large cleanouts.',
    },
    {
      id: 4,
      name: '30-yard Container',
      type: '30-yard',
      dimensions: '22\' L × 8\' W × 6\' H',
      capacity: '30 cubic yards',
      weight: '10 tons',
      dailyRate: '$85',
      weeklyRate: '$425',
      monthlyRate: '$1200',
      total: 35,
      available: 6,
      rented: 27,
      maintenance: 2,
      description: 'Great for large construction projects and major renovations.',
    },
    {
      id: 5,
      name: '40-yard Container',
      type: '40-yard',
      dimensions: '22\' L × 8\' W × 8\' H',
      capacity: '40 cubic yards',
      weight: '12 tons',
      dailyRate: '$105',
      weeklyRate: '$525',
      monthlyRate: '$1500',
      total: 28,
      available: 8,
      rented: 19,
      maintenance: 1,
      description: 'Perfect for large-scale commercial projects and demolitions.',
    },
  ];

  const filteredContainers = containers.filter(container =>
    container.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    container.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAvailabilityColor = (available, total) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return 'success';
    if (percentage > 20) return 'warning';
    return 'danger';
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
            <p className="text-gray-600 mt-1">Manage rolloff container inventory and pricing</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <SafeIcon icon={FiPlus} className="h-4 w-4 mr-2" />
            Add Container Type
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-6">
            <div className="relative">
              <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search containers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <SafeIcon icon={FiPackage} className="h-4 w-4" />
              <span>{filteredContainers.length} container types</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredContainers.map((container, index) => (
              <motion.div
                key={container.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-primary-100 rounded-lg mr-3">
                        <SafeIcon icon={FiTruck} className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{container.name}</h3>
                        <p className="text-sm text-gray-500">{container.dimensions}</p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="outline" size="sm">
                        <SafeIcon icon={FiEdit} className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <SafeIcon icon={FiTrash2} className="h-3 w-3 text-red-500" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Capacity:</span>
                      <span className="font-medium">{container.capacity}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Weight Limit:</span>
                      <span className="font-medium">{container.weight}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-4">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-xs text-gray-500">Daily</p>
                        <p className="text-sm font-semibold text-primary-600">{container.dailyRate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Weekly</p>
                        <p className="text-sm font-semibold text-primary-600">{container.weeklyRate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Monthly</p>
                        <p className="text-sm font-semibold text-primary-600">{container.monthlyRate}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Availability</span>
                      <Badge variant={getAvailabilityColor(container.available, container.total)}>
                        {container.available} available
                      </Badge>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="flex h-full rounded-full overflow-hidden">
                        <div
                          className="bg-red-500"
                          style={{ width: `${(container.rented / container.total) * 100}%` }}
                        />
                        <div
                          className="bg-green-500"
                          style={{ width: `${(container.available / container.total) * 100}%` }}
                        />
                        <div
                          className="bg-yellow-500"
                          style={{ width: `${(container.maintenance / container.total) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Rented: {container.rented}</span>
                      <span>Total: {container.total}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-600">{container.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Container Type"
        size="lg"
      >
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Container Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., 10-yard Container"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Container Type
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., 10-yard"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dimensions
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="L × W × H"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capacity
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="cubic yards"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight Limit
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="tons"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Rate ($)
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weekly Rate ($)
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Rate ($)
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Inventory
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter total number of containers"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter container description and ideal use cases"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-6">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Add Container Type
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Products;