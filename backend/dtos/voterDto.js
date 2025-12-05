const { body, param } = require('express-validator');

// Validation rules for creating a voter
const createVoterValidationRules = () => {
    return [
        body('name')
            .trim()
            .notEmpty().withMessage('Name is required')
            .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
        
        body('age')
            .notEmpty().withMessage('Age is required')
            .isInt({ min: 18, max: 120 }).withMessage('Age must be between 18 and 120'),
        
        body('gender')
            .notEmpty().withMessage('Gender is required')
            .isIn(['Male', 'Female', 'Other']).withMessage('Gender must be Male, Female, or Other'),
        
        body('nid')
            .trim()
            .notEmpty().withMessage('NID is required')
            .isLength({ min: 10, max: 20 }).withMessage('NID must be between 10 and 20 characters'),
        
        body('phone')
            .optional()
            .trim()
            .matches(/^[0-9+\-\s()]*$/).withMessage('Phone number format is invalid'),
        
        body('profession')
            .optional()
            .trim(),
        
        body('division')
            .notEmpty().withMessage('Division is required')
            .isObject().withMessage('Division must be an object'),
        
        body('division.id')
            .notEmpty().withMessage('Division ID is required'),
        
        body('division.name')
            .notEmpty().withMessage('Division name is required'),
        
        body('district')
            .notEmpty().withMessage('District is required')
            .isObject().withMessage('District must be an object'),
        
        body('district.id')
            .notEmpty().withMessage('District ID is required'),
        
        body('district.name')
            .notEmpty().withMessage('District name is required'),
        
        body('upazilla')
            .notEmpty().withMessage('Upazilla is required')
            .isObject().withMessage('Upazilla must be an object'),
        
        body('upazilla.id')
            .notEmpty().withMessage('Upazilla ID is required'),
        
        body('upazilla.name')
            .notEmpty().withMessage('Upazilla name is required'),
        
        body('union')
            .notEmpty().withMessage('Union is required')
            .isObject().withMessage('Union must be an object'),
        
        body('union.id')
            .notEmpty().withMessage('Union ID is required'),
        
        body('union.name')
            .notEmpty().withMessage('Union name is required'),
        
        body('ward')
            .notEmpty().withMessage('Ward is required')
            .trim(),
        
        body('voter_center')
            .notEmpty().withMessage('Voter center is required')
            .trim()
    ];
};

// Validation rules for updating a voter
const updateVoterValidationRules = () => {
    return [
        param('id')
            .notEmpty().withMessage('Voter ID is required')
            .isInt({ gt: 0 }).withMessage('Voter ID must be a positive integer'),
        
        body('name')
            .optional()
            .trim()
            .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
        
        body('age')
            .optional()
            .isInt({ min: 18, max: 120 }).withMessage('Age must be between 18 and 120'),
        
        body('gender')
            .optional()
            .isIn(['Male', 'Female', 'Other']).withMessage('Gender must be Male, Female, or Other'),
        
        body('phone')
            .optional()
            .trim()
            .matches(/^[0-9+\-\s()]*$/).withMessage('Phone number format is invalid'),
        
        body('profession')
            .optional()
            .trim()
    ];
};

// Validation rules for deleting a voter
const deleteVoterValidationRules = () => {
    return [
        param('id')
            .notEmpty().withMessage('Voter ID is required')
            .isInt({ gt: 0 }).withMessage('Voter ID must be a positive integer')
    ];
};

// Validation rules for getting a single voter
const getVoterValidationRules = () => {
    return [
        param('id')
            .notEmpty().withMessage('Voter ID is required')
            .isInt({ gt: 0 }).withMessage('Voter ID must be a positive integer')
    ];
};

module.exports = {
    createVoterValidationRules,
    updateVoterValidationRules,
    deleteVoterValidationRules,
    getVoterValidationRules
};
