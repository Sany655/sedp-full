import { BASE_URL_FOR_CLIENT } from './constants';

const API_BASE_URL = `${BASE_URL_FOR_CLIENT}/api/voters`;

/**
 * Get authentication token from localStorage
 */
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

/**
 * Get authorization headers
 */
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

/**
 * Fetch all voters with optional filters
 * @param {Object} filters - Filter options (division_id, district_id, upazilla_id, union_id, search, page, limit)
 * @returns {Promise<Object>} - Response with voters data
 */
export const fetchVoters = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (filters.division_id) queryParams.append('division_id', filters.division_id);
    if (filters.district_id) queryParams.append('district_id', filters.district_id);
    if (filters.upazilla_id) queryParams.append('upazilla_id', filters.upazilla_id);
    if (filters.union_id) queryParams.append('union_id', filters.union_id);
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.page) queryParams.append('page', filters.page);
    if (filters.limit) queryParams.append('limit', filters.limit);

    const url = `${API_BASE_URL}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch voters');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching voters:', error);
    throw error;
  }
};

/**
 * Fetch a single voter by ID
 * @param {number} id - Voter ID
 * @returns {Promise<Object>} - Response with voter data
 */
export const fetchVoterById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch voter');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching voter:', error);
    throw error;
  }
};

/**
 * Create a new voter
 * @param {Object} voterData - Voter data
 * @returns {Promise<Object>} - Response with created voter data
 */
export const createVoter = async (voterData) => {
  try {
    console.log('📤 Sending voter data:', voterData);
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(voterData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Backend error response:', errorData);
      throw new Error(errorData.message || errorData.msg || JSON.stringify(errorData.errors) || 'Failed to create voter');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating voter:', error);
    throw error;
  }
};

/**
 * Update a voter
 * @param {number} id - Voter ID
 * @param {Object} voterData - Updated voter data
 * @returns {Promise<Object>} - Response with updated voter data
 */
export const updateVoter = async (id, voterData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(voterData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update voter');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating voter:', error);
    throw error;
  }
};

/**
 * Delete a voter
 * @param {number} id - Voter ID
 * @returns {Promise<Object>} - Response confirming deletion
 */
export const deleteVoter = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete voter');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting voter:', error);
    throw error;
  }
};

/**
 * Fetch voter statistics
 * @returns {Promise<Object>} - Response with voter statistics
 */
export const fetchVoterStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/stats`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch voter statistics');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching voter statistics:', error);
    throw error;
  }
};
