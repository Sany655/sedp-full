'use client'
import React, { useState } from 'react'
import { 
  FaUsers, 
  FaCheckCircle, 
  FaClock, 
  FaTrophy,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaBell,
  FaChartLine
} from 'react-icons/fa'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

const Overview = () => {
  // Stats data
  const stats = [
    {
      title: 'Total Volunteers',
      value: '1,247',
      change: '+12%',
      icon: FaUsers,
      color: 'bg-blue-500',
      lightBg: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Active Today',
      value: '89',
      change: '+5%',
      icon: FaCheckCircle,
      color: 'bg-green-500',
      lightBg: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Tasks Completed',
      value: '3,421',
      change: '+23%',
      icon: FaTrophy,
      color: 'bg-purple-500',
      lightBg: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Hours Contributed',
      value: '8,934',
      change: '+18%',
      icon: FaClock,
      color: 'bg-orange-500',
      lightBg: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ]

  // Upcoming tasks
  const upcomingTasks = [
    {
      id: 1,
      title: 'Voter Registration Drive',
      location: 'Downtown Community Center',
      date: '2025-11-28',
      time: '09:00 AM',
      volunteers: 12,
      spotsLeft: 3
    },
    {
      id: 2,
      title: 'Poll Worker Training',
      location: 'City Hall',
      date: '2025-11-30',
      time: '02:00 PM',
      volunteers: 25,
      spotsLeft: 0
    },
    {
      id: 3,
      title: 'Campaign Material Distribution',
      location: 'Various Locations',
      date: '2025-12-02',
      time: '10:00 AM',
      volunteers: 8,
      spotsLeft: 7
    }
  ]

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      volunteer: 'Sarah Johnson',
      action: 'completed Voter Registration Drive',
      time: '2 hours ago',
      avatar: 'SJ'
    },
    {
      id: 2,
      volunteer: 'Michael Chen',
      action: 'joined Poll Worker Training',
      time: '4 hours ago',
      avatar: 'MC'
    },
    {
      id: 3,
      volunteer: 'Emily Rodriguez',
      action: 'completed Phone Banking Session',
      time: '5 hours ago',
      avatar: 'ER'
    },
    {
      id: 4,
      volunteer: 'David Smith',
      action: 'registered for Door-to-Door Campaign',
      time: '6 hours ago',
      avatar: 'DS'
    }
  ]

  // Chart data for volunteer activity
  const activityData = [
    { day: 'Mon', volunteers: 45, tasks: 23 },
    { day: 'Tue', volunteers: 52, tasks: 31 },
    { day: 'Wed', volunteers: 61, tasks: 28 },
    { day: 'Thu', volunteers: 58, tasks: 35 },
    { day: 'Fri', volunteers: 70, tasks: 42 },
    { day: 'Sat', volunteers: 89, tasks: 48 },
    { day: 'Sun', volunteers: 65, tasks: 38 }
  ]

  // Task distribution data
  const taskDistribution = [
    { name: 'Voter Registration', value: 35, color: '#3b82f6' },
    { name: 'Phone Banking', value: 25, color: '#10b981' },
    { name: 'Door-to-Door', value: 20, color: '#f59e0b' },
    { name: 'Event Support', value: 15, color: '#8b5cf6' },
    { name: 'Data Entry', value: 5, color: '#ef4444' }
  ]

  const handleSignUp = (taskId) => {
    toast.success('Successfully signed up for the task!')
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Volunteer Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your volunteer community.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.lightBg} p-3 rounded-lg`}>
                  <Icon className={`text-2xl ${stat.textColor}`} />
                </div>
                <span className="text-sm font-semibold text-green-600">{stat.change}</span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Activity Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Weekly Activity</h2>
            <FaChartLine className="text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="volunteers" stroke="#3b82f6" strokeWidth={2} name="Active Volunteers" />
              <Line type="monotone" dataKey="tasks" stroke="#10b981" strokeWidth={2} name="Tasks Completed" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Task Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Task Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={taskDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {taskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Upcoming Tasks and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Tasks */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Tasks</h2>
            <FaCalendarAlt className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{task.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <FaMapMarkerAlt className="mr-2 text-gray-400" />
                      {task.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FaClock className="mr-2 text-gray-400" />
                      {format(new Date(task.date), 'MMM dd, yyyy')} at {task.time}
                    </div>
                  </div>
                  {task.spotsLeft > 0 && (
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                      {task.spotsLeft} spots left
                    </span>
                  )}
                  {task.spotsLeft === 0 && (
                    <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded">
                      Full
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    <FaUsers className="inline mr-1" />
                    {task.volunteers} volunteers signed up
                  </span>
                  <button
                    onClick={() => handleSignUp(task.id)}
                    disabled={task.spotsLeft === 0}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      task.spotsLeft === 0
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {task.spotsLeft === 0 ? 'Waitlist' : 'Sign Up'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <FaBell className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 pb-4 border-b border-gray-100 last:border-0">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                    {activity.avatar}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="font-semibold">{activity.volunteer}</span>
                    {' '}{activity.action}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {/* <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">Ready to Make a Difference?</h2>
            <p className="text-blue-100">Join our community of dedicated volunteers and help shape the future.</p>
          </div>
          <div className="flex space-x-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Browse Tasks
            </button>
            <button className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors border border-blue-400">
              View Calendar
            </button>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default Overview