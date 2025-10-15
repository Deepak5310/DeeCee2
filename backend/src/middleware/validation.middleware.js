/**
 * Validation middleware for request data
 */
export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map(detail => detail.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }

    next();
  };
};

/**
 * Email validation regex
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Phone validation regex (supports international formats)
 */
export const PHONE_REGEX = /^[\d\s\-\+\(\)]{10,}$/;

/**
 * Validate email format
 */
export const validateEmail = (email) => {
  return EMAIL_REGEX.test(email);
};

/**
 * Validate phone format
 */
export const validatePhone = (phone) => {
  return PHONE_REGEX.test(phone);
};

/**
 * Sanitize input to prevent XSS
 */
export const sanitizeInput = (input) => {
  if (typeof input === 'string') {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }
  return input;
};
