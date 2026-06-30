const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./routers/userRouter"); //gọi các route từ userRouter.js
const productRoutes = require("./routers/productRouter"); //gọi các route từ productRouter.js
const categoryRoutes = require("./routers/categoryRouter"); //gọi các route từ categoryRouter.js

// CORS: cho phép FE chạy tại http://localhost:5173 truy cập API
app.use(
  cors({
    origin: [
      "http://localhost:5175",
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5176",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Middleware để phân tích dữ liệu JSON từ request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Định nghĩa các route cho người dùng
app.use("/api/users", userRoutes);
// Định nghĩa các route cho sản phẩm
app.use("/api/products", productRoutes);
// Định nghĩa các route cho danh mục
app.use("/api/categories", categoryRoutes);

// Route mặc định để kiểm tra API
app.get("/", (req, res) => {
    res.send("Welcome to the User Management API");
});

// Error handler tập trung
app.use(require("./middleware/errorHandler"));

// Xuất app để sử dụng trong server.js
module.exports = app;
