'use client'
import React, { useState, useEffect } from 'react'
import {
    FaUsers,
    FaPlus,
    FaFileUpload,
    FaFilter,
    FaSearch,
    FaTimes
} from 'react-icons/fa'
import toast from 'react-hot-toast'
import VoterCard from '@/app/components/voter/VoterCard'
import VoterAddModal from '@/app/components/voter/VoterAddModal'
import DefaultLayout from '@/app/components/layout/DefaultLayout'
import {
    FIXED_DIVISIONS,
    fetchDistricts as fetchDistrictsApi,
    fetchUpazillas as fetchUpazillasApi,
    fetchUnions as fetchUnionsApi
} from '@/app/utils/locationApi'
import {
    fetchVoters as fetchVotersApi,
    createVoter as createVoterApi,
    deleteVoter as deleteVoterApi
} from '@/app/utils/voterApi'

const VoterPage = () => {
    const [voters, setVoters] = useState([])
    const [filteredVoters, setFilteredVoters] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [showFilters, setShowFilters] = useState(false)
    const [showAddModal, setShowAddModal] = useState(false)
    const [loading, setLoading] = useState(true)

    // Location filter states (aligned with voter form)
    const [filters, setFilters] = useState({
        division: '',
        district: '',
        upazilla: '',
        union: ''
    })

    const [divisions, setDivisions] = useState(FIXED_DIVISIONS)
    const [districts, setDistricts] = useState([])
    const [upazillas, setUpazillas] = useState([])
    const [unions, setUnions] = useState([])
    const [locationLoading, setLocationLoading] = useState({
        districts: false,
        upazillas: false,
        unions: false
    })

    // Fetch voters on component mount
    useEffect(() => {
        const loadVoters = async () => {
            try {
                setLoading(true)
                const response = await fetchVotersApi({ limit: 1000 })
                if (response.success) {
                    // Parse JSON strings to objects for location data
                    const parsedVoters = response.data.map(voter => ({
                        ...voter,
                        division: typeof voter.division === 'string' ? JSON.parse(voter.division) : voter.division,
                        district: typeof voter.district === 'string' ? JSON.parse(voter.district) : voter.district,
                        upazilla: typeof voter.upazilla === 'string' ? JSON.parse(voter.upazilla) : voter.upazilla,
                        union: typeof voter.union === 'string' ? JSON.parse(voter.union) : voter.union,
                    }))
                    setVoters(parsedVoters)
                } else {
                    toast.error('Failed to fetch voters')
                }
            } catch (error) {
                console.error('Error loading voters:', error)
                toast.error('Failed to load voters. Please try again.')
            } finally {
                setLoading(false)
            }
        }

        loadVoters()
    }, [])

    // Stats
    const stats = [
        {
            title: 'Total Voters',
            value: voters.length.toLocaleString(),
            icon: FaUsers,
            color: 'bg-blue-500',
            lightBg: 'bg-blue-50',
            textColor: 'text-blue-600'
        },
        {
            title: 'Filtered Results',
            value: filteredVoters.length.toLocaleString(),
            icon: FaFilter,
            color: 'bg-green-500',
            lightBg: 'bg-green-50',
            textColor: 'text-green-600'
        }
    ]

    // Helpers to fetch location data for filters
    const fetchDistricts = async (divisionId) => {
        if (!divisionId) {
            setDistricts([])
            setUpazillas([])
            setUnions([])
            return
        }

        try {
            setLocationLoading((prev) => ({ ...prev, districts: true }))
            const data = await fetchDistrictsApi(divisionId)
            setDistricts(data)
            setUpazillas([])
            setUnions([])
        } catch (error) {
            console.error('Error fetching districts:', error)
            setDistricts([])
        } finally {
            setLocationLoading((prev) => ({ ...prev, districts: false }))
        }
    }

    const fetchUpazillas = async (districtId) => {
        if (!districtId) {
            setUpazillas([])
            setUnions([])
            return
        }

        try {
            setLocationLoading((prev) => ({ ...prev, upazillas: true }))
            const data = await fetchUpazillasApi(districtId)
            setUpazillas(data)
            setUnions([])
        } catch (error) {
            console.error('Error fetching upazillas:', error)
            setUpazillas([])
        } finally {
            setLocationLoading((prev) => ({ ...prev, upazillas: false }))
        }
    }

    const fetchUnions = async (upazillaId) => {
        if (!upazillaId) {
            setUnions([])
            return
        }

        try {
            setLocationLoading((prev) => ({ ...prev, unions: true }))
            const data = await fetchUnionsApi(upazillaId)
            setUnions(data)
        } catch (error) {
            console.error('Error fetching unions:', error)
            setUnions([])
        } finally {
            setLocationLoading((prev) => ({ ...prev, unions: false }))
        }
    }

    // Apply filters
    useEffect(() => {
        let result = voters

        // Apply search
        if (searchTerm) {
            result = result.filter(voter =>
                voter.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                voter.nid?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                voter.phone?.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        // Apply location filters (matching voter form fields)
        if (filters.division) {
            result = result.filter(voter => voter.division.id === filters.division)
        }
        if (filters.district) {
            result = result.filter(voter => voter.district.id === filters.district)
        }
        if (filters.upazilla) {
            result = result.filter(voter => voter.upazilla.id === filters.upazilla)
        }
        if (filters.union) {
            result = result.filter(voter => voter.union.id === filters.union)
        }

        setFilteredVoters(result)
    }, [searchTerm, filters, voters])

    const handleFilterChange = (filterName, value) => {
        // Cascade resets similar to the voter form
        if (filterName === 'division') {
            setFilters(prev => ({
                ...prev,
                division: value,
                district: '',
                upazilla: '',
                union: ''
            }))
            fetchDistricts(value)
            return
        }

        if (filterName === 'district') {
            setFilters(prev => ({
                ...prev,
                district: value,
                upazilla: '',
                union: ''
            }))
            fetchUpazillas(value)
            return
        }

        if (filterName === 'upazilla') {
            setFilters(prev => ({
                ...prev,
                upazilla: value,
                union: ''
            }))
            fetchUnions(value)
            return
        }

        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }))
    }

    const clearFilters = () => {
        setFilters({
            division: '',
            district: '',
            upazilla: '',
            union: ''
        })
        setSearchTerm('')
        setDistricts([])
        setUpazillas([])
        setUnions([])
    }

    const handleAddVoter = () => {
        setShowAddModal(true)
    }

    const handleSubmitVoter = async (voterData) => {
        try {
            const response = await createVoterApi(voterData)
            if (response.success) {
                setVoters(prev => [response.data, ...prev])
                toast.success('Voter added successfully!')
                setShowAddModal(false)
            } else {
                toast.error(response.message || 'Failed to add voter')
            }
        } catch (error) {
            toast.error(error.message || 'Failed to add voter')
            console.error(error)
        }
    }

    const handleBulkEntry = () => {
        toast.success('Opening Bulk Entry form...')
        // Navigate to bulk entry page or open modal
    }

    const handleEditVoter = (voterId) => {
        toast.success(`Editing voter ${voterId}`)
        // Navigate to edit page or open modal
    }

    const handleDeleteVoter = async (voterId) => {
        if (confirm('Are you sure you want to delete this voter?')) {
            try {
                const response = await deleteVoterApi(voterId)
                if (response.success) {
                    setVoters(prev => prev.filter(voter => voter.id !== voterId))
                    toast.success('Voter deleted successfully!')
                } else {
                    toast.error(response.message || 'Failed to delete voter')
                }
            } catch (error) {
                toast.error(error.message || 'Failed to delete voter')
                console.error(error)
            }
        }
    }

    return (
        <DefaultLayout title='Voters'>
            <div className="p-6 bg-gray-50 min-h-screen">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Voter Management</h1>
                            <p className="text-gray-600">Manage and organize voter information efficiently</p>
                        </div>
                        <div className="flex gap-3 mt-4 md:mt-0">
                            <button
                                onClick={handleBulkEntry}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                                <FaFileUpload className="text-lg" />
                                Bulk Entry
                            </button>
                            <button
                                onClick={handleAddVoter}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                                <FaPlus className="text-lg" />
                                Add Voter
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats - Compact Display */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="flex flex-wrap items-center gap-6">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon
                            return (
                                <div key={index} className="flex items-center gap-3">
                                    <div className={`${stat.lightBg} p-2.5 rounded-lg`}>
                                        <Icon className={`text-xl ${stat.textColor}`} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{stat.title}</p>
                                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                    </div>
                                    {index < stats.length - 1 && (
                                        <div className="hidden sm:block w-px h-12 bg-gray-200 ml-3" />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    {/* Search Bar */}
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                        <div className="flex-1 relative">
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, NID, or phone number..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${showFilters
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            <FaFilter />
                            {showFilters ? 'Hide Filters' : 'Show Filters'}
                        </button>
                    </div>

                    {/* Filter Options */}
                    {showFilters && (
                        <div className="pt-4 border-t border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                {/* Division Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Division
                                    </label>
                                    <select
                                        value={filters.division}
                                        onChange={(e) => handleFilterChange('division', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    >
                                        <option value="">All Divisions</option>
                                        {divisions.map((division) => (
                                            <option key={division.id} value={division.id}>
                                                {division.name} ({division.bengali})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* District Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        District
                                    </label>
                                    <select
                                        value={filters.district}
                                        onChange={(e) => handleFilterChange('district', e.target.value)}
                                        disabled={!filters.division || locationLoading.districts}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <option value="">
                                            {locationLoading.districts ? 'Loading...' : 'All Districts'}
                                        </option>
                                        {Array.isArray(districts) &&
                                            districts.map((district) => (
                                                <option key={district.id} value={district.id}>
                                                    {district.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                {/* Upazilla Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Upazilla
                                    </label>
                                    <select
                                        value={filters.upazilla}
                                        onChange={(e) => handleFilterChange('upazilla', e.target.value)}
                                        disabled={!filters.district || locationLoading.upazillas}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <option value="">
                                            {locationLoading.upazillas ? 'Loading...' : 'All Upazillas'}
                                        </option>
                                        {Array.isArray(upazillas) &&
                                            upazillas.map((upazilla) => (
                                                <option key={upazilla.id} value={upazilla.id}>
                                                    {upazilla.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                {/* Union Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Union
                                    </label>
                                    <select
                                        value={filters.union}
                                        onChange={(e) => handleFilterChange('union', e.target.value)}
                                        disabled={!filters.upazilla || locationLoading.unions}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <option value="">
                                            {locationLoading.unions ? 'Loading...' : 'All Unions'}
                                        </option>
                                        {Array.isArray(unions) &&
                                            unions.map((union) => (
                                                <option key={union.id} value={union.id}>
                                                    {union.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            </div>

                            {/* Clear Filters Button */}
                            {(filters.division || filters.district || filters.upazilla || filters.union || searchTerm) && (
                                <button
                                    onClick={clearFilters}
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
                                >
                                    <FaTimes />
                                    Clear All Filters
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Voters Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Voter Info
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        NID
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Contact
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Location
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center text-gray-500">
                                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                                                <p className="text-lg font-medium">Loading voters...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredVoters.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center text-gray-500">
                                                <FaUsers className="text-5xl mb-4 text-gray-300" />
                                                <p className="text-lg font-medium">No voters found</p>
                                                <p className="text-sm mt-1">Try adjusting your filters or add new voters</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredVoters.map((voter, index) => (
                                        <VoterCard
                                            key={voter.id || index}
                                            voter={voter}
                                            onEdit={handleEditVoter}
                                            onDelete={handleDeleteVoter}
                                        />
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {filteredVoters.length > 0 && (
                    <div className="mt-6 flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                            Showing <span className="font-semibold">{filteredVoters.length}</span> of{' '}
                            <span className="font-semibold">{voters.length}</span> voters
                        </p>
                    </div>
                )}

                {/* Add Voter Modal */}
                <VoterAddModal
                    isOpen={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onSubmit={handleSubmitVoter}
                />
            </div>
        </DefaultLayout>
    )
}

export default VoterPage
