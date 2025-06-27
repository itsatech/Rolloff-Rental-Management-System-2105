import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import Modal from '../../components/UI/Modal';

const { FiShoppingCart, FiPlus, FiSearch, FiFilter, FiEye, FiEdit, FiCalendar, FiMapPin, FiDollarSign } = FiIcons;

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    {
      id: 'RO-2024-001',
      customer: 'ABC Construction',
      containerType: '20-yard',
      deliveryDate: '2024-01-15',
      pickupDate: '2024-01-22',
      deliveryAddress: '123 Main St, Boston, MA 02101',
      status: 'active',
      totalAmount: '$455',
      paidAmount: '$455',
      paymentStatus: 'paid',
      driver: 'Mike Johnson',
      orderDate: '2024-01-10',
    },
    {
      id: 'RO-2024-002',
      customer: 'Home Depot',
      containerType: '30-yard',
      deliveryDate: '2024-01-16',
      pickupDate: '2024-01-25',
      deliveryAddress: '456 Oak Ave, Cambridge, MA 02139',
      status: 'scheduled',
      totalAmount: '$595',
      paidAmount: '$0',
      paymentStatus: 'pending',
      driver: 'Sarah Wilson',
      orderDate: '2024-01-12',
    },
    {
      id: 'RO-2024-003',
      customer: 'XYZ Renovations',
      containerType: '15-yard',
      deliveryDate: '2024-01-14',
      pickupDate: '2024-01-21',
      deliveryAddress: '789 Pine Rd, Somerville, MA 02143',
      status: 'completed',
      totalAmount: '$385',
      paidAmount: '$385',
      paymentStatus: 'paid',
      driver: 'Tom Brown',
      orderDate: '2024-01-08',
    },
    {
      id: 'RO-2024-004',
      customer: 'Green Building Co.',
      containerType: '40-yard',
      deliveryDate: '2024-01-17',
      pickupDate: '2024-01-26',
      deliveryAddress: '321 Elm St, Newton, MA 02458',
      status: 'scheduled',
      totalAmount: '$735',
      paidAmount: '$367.50',
      paymentStatus: 'partial',
      driver: 'Lisa Davis',
      orderDate: '2024-01-13',
    },
    {
      id: 'RO-2024-005',
      customer: 'John Smith',
      containerType: '10-yard',
      deliveryDate: '2024-01-13',
      pickupDate: '2024-01-18',
      deliveryAddress: '654 Maple Ave, Quincy, MA 02169',
      status: 'completed',
      totalAmount: '$315',
      paidAmount: '$315',
      paymentStatus: 'paid',
      driver: 'Mike Johnson',
      orderDate: '2024-01-09',
    },
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'primary';
      case 'scheduled': return 'warning';
      case 'completed': return 'success';
      case 'cancelled': return 'danger';
      default: return 'default';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'success';
      case 'partial': return 'warning';
      case 'pending': return 'danger';
      default: return 'default';
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
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
            <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
            <p className="text-gray-600 mt-1">Track and manage rental orders and transactions</p>
          </div>
          <Button>
            <SafeIcon icon={FiPlus} className="h-4 w-4 mr-2" />
            New Order
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
            <div className="flex items-center space-x-4">
              <div className="relative">
                <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiFilter} className="h-4 w-4 text-gray-500" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <SafeIcon icon={FiShoppingCart} className="h-4 w-4" />
              <span>{filteredOrders.length} orders</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Container
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Schedule
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order, index) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.id}</div>
                        <div className="text-sm text-gray-500">{order.orderDate}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <SafeIcon icon={FiMapPin} className="h-3 w-3 mr-1" />
                          {order.deliveryAddress.split(',')[0]}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.containerType}</div>
                      <div className="text-sm text-gray-500">{order.driver}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-900 flex items-center">
                          <SafeIcon icon={FiCalendar} className="h-3 w-3 mr-1 text-green-500" />
                          Delivery: {order.deliveryDate}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <SafeIcon icon={FiCalendar} className="h-3 w-3 mr-1 text-red-500" />
                          Pickup: {order.pickupDate}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.totalAmount}</div>
                        <Badge variant={getPaymentStatusColor(order.paymentStatus)} size="xs">
                          {order.paymentStatus}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewOrder(order)}
                        >
                          <SafeIcon icon={FiEye} className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <SafeIcon icon={FiEdit} className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Order Details - ${selectedOrder?.id}`}
        size="lg"
      >
        {selectedOrder && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-medium">{selectedOrder.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date:</span>
                    <span className="font-medium">{selectedOrder.orderDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Customer:</span>
                    <span className="font-medium">{selectedOrder.customer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Container Type:</span>
                    <span className="font-medium">{selectedOrder.containerType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Assigned Driver:</span>
                    <span className="font-medium">{selectedOrder.driver}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <Badge variant={getStatusColor(selectedOrder.status)}>
                      {selectedOrder.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Schedule & Location</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600 block">Delivery Date:</span>
                    <span className="font-medium">{selectedOrder.deliveryDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 block">Pickup Date:</span>
                    <span className="font-medium">{selectedOrder.pickupDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 block">Delivery Address:</span>
                    <span className="font-medium">{selectedOrder.deliveryAddress}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Information</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="text-xl font-bold text-gray-900">{selectedOrder.totalAmount}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Paid Amount:</span>
                  <span className="font-medium text-green-600">{selectedOrder.paidAmount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Payment Status:</span>
                  <Badge variant={getPaymentStatusColor(selectedOrder.paymentStatus)}>
                    {selectedOrder.paymentStatus}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6">
              <Button variant="outline">
                <SafeIcon icon={FiEdit} className="h-4 w-4 mr-2" />
                Edit Order
              </Button>
              <Button>
                <SafeIcon icon={FiDollarSign} className="h-4 w-4 mr-2" />
                Process Payment
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Orders;