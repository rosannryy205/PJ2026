const { body, validationResult } = require("express-validator");

/**
 * Middleware kiểm tra kết quả validation và trả lỗi nếu có
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array()[0];
    return res.status(400).json({
      success: false,
      message: firstError.msg,
    });
  }
  return next();
};

/**
 * Validation rules cho POST /api/auth/login
 */
const loginRules = () => [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),
];

/**
 * Validation rules cho POST /api/register/send-code
 */
const sendCodeRules = () => [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),
];

/**
 * Validation rules cho POST /api/register (register with OTP)
 */
const registerRules = () => [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("code")
    .trim()
    .notEmpty()
    .withMessage("Verification code is required")
    .matches(/^\d{6}$/)
    .withMessage("Verification code must be 6 digits"),
];

module.exports = {
  handleValidationErrors,
  loginRules,
  sendCodeRules,
  registerRules,
};
