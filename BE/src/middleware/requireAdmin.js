const User = require("../models/userModel");

/**
 * Middleware: requireAdmin
 * - BẮT BUỘC chạy sau requireAuth (đã có req.user.id).
 * - Load user từ DB và kiểm tra role có phải "admin" hay không.
 * - Nếu không phải admin => trả 403.
 */
module.exports = async function requireAdmin(req, res, next) {
  try {
    // Chỉ lấy role để tránh query thừa.
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "role"],
    });

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admin access required",
      });
    }

    // Gắn lại role đã load để service dùng nếu cần.
    req.user.role = user.role;
    return next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: "Forbidden: Admin access required",
    });
  }
};
