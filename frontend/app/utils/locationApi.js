/**
 * Location API Utility
 * Centralized functions for fetching Bangladesh administrative divisions data
 */

// Fixed divisions data (static)
export const FIXED_DIVISIONS = [
    { id: 1, name: 'Chattagram', bengali: 'চট্টগ্রাম' },
    { id: 2, name: 'Rajshahi', bengali: 'রাজশাহী' },
    { id: 3, name: 'Khulna', bengali: 'খুলনা' },
    { id: 4, name: 'Barisal', bengali: 'বরিশাল' },
    { id: 5, name: 'Sylhet', bengali: 'সিলেট' },
    { id: 6, name: 'Dhaka', bengali: 'ঢাকা' },
    { id: 7, name: 'Rangpur', bengali: 'রংপুর' },
    { id: 8, name: 'Mymensingh', bengali: 'ময়মনসিংহ' }
]

const BASE_API_URL = 'https://bdapi.vercel.app/api/v.1'

/**
 * Fetch districts by division ID
 * @param {string|number} divisionId - The division ID
 * @returns {Promise<Array>} Array of district objects
 */
export const fetchDistricts = async (divisionId) => {
    if (!divisionId) {
        return []
    }

    try {
        const response = await fetch(`${BASE_API_URL}/district/${divisionId}`)
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        return Array.isArray(data.data) ? data.data : []
    } catch (error) {
        console.error('Error fetching districts:', error)
        return []
    }
}

/**
 * Fetch upazillas by district ID
 * @param {string|number} districtId - The district ID
 * @returns {Promise<Array>} Array of upazilla objects
 */
export const fetchUpazillas = async (districtId) => {
    if (!districtId) {
        return []
    }

    try {
        const response = await fetch(`${BASE_API_URL}/upazilla/${districtId}`)
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        return Array.isArray(data.data) ? data.data : []
    } catch (error) {
        console.error('Error fetching upazillas:', error)
        return []
    }
}

/**
 * Fetch unions by upazilla ID
 * @param {string|number} upazillaId - The upazilla ID
 * @returns {Promise<Array>} Array of union objects
 */
export const fetchUnions = async (upazillaId) => {
    if (!upazillaId) {
        return []
    }

    try {
        const response = await fetch(`${BASE_API_URL}/union/${upazillaId}`)
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        return Array.isArray(data.data) ? data.data : []
    } catch (error) {
        console.error('Error fetching unions:', error)
        return []
    }
}

/**
 * Get division name by ID
 * @param {string|number} divisionId - The division ID
 * @returns {string} Division name or empty string
 */
export const getDivisionName = (divisionId) => {
    const division = FIXED_DIVISIONS.find(d => d.id === Number(divisionId))
    return division ? division.name : ''
}

/**
 * Get division by ID
 * @param {string|number} divisionId - The division ID
 * @returns {Object|null} Division object or null
 */
export const getDivisionById = (divisionId) => {
    return FIXED_DIVISIONS.find(d => d.id === Number(divisionId)) || null
}
