# TODO - Auth Login/Logout (JWT in httpOnly cookie)

## BE (Backend)
- [ ] Thêm route module `/api/auth` : `login`, `logout`, `me`
- [ ] Implement `POST /api/auth/login` : validate user -> sign JWT -> set `httpOnly` cookie
- [ ] Implement `POST /api/auth/logout` : clear cookie
- [ ] Implement `GET /api/auth/me` : middleware `requireAuth` -> return user
- [ ] Thêm middleware `requireAuth` verify JWT từ cookie

## FE (Frontend)
- [ ] Tạo `AuthContext` với `isAuthenticated`, `user`, `loading`, `refreshMe()`, `logout()`
- [ ] Bọc `AuthProvider` trong `App.jsx`
- [ ] Sửa `Login.jsx`: POST `/api/auth/login` với `credentials:'include'`, đóng modal, `refreshMe()`, `navigate('/')`
- [ ] Sửa `Header.jsx`: nếu logged in -> icon + tên user -> link `/user_profile`
- [ ] Sửa `User_profile.jsx`: bỏ hardcode, render từ `user` từ context (`me`)

## Test (dừng khi pass)
- [ ] Login thành công: navigate `/` và Header hiển thị tên
- [ ] Click icon -> `/user_profile` và render name/email từ `me`
- [ ] Refresh trang vẫn giữ login (AuthContext gọi `me`)

