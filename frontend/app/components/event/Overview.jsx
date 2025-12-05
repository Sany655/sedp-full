'use client';

import React, { useState } from 'react'
import { 
  FaCalendarAlt, 
  FaUsers, 
  FaMapMarkerAlt, 
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaChartLine,
  FaPlus,
  FaEllipsisV,
  FaEdit,
  FaTrash,
  FaEye,
  FaFilter,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaList,
  FaCalendar
} from 'react-icons/fa'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, isToday, parseISO } from 'date-fns'
import toast from 'react-hot-toast'

const Overview = ({events:all}) => {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('calendar') // 'list' or 'calendar'
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)

  // Stats data
  const stats = [
    {
      title: 'Total Events',
      value: '45',
      change: '+8 this month',
      icon: FaCalendarAlt,
      color: 'bg-blue-500',
      lightBg: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Upcoming Events',
      value: '12',
      change: 'Next 7 days',
      icon: FaClock,
      color: 'bg-green-500',
      lightBg: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Total Participants',
      value: '2,847',
      change: '+234 this week',
      icon: FaUsers,
      color: 'bg-purple-500',
      lightBg: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Completed Events',
      value: '33',
      change: '73% success rate',
      icon: FaCheckCircle,
      color: 'bg-orange-500',
      lightBg: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ]

  // Events data
  const [events, setEvents] = useState([
    {
      id: 1,
      name: 'Town Hall Meeting - District 5',
      date: '2025-11-28',
      time: '18:00',
      location: 'Community Center Hall',
      participants: 150,
      capacity: 200,
      status: 'upcoming',
      type: 'Town Hall',
      organizer: 'Sarah Johnson',
      color: '#3b82f6'
    },
    {
      id: 2,
      name: 'Voter Registration Drive',
      date: '2025-11-29',
      time: '09:00',
      location: 'Downtown Plaza',
      participants: 45,
      capacity: 100,
      status: 'upcoming',
      type: 'Registration',
      organizer: 'Michael Chen',
      color: '#10b981'
    },
    {
      id: 3,
      name: 'Campaign Rally - North Region',
      date: '2025-11-30',
      time: '15:00',
      location: 'City Park Amphitheater',
      participants: 320,
      capacity: 500,
      status: 'upcoming',
      type: 'Rally',
      organizer: 'Emily Rodriguez',
      color: '#f59e0b'
    },
    {
      id: 4,
      name: 'Volunteer Training Session',
      date: '2025-12-15T03:00:00.000Z',
      time: '10:00',
      location: 'Campaign Headquarters',
      participants: 28,
      capacity: 30,
      status: 'upcoming',
      type: 'Training',
      organizer: 'David Smith',
      color: '#8b5cf6'
    },
    {
      id: 5,
      name: 'Community Debate Forum',
      date: '2025-11-27',
      time: '19:00',
      location: 'University Auditorium',
      participants: 180,
      capacity: 200,
      status: 'completed',
      type: 'Debate',
      organizer: 'Lisa Anderson',
      color: '#6366f1'
    },
    {
      id: 6,
      name: 'Door-to-Door Campaign Kickoff',
      date: '2025-11-25',
      time: '08:00',
      location: 'Various Neighborhoods',
      participants: 67,
      capacity: 80,
      status: 'completed',
      type: 'Campaign',
      organizer: 'John Martinez',
      color: '#ec4899'
    },
    {
      id: 7,
      name: 'Youth Voter Outreach',
      date: '2025-12-05',
      time: '14:00',
      location: 'University Campus',
      participants: 95,
      capacity: 150,
      status: 'upcoming',
      type: 'Outreach',
      organizer: 'Jennifer Lee',
      color: '#14b8a6'
    },
    {
      id: 8,
      name: 'Policy Discussion Panel',
      date: '2025-12-08',
      time: '17:00',
      location: 'Convention Center',
      participants: 210,
      capacity: 300,
      status: 'upcoming',
      type: 'Discussion',
      organizer: 'Robert Taylor',
      color: '#f97316'
    },
    {
      id: 8,
      name: 'Policy Discussion Panel',
      date: '2025-12-31',
      time: '17:00',
      location: 'Convention Center',
      participants: 210,
      capacity: 300,
      status: 'upcoming',
      type: 'Discussion',
      organizer: 'Robert Taylor',
      color: '#f97316'
    },
  ])

  // Chart data - Event attendance over time
  const attendanceData = [
    { month: 'Jun', events: 8, participants: 420 },
    { month: 'Jul', events: 12, participants: 650 },
    { month: 'Aug', events: 10, participants: 580 },
    { month: 'Sep', events: 15, participants: 890 },
    { month: 'Oct', events: 18, participants: 1120 },
    { month: 'Nov', events: 22, participants: 1340 }
  ]

  // Event types distribution
  const eventTypesData = [
    { name: 'Town Hall', count: 12 },
    { name: 'Rally', count: 8 },
    { name: 'Training', count: 10 },
    { name: 'Registration', count: 7 },
    { name: 'Debate', count: 5 },
    { name: 'Campaign', count: 3 }
  ]

  // Calendar functions
  const getDaysInMonth = () => {
    const start = startOfMonth(currentMonth)
    const end = endOfMonth(currentMonth)
    return eachDayOfInterval({ start, end })
  }

  const getEventsForDate = (date) => {
    return events.filter(event => 
      isSameDay(parseISO(event.date), date)
    )
  }

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const handleDateClick = (date) => {
    setSelectedDate(date)
    const dateEvents = getEventsForDate(date)
    if (dateEvents.length > 0) {
      toast.success(`${dateEvents.length} event(s) on ${format(date, 'MMM dd, yyyy')}`)
    }
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      upcoming: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Upcoming' },
      ongoing: { bg: 'bg-green-100', text: 'text-green-700', label: 'Ongoing' },
      completed: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Completed' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-700', label: 'Cancelled' }
    }
    const config = statusConfig[status]
    return (
      <span className={`${config.bg} ${config.text} text-xs font-semibold px-2 py-1 rounded`}>
        {config.label}
      </span>
    )
  }

  const getCapacityColor = (participants, capacity) => {
    const percentage = (participants / capacity) * 100
    if (percentage >= 90) return 'text-red-600'
    if (percentage >= 70) return 'text-orange-600'
    return 'text-green-600'
  }

  const handleCreateEvent = () => {
    toast.success('Opening event creation form...')
  }

  const handleViewEvent = (eventId) => {
    toast.success(`Viewing event details for ID: ${eventId}`)
  }

  const handleEditEvent = (eventId) => {
    toast.success(`Editing event ID: ${eventId}`)
  }

  const handleDeleteEvent = (eventId) => {
    toast.error(`Event ID: ${eventId} deleted`)
  }

  const filteredEvents = events.filter(event => {
    const matchesFilter = selectedFilter === 'all' || event.status === selectedFilter
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  // Get the first day of the month and calculate offset
  const firstDayOfMonth = startOfMonth(currentMonth)
  const daysInMonth = getDaysInMonth()
  const startDayOfWeek = firstDayOfMonth.getDay() // 0 = Sunday, 1 = Monday, etc.

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Management</h1>
          <p className="text-gray-600">Manage and track all your campaign events</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          {/* View Toggle */}
          <div className="flex bg-white border border-gray-200 rounded-lg shadow-sm">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-l-lg font-medium transition-colors flex items-center space-x-2 ${
                viewMode === 'list' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FaList />
              <span>List</span>
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-r-lg font-medium transition-colors flex items-center space-x-2 ${
                viewMode === 'calendar' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FaCalendar />
              <span>Calendar</span>
            </button>
          </div>
          
          <button
            onClick={handleCreateEvent}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-md"
          >
            <FaPlus />
            <span>Create Event</span>
          </button>
        </div>
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
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.name}</h3>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.change}</p>
            </div>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Attendance Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Event Attendance Trend</h2>
            <FaChartLine className="text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
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
              <Line type="monotone" dataKey="participants" stroke="#3b82f6" strokeWidth={2} name="Participants" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Event Types Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Events by Type</h2>
            <FaCalendarAlt className="text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={eventTypesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Search */}
          <div className="relative flex-1 md:max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center space-x-2">
            <FaFilter className="text-gray-400" />
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedFilter('upcoming')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === 'upcoming' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setSelectedFilter('completed')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === 'completed' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Completed
            </button>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {format(currentMonth, 'MMMM yyyy')}
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePreviousMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaChevronLeft className="text-gray-600" />
              </button>
              <button
                onClick={() => setCurrentMonth(new Date())}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Today
              </button>
              <button
                onClick={handleNextMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaChevronRight className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Day Headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-semibold text-gray-600 text-sm py-2">
                {day}
              </div>
            ))}

            {/* Empty cells for days before month starts */}
            {Array.from({ length: startDayOfWeek }).map((_, index) => (
              <div key={`empty-${index}`} className="min-h-24 bg-gray-50 rounded-lg"></div>
            ))}

            {/* Calendar Days */}
            {daysInMonth.map(day => {
              const dayEvents = getEventsForDate(day)
              const isCurrentMonth = isSameMonth(day, currentMonth)
              const isTodayDate = isToday(day)
              const isSelected = selectedDate && isSameDay(day, selectedDate)

              return (
                <div
                  key={day.toString()}
                  onClick={() => handleDateClick(day)}
                  className={`min-h-24 border rounded-lg p-2 cursor-pointer transition-all ${
                    isTodayDate ? 'bg-blue-50 border-blue-500' : 'border-gray-200 hover:border-blue-300'
                  } ${
                    isSelected ? 'ring-2 ring-blue-500' : ''
                  } ${
                    !isCurrentMonth ? 'opacity-50' : ''
                  }`}
                >
                  <div className={`text-sm font-semibold mb-1 ${
                    isTodayDate ? 'text-blue-600' : 'text-gray-700'
                  }`}>
                    {format(day, 'd')}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map(event => (
                      <div
                        key={event.id}
                        className="text-xs p-1 rounded truncate"
                        style={{ 
                          backgroundColor: event.color + '20',
                          borderLeft: `3px solid ${event.color}`
                        }}
                        title={event.name}
                      >
                        {event.name}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-gray-500 font-medium">
                        +{dayEvents.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Selected Date Events */}
          {selectedDate && getEventsForDate(selectedDate).length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Events on {format(selectedDate, 'MMMM dd, yyyy')}
              </h3>
              <div className="space-y-3">
                {getEventsForDate(selectedDate).map(event => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-1 h-12 rounded"
                        style={{ backgroundColor: event.color }}
                      ></div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{event.name}</h4>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                          <span className="flex items-center">
                            <FaClock className="mr-1" />
                            {event.time}
                          </span>
                          <span className="flex items-center">
                            <FaMapMarkerAlt className="mr-1" />
                            {event.location}
                          </span>
                          <span className="flex items-center">
                            <FaUsers className="mr-1" />
                            {event.participants}/{event.capacity}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewEvent(event.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleEditEvent(event.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        <FaEdit />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Event Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Participants
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-1 h-12 rounded"
                          style={{ backgroundColor: event.color }}
                        ></div>
                        <div>
                          <p className="font-semibold text-gray-900">{event.title}</p>
                          <p className="text-sm text-gray-500">{event.type} • {event.organizer}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-700">
                        <FaCalendarAlt className="mr-2 text-gray-400" />
                        <div>
                          <p>{format(parseISO(event.date), 'MMM dd, yyyy')}</p>
                          <p className="text-gray-500">{event.time}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-700">
                        <FaMapMarkerAlt className="mr-2 text-gray-400" />
                        {event.location}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className={`font-semibold ${getCapacityColor(event.participants, event.capacity)}`}>
                          {event.participants} / {event.capacity}
                        </p>
                        <p className="text-gray-500">
                          {Math.round((event.participants / event.capacity) * 100)}% capacity
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(event.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewEvent(event.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleEditEvent(event.id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredEvents.length === 0 && viewMode === 'list' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <FaCalendarAlt className="mx-auto text-6xl text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your filters or create a new event</p>
          <button
            onClick={handleCreateEvent}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
          >
            <FaPlus />
            <span>Create Event</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default Overview