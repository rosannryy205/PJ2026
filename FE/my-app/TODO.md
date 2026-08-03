# TODO — Tối ưu adminLayout + Route admin

## Các bước thực hiện

- [x] Đọc các file liên quan (`adminLayout.jsx`, `App.jsx`, `headerAdmin.jsx`, `footerAdmin.jsx`, `loading.jsx`, `mainLayout.jsx`)
- [x] Tạo placeholder page `pages/AdminDashboard.jsx`
- [x] Sửa `layouts/adminLayout.jsx`:
  - [x] Đổi tên export `MainLayout` → `AdminLayout`
  - [x] Import alias rõ ràng `HeaderAdmin` / `FooterAdmin`
  - [x] Bỏ `AuthModal` (admin không cần modal login khách hàng)
  - [x] Giữ nguyên hiệu ứng Loading đã xây dựng
- [x] Sửa `App.jsx`:
  - [x] Import `Navigate` + `AdminDashboard`
  - [x] Route `/admin` redirect → `/admin/dashboard`
  - [x] Route `/admin/dashboard` hiển thị placeholder
  - [x] Route `/admin/*` catch-all để mọi link admin không bị 404
- [x] Verify: chạy build/dev server không còn lỗi (npm run build ✓)
