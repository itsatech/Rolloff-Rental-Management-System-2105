import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import Modal from '../../components/UI/Modal';

const { FiUserCheck, FiPlus, FiSearch, FiEdit, FiTrash2, FiPhone, FiMail, FiMapPin, FiUser } = FiIcons;

const Team = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@rolloffrentals.com',
      phone: '(555) 123-4567',
      role: 'Admin',
      department: 'Management',
      status: 'active',
      joinDate: '2022-03-15',
      avatar: 'SJ',
      permissions: ['Full Access', 'User Management', 'Reports'],
    },
    {
      id: 2,
      name: 'Mike Johnson',
      email: 'mike.johnson@rolloffrentals.com',
      phone: '(555) 234-5678',
      role: 'Driver',
      department: 'Operations',
      status: 'active',
      joinDate: '2023-01-20',
      avatar: 'MJ',
      permissions: ['Schedule View', 'Order Updates'],
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily.davis@rolloffrentals.com',
      phone: '(555) 345-6789',
      role: 'Office Staff',
      department: 'Customer Service',
      status: 'active',
      joinDate: '2022-08-10',
      avatar: 'ED',
      permissions: ['Customer Management', 'Order Management'],
    },
    {
      id: 4,
      name: 'Tom Brown',
      email: 'tom.brown@rolloffrentals.com',
      phone: '(555) 456-7890',
      role: 'Driver',
      department: 'Operations',
      status: 'active',
      joinDate: '2023-02-05',
      avatar: 'TB',
      permissions: ['Schedule View', 'Order Updates'],
    },
    {
      id: 5,
      name: 'Lisa Wilson',
      email: 'lisa.wilson@rolloffrentals.com',
      phone: '(555) 567-8901',
      role: 'Manager',
      department: 'Operations',
      status: 'active',
      joinDate: '2021-11-30',
      avatar: 'LW',
      permissions: ['Team Management', 'Schedule Management', 'Reports'],
    },
    {
      id: 6,
      name: 'David Martinez',
      email: 'david.martinez@rolloffrentals.com',
      phone: '(555) 678-9012',
      role: 'Driver',
      department: 'Operations',
      status: 'inactive',
      joinDate: '2023-06-15',
      avatar: 'DM',
      permissions: ['Schedule View', 'Order Updates'],
    },
  ];

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRole === 'all' || member.role.toLowerCase() === filterRole.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    return status === 'active' ? 'success' : 'warning';
  };

  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case 'admin': return 'danger';
      case 'manager': return 'primary';
      case 'office staff': return 'info';
      case 'driver': return 'success';
      default: return 'default';
    }
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
            <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
            <p className="text-gray-600 mt-1">Manage staff, drivers, roles, and permissions</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <SafeIcon icon={FiPlus} className="h-4 w-4 mr-2" />
            Add Team Member
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
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="office staff">Office Staff</option>
                <option value="driver">Driver</option>
              </select>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <SafeIcon icon={FiUserCheck} className="h-4 w-4" />
              <span>{filteredMembers.length} team members</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {member.avatar}
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                        <p className="text-sm text-gray-500">{member.department}</p>
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
                    <div className="flex items-center text-sm text-gray-600">
                      <SafeIcon icon={FiMail} className="h-3 w-3 mr-2" />
                      {member.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <SafeIcon icon={FiPhone} className="h-3 w-3 mr-2" />
                      {member.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <SafeIcon icon={FiUser} className="h-3 w-3 mr-2" />
                      Joined {member.joinDate}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <Badge variant={getRoleColor(member.role)}>
                      {member.role}
                    </Badge>
                    <Badge variant={getStatusColor(member.status)}>
                      {member.status}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-2">Permissions:</p>
                    <div className="flex flex-wrap gap-1">
                      {member.permissions.map((permission, idx) => (
                        <Badge key={idx} variant="default" size="xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
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
        title="Add New Team Member"
        size="lg"
      >
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="office-staff">Office Staff</option>
                <option value="driver">Driver</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option value="">Select department</option>
                <option value="management">Management</option>
                <option value="operations">Operations</option>
                <option value="customer-service">Customer Service</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Permissions
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                'Full Access',
                'User Management',
                'Customer Management',
                'Order Management',
                'Schedule Management',
                'Team Management',
                'Reports',
                'Schedule View',
                'Order Updates'
              ].map((permission) => (
                <label key={permission} className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{permission}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Add Team Member
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Team;