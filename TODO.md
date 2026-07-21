# TODO

## Mục tiêu: Sửa lỗi click 1 lần => cart quantity tăng lên 2

- [x] Đọc `BE/src/services/cartService.js` để xác nhận logic cộng quantity (findOrCreate + cộng quantity khi item tồn tại)
- [x] Đọc `FE/my-app/src/pages/ProductDetail.jsx` để kiểm tra logic gọi API add-to-cart
- [x] Đọc `FE/my-app/src/pages/Cart.jsx` để xác nhận render quantity lấy trực tiếp từ BE
- [x] Đọc `BE/src/routers/cartRouter.js` và `BE/src/middleware/requireAuth.js` để xác nhận route/middleware
- [x] Cập nhật `FE/my-app/src/pages/ProductDetail.jsx`: thay chặn double-submit từ `useState` sang `useRef`, đảm bảo 1 click chỉ gửi 1 request

- [ ] (sau fix) kiểm tra lại flow UI: bấm 1 lần vào “Thêm vào giỏ”, vào `/cart` và confirm quantity = 1
