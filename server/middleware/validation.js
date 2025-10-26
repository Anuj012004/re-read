const { body } = require('express-validator');

// Input validation rules for registration
exports.validateRegister = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    })
];

//  Input validation rules for login
exports.validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Validation rules for adding a book
exports.validateBook = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 2, max: 200 })
    .withMessage('Title must be between 2 and 200 characters'),
  
  body('author')
    .trim()
    .notEmpty()
    .withMessage('Author is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Author name must be between 2 and 100 characters'),
  
  body('class')
    .trim()
    .notEmpty()
    .withMessage('Class is required'),
  
  body('semester')
    .trim()
    .notEmpty()
    .withMessage('Semester is required'),
  
  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Subject must be between 2 and 100 characters'),
  
  body('publishedYear')
    .optional()
    .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
    .withMessage('Published year must be a valid year'),
  
  body('organization')
    .trim()
    .notEmpty()
    .withMessage('Organization is required'),
  
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  
  body('condition')
    .optional()
    .isIn(['new', 'like-new', 'very-good', 'good', 'acceptable'])
    .withMessage('Invalid condition value'),
  
  // DO NOT validate image, cloudinaryId, or seller in body
  // They come from req.file and req.user
];

// Validation rules for updating a book
exports.validateBookUpdate = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('Title must be between 2 and 200 characters'),
  
  body('author')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Author name must be between 2 and 100 characters'),
  
  body('class')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Class cannot be empty'),
  
  body('semester')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Semester cannot be empty'),
  
  body('subject')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Subject must be between 2 and 100 characters'),
  
  body('publishedYear')
    .optional()
    .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
    .withMessage('Published year must be a valid year'),
  
  body('organization')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Organization cannot be empty'),
  
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  
  body('condition')
    .optional()
    .isIn(['new', 'like-new', 'very-good', 'good', 'acceptable'])
    .withMessage('Invalid condition value'),
];

// Custom validation handler that also checks for file upload
exports.handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  
  // Check for validation errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() 
    });
  }
  
  next();
};

// Middleware to check if image was uploaded (only for POST)
exports.requireImage = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'Book image is required'
    });
  }
  next();
};