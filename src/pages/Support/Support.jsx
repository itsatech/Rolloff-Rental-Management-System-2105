import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import Modal from '../../components/UI/Modal';

const { FiHeadphones, FiPlus, FiSearch, FiMessageCircle, FiClock, FiUser, FiAlertCircle, FiCheckCircle } = FiIcons;

const Support = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tickets = [
    {
      id: 'TK-2024-001',
      subject: 'Container delivery delay',
      customer: 'ABC Construction',
      status: 'open',
      priority: 'high',
      assignedTo: 'Sarah Johnson',
      createdAt: '2024-01-15 09:30',
      lastUpdate: '2024-01-15 14:22',
      description: 'Customer reports that their 20-yard container was not delivered as scheduled.',
    },
    {
      id: 'TK-2024-002',
      subject: 'Billing inquiry for invoice #INV-2024-045',
      customer: 'Home Depot',
      status: 'in-progress',
      priority: 'medium',
      assignedTo: 'Mike Johnson',
      createdAt: '2024-01-14 16:45',
      lastUpdate: '2024-01-15 10:15',
      description: 'Customer has questions about charges on their latest invoice.',
    },
    {
      id: 'TK-2024-003',
      subject: 'Request for additional container',
      customer: 'XYZ Renovations',
      status: 'resolved',
      priority: 'low',
      assignedTo: 'Emily Davis',
      createdAt: '2024-01-13 11:20',
      lastUpdate: '2024-01-14 09:30',
      description: 'Customer needs an additional 15-yard container for their project.',
    },
    {
      id: 'TK-2024-004',
      subject: 'Damaged container report',
      customer: 'Green Building Co.',
      status: 'open',
      priority: 'high',
      assignedTo: 'Tom Brown',
      createdAt: '2024-01-15 08:15',
      lastUpdate: '2024-01-15 12:45',
      description: 'Customer reports damage to container #C-301 during delivery.',
    },
    {
      id: 'TK-2024-005',
      subject: 'Pickup scheduling conflict',
      customer: 'John Smith',
      status: 'in-progress',
      priority: 'medium',
      assignedTo: 'Lisa Wilson',
      createdAt: '2024-01-14 13:30',
      lastUpdate: '2024-01-15 11:00',
      description: 'Customer needs to reschedule pickup due to project delays.',
    },
  ];

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || ticket.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'danger';
      case 'in-progress': return 'warning';
      case 'resolved': return 'success';
      case 'closed': return 'default';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const faqItems = [
    {
      question: 'How do I schedule a container delivery?',
      answer: 'You can schedule a delivery by creating a new order in the Orders section. Select your customer, container type, and preferred delivery date and time.',
    },
    {
      question: 'What should I do if a container is damaged?',
      answer: 'Immediately create a support ticket with photos of the damage and details about when and how it occurred. Our maintenance team will assess and handle the repair or replacement.',
    },
    {
      question: 'How can I track driver locations?',
      answer: 'Driver locations and status updates are available in the Dashboard under Today\'s Schedule. You can see real-time updates for all active deliveries and pickups.',
    },
    {
      question: 'What payment methods do we accept?',
      answer: 'We accept credit cards, ACH transfers, and checks. Payment terms can be configured per customer in their profile settings.',
    },
    {
      question: 'How do I add a new team member?',
      answer: 'Go to Team Management and click "Add Team Member". Fill in their details, assign a role, and set appropriate permissions for their position.',
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Support Center</h1>
            <p className="text-gray-600 mt-1">Manage customer support tickets and help documentation</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <SafeIcon icon={FiPlus} className="h-4 w-4 mr-2" />
            New Ticket
          </Button>
        </div>
      </motion.div>

      {/* Support Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Open Tickets', value: '12', color: 'bg-red-500', icon: FiAlertCircle },
          { title: 'In Progress', value: '8', color: 'bg-yellow-500', icon: FiClock },
          { title: 'Resolved Today', value: '15', color: 'bg-green-500', icon: FiCheckCircle },
          { title: 'Avg Response Time', value: '2.3h', color: 'bg-blue-500', icon: FiHeadphones },
        ].map((stat, index) => (
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
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <SafeIcon icon={stat.icon} className="h-6 w-6 text-white" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Support Tickets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Support Tickets</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ticket
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Update
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTickets.map((ticket, index) => (
                  <motion.tr
                    key={ticket.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{ticket.id}</div>
                        <div className="text-sm text-gray-500">{ticket.subject}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <SafeIcon icon={FiUser} className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{ticket.customer}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusColor(ticket.status)}>
                        {ticket.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getPriorityColor(ticket.priority)} size="sm">
                        {ticket.priority}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {ticket.assignedTo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {ticket.lastUpdate}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                  <SafeIcon icon={FiMessageCircle} className="h-4 w-4 text-primary-600 mr-2" />
                  {item.question}
                </h3>
                <p className="text-sm text-gray-600 ml-6">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* New Ticket Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Support Ticket"
        size="lg"
      >
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option value="">Select customer</option>
                <option value="abc-construction">ABC Construction</option>
                <option value="home-depot">Home Depot</option>
                <option value="xyz-renovations">XYZ Renovations</option>
                <option value="green-building">Green Building Co.</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter ticket subject"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Describe the issue or request in detail"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assign To
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              <option value="">Select team member</option>
              <option value="sarah-johnson">Sarah Johnson</option>
              <option value="mike-johnson">Mike Johnson</option>
              <option value="emily-davis">Emily Davis</option>
              <option value="tom-brown">Tom Brown</option>
              <option value="lisa-wilson">Lisa Wilson</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-6">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Create Ticket
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Support;