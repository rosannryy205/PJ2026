const { body, param, query, validationResult } = require("express-validator");

/**
 * Middleware kiểm tra kết quả validation và trả lỗi nếu có.
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
 * Validation cho GET /api/reviews?productId=
 */
const getReviewsRules = () => [
  query("productId").isInt({ min: 1 }).withMessage("Product ID không hợp lệ"),
];

/**
 * Validation cho POST /api/reviews (tạo đánh giá).
 */
const createReviewRules = () => [
  body("productId").isInt({ min: 1 }).withMessage("Product ID không hợp lệ"),

  body("productVariantId")
    .optional({ nullable: true })
    .isInt({ min: 1 })
    .withMessage("Product variant ID không hợp lệ"),

  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating phải từ 1 đến 5 sao"),

  body("title")
    .optional({ nullable: true })
    .isString()
    .trim()
    .isLength({ max: 255 })
    .withMessage("Tiêu đề không được quá 255 ký tự"),

  body("content")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Nội dung đánh giá không được để trống")
    .isLength({ min: 1, max: 2000 })
    .withMessage("Nội dung đánh giá tối đa 2000 ký tự"),
];

/**
 * Validation cho POST /api/reviews/:id/replies (admin trả lời).
 */
const createReplyRules = () => [
  param("id").isInt({ min: 1 }).withMessage("Review ID không hợp lệ"),

  body("content")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Nội dung phản hồi không được để trống")
    .isLength({ max: 1000 })
    .withMessage("Phản hồi tối đa 1000 ký tự"),
];

/**
 * Validation cho PUT /api/reviews/:id/status (admin duyệt/từ chối).
 */
const updateStatusRules = () => [
  param("id").isInt({ min: 1 }).withMessage("Review ID không hợp lệ"),

  body("status")
    .isIn(["approved", "rejected"])
    .withMessage("Status chỉ nhận approved hoặc rejected"),
];

/**
 * Validation cho POST /api/reviews/:id/like.
 */
const likeReviewRules = () => [
  param("id").isInt({ min: 1 }).withMessage("Review ID không hợp lệ"),
];

module.exports = {
  handleValidationErrors,
  getReviewsRules,
  createReviewRules,
  createReplyRules,
  updateStatusRules,
  likeReviewRules,
};
