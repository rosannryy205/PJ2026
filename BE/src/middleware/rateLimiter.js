const rateLimit = require("express-rate-limit");

/**
 * Rate limiter cho route /api/auth/login
 * - windowMs: 15 phút
 * - max: 5 lần thất bại (có thể điều chỉnh qua .env)
 * - message: lỗi rõ ràng
 */
const loginLimiter = rateLimit({
  windowMs: Number(process.env.LOGIN_RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 phút
  max: Number(process.env.LOGIN_RATE_LIMIT_MAX) || 5,
  message: {
    success: false,
    message: "Quá nhiều yêu cầu đăng nhập. Vui lòng thử lại sau 15 phút.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Rate limiter chung cho toàn bộ API (tuỳ chọn)
 */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Quá nhiều yêu cầu. Vui lòng thử lại sau.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  loginLimiter,
  apiLimiter,
};
