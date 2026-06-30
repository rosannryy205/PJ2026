// Middleware error handler tập trung
// Chuẩn hoá format lỗi để FE xử lý đồng nhất.

const errorHandler = (err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;

