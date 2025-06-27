import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import ReactECharts from 'echarts-for-react';
import SafeIcon from '../../common/SafeIcon';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';

const { FiBarChart3, FiTrendingUp, FiCalendar, FiDownload } = FiIcons;

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const revenueChartOptions = {
    title: {
      text: 'Revenue Trend',
      left: 'left',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#374151'
      }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e5e7eb',
      textStyle: {
        color: '#374151'
      }
    },
    legend: {
      data: ['Revenue', 'Target'],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '${value}k'
      }
    },
    series: [
      {
        name: 'Revenue',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          color: '#3b82f6'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(59, 130, 246, 0.3)'
            }, {
              offset: 1, color: 'rgba(59, 130, 246, 0.1)'
            }]
          }
        },
        data: [35, 42, 38, 45, 52, 48, 55, 58, 62, 59, 65, 68]
      },
      {
        name: 'Target',
        type: 'line',
        smooth: true,
        lineStyle: {
          color: '#10b981',
          type: 'dashed'
        },
        data: [40, 45, 42, 48, 55, 50, 58, 60, 65, 62, 68, 70]
      }
    ]
  };

  const containerUtilizationOptions = {
    title: {
      text: 'Container Utilization',
      left: 'left',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#374151'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'right',
      data: ['10-yard', '15-yard', '20-yard', '30-yard', '40-yard']
    },
    series: [
      {
        name: 'Container Usage',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 32, name: '10-yard', itemStyle: { color: '#3b82f6' } },
          { value: 28, name: '15-yard', itemStyle: { color: '#10b981' } },
          { value: 41, name: '20-yard', itemStyle: { color: '#f59e0b' } },
          { value: 27, name: '30-yard', itemStyle: { color: '#ef4444' } },
          { value: 19, name: '40-yard', itemStyle: { color: '#8b5cf6' } }
        ]
      }
    ]
  };

  const performanceMetrics = [
    {
      title: 'Total Revenue',
      value: '$284,392',
      change: '+12.5%',
      trend: 'up',
      period: 'vs last month'
    },
    {
      title: 'Active Rentals',
      value: '147',
      change: '+8.2%',
      trend: 'up',
      period: 'vs last month'
    },
    {
      title: 'Utilization Rate',
      value: '78.4%',
      change: '+3.1%',
      trend: 'up',
      period: 'vs last month'
    },
    {
      title: 'Customer Satisfaction',
      value: '4.8/5',
      change: '+0.2',
      trend: 'up',
      period: 'avg rating'
    }
  ];

  const topCustomers = [
    { name: 'ABC Construction', orders: 24, revenue: '$12,450', growth: '+15%' },
    { name: 'Home Depot', orders: 45, revenue: '$28,900', growth: '+22%' },
    { name: 'XYZ Renovations', orders: 31, revenue: '$15,670', growth: '+8%' },
    { name: 'Green Building Co.', orders: 18, revenue: '$9,200', growth: '+12%' },
    { name: 'City Construction', orders: 22, revenue: '$11,300', growth: '+18%' },
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
            <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
            <p className="text-gray-600 mt-1">Visualize business performance and insights</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiCalendar} className="h-4 w-4 text-gray-500" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
            <Button variant="outline">
              <SafeIcon icon={FiDownload} className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
                  <div className="flex items-center mt-2">
                    <SafeIcon 
                      icon={FiTrendingUp} 
                      className="h-4 w-4 mr-1 text-green-500"
                    />
                    <span className="text-sm font-medium text-green-600">
                      {metric.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">{metric.period}</span>
                  </div>
                </div>
                <div className="p-3 bg-primary-100 rounded-lg">
                  <SafeIcon icon={FiBarChart3} className="h-6 w-6 text-primary-600" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-6">
            <ReactECharts option={revenueChartOptions} style={{ height: '400px' }} />
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="p-6">
            <ReactECharts option={containerUtilizationOptions} style={{ height: '400px' }} />
          </Card>
        </motion.div>
      </div>

      {/* Top Customers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Top Customers</h2>
            <Badge variant="info">{topCustomers.length} customers</Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Growth
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topCustomers.map((customer, index) => (
                  <motion.tr
                    key={customer.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{customer.orders}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{customer.revenue}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="success" size="sm">
                        {customer.growth}
                      </Badge>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Analytics;