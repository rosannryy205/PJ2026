# TODO: Chỉnh sửa chức năng login theo role

## Mục tiêu

- Login xong, user có role `admin` hoặc `staff` được chuyển sang giao diện dashboard.
- Chặn user không phải admin/staff hoặc chưa đăng nhập truy cập route `/admin`.

## Các bước

- [x] 1. Sửa `FE/my-app/src/auth/login.jsx`: điều hướng theo role sau khi login
- [x] 2. Sửa `FE/my-app/src/App.jsx`: thêm guard `RequireAdmin` bảo vệ route `/admin`
- [x] 3. Kiểm tra & chạy thử luồng login admin/staff/customer
