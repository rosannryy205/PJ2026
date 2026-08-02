# Backend Upgrade Plan — ✅ HOÀN TẤT

## Priority 1 🔴 JWT_SECRET - Throw error nếu thiếu (BẢO MẬT - CẤP BÁCH)

- [x] Edit `server.js` - Kiểm tra JWT_SECRET khi khởi động, exit nếu thiếu
- [x] Edit `authService.js` - Bỏ fallback, dùng process.env.JWT_SECRET trực tiếp
- [x] Edit `requireAuth.js` - Bỏ fallback, dùng process.env.JWT_SECRET trực tiếp

## Priority 2 🔴 Rate-limit route login (BẢO MẬT - CAO)

- [x] Cài đặt `express-rate-limit`
- [x] Tạo `rateLimiter.js` - loginLimiter (5 lần/15 phút)
- [x] Edit `authRouter.js` - Áp dụng rate-limit cho route /login

## Priority 3 🟡 CORS origin từ .env (DEV/TRIỂN KHAI)

- [x] Edit `app.js` - Đọc CORS_ORIGIN từ process.env (comma-separated)

## Priority 4 🟢 Validation tập trung (CHẤT LƯỢNG CODE)

- [x] Cài đặt `express-validator`
- [x] Tạo `validators/authValidators.js` - login, register, send-code
- [x] Tạo `validators/cartValidators.js` - addToCart, updateCart, removeCart
- [x] Tạo `validators/orderValidators.js` - createOrder
- [x] Edit `authRouter.js` - Thêm validation middleware
- [x] Edit `registerRouter.js` - Thêm validation middleware
- [x] Edit `cartRouter.js` - Thêm validation middleware
- [x] Edit `orderRouter.js` - Thêm validation middleware
- [x] Edit `authService.js` - Bỏ validate thủ công
- [x] Edit `cartService.js` - Bỏ validate thủ công
- [x] Edit `orderService.js` - Bỏ validate thủ công

## Priority 5 🟢 Pagination (TIỆN ÍCH)

- [x] Edit `productController.js` - Nhận page, limit từ req.query
- [x] Edit `productService.js` - Dùng findAndCountAll, tính offset, trả total/page/limit
