# Task: Xây dựng chức năng Checkout

## Progress

### Phase 1: Backend Fixes

- [x] Sửa `.env` — thêm JWT_SECRET
- [x] Sửa `orderModel.js` — `discount_id` allowNull: true
- [x] Export `Order`, `OrderItem`, `User` từ `models/index.js`

### Phase 2: Backend Order API

- [x] Tạo `orderService.js` — logic tạo đơn hàng (transaction, stock validation)
- [x] Tạo `orderController.js` — controller nhận request
- [x] Tạo `orderRouter.js` — route `/api/orders`
- [x] Đăng ký orderRoutes trong `app.js`
- [x] Thêm `start`/`dev` script trong `package.json`

### Phase 3: Frontend Cart → Checkout

- [x] Sửa `Cart.jsx` — dùng `navigate` thay `<Link>`, truyền state
- [x] Sửa `CheckOut.jsx` — nhận state thật, gọi API tạo order
- [x] Tạo `OrderSuccess.jsx` — trang thông báo thành công

### Phase 4: Routing

- [x] Thêm route OrderSuccess trong `App.jsx`
