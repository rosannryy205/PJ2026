const jwt = require("jsonwebtoken");

/**
 * Middleware: requireAuth
 * - Đọc JWT từ cookie (httpOnly) và verify.
 * - Nếu hợp lệ: gắn req.user.
 * - Nếu không: trả 401.
 */
module.exports = function requireAuth(req, res, next) {
  try {
    // Tên cookie cần đồng bộ với set ở login
    const token = req.cookies?.auth_token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const secret = process.env.JWT_SECRET || "dev_secret_change_me";
    const payload = jwt.verify(token, secret);

    // payload dự kiến: { userId }
    req.user = { id: payload.userId };
    return next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

