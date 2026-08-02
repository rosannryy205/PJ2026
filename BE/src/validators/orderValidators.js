const { body, validationResult } = require("express-validator");

/**
 * Middleware kiểm tra kết quả validation
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
 * Validation rules cho POST /api/orders (create order)
 */
const createOrderRules = () => [
  // receiver_name ở root (flat), FE gửi: { receiver_name, receiver_phone, ... }
  body("receiver_name")
    .trim()
    .notEmpty()
    .withMessage("Receiver name is required"),

  body("receiver_phone")
    .trim()
    .notEmpty()
    .withMessage("Receiver phone is required")
    .matches(/^(0|\+84)[3|5|7|8|9][0-9]{8}$/)
    .withMessage("Invalid phone number format (VN)"),

  body("receiver_email")
    .optional({ values: "falsy" })
    .trim()
    .isEmail()
    .withMessage("Invalid email format"),

  body("address").trim().notEmpty().withMessage("Shipping address is required"),

  // FE gửi payment_method (snake_case), validator kiểm tra paymentMethod
  body("payment_method")
    .optional()
    .trim()
    .isIn(["cod", "vnpay", "momo", "bank"])
    .withMessage("Payment method must be one of: cod, vnpay, momo, bank"),

  body("note")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Note must not exceed 1000 characters"),
];

module.exports = {
  handleValidationErrors,
  createOrderRules,
};
