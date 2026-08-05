# TODO - Fix userProfile.jsx React lint errors

## Lỗi 1: Adjusting state during effect (dòng 94-99)
- [x] Khởi tạo form state trực tiếp từ `user` (user?.name, user?.phone, user?.address)
- [x] Thêm pattern "adjusting state during render" với `prevUser`
- [x] Xóa useEffect cũ

## Lỗi 2: fetchOrders gọi setState đồng bộ trong effect (dòng 131-135)
- [x] Bỏ `setLoadingOrders(true)` và `setOrdersError(null)` khỏi `fetchOrders`
- [x] Đổi `loadingOrders` init từ `false` → `true`
- [x] Thêm handler `handleTabChange` để fetch khi chuyển tab (event handler)
- [x] Thay effect fetch theo tab bằng effect mount đơn giản (setState trong promise callbacks)
- [x] Thay tất cả `setActiveTab(...)` bằng `handleTabChange(...)` (5 chỗ)

## Kiểm tra
- [x] Chạy `npx eslint src/pages/userProfile.jsx` xác nhận không còn lỗi
