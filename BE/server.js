require("dotenv").config();
const app = require("./src/app");
const { connectDB } = require("./src/config/db");

// ─── Kiểm tra biến môi trường bắt buộc ───
const requiredEnvs = ["JWT_SECRET"];
const missing = requiredEnvs.filter((key) => !process.env[key]);
if (missing.length > 0) {
  console.error(
    `[FATAL] Missing required environment variables: ${missing.join(", ")}`,
  );
  console.error(
    "[FATAL] Vui lòng set các biến này trong file .env trước khi khởi động.",
  );
  process.exit(1);
}

const PORT = process.env.PORT || 3000;

// Kết nối đến cơ sở dữ liệu
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
