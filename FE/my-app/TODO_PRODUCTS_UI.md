# TODO_PRODUCTS_UI.md

## Step 1: Render Products theo slug category + brand (FE)
- [ ] Sửa `FE/my-app/src/pages/Products.jsx`:
  - [ ] Lấy `cat` và `brand` từ URL query params
  - [ ] Gọi API BE đúng tên query: `category` và `brand`
  - [ ] Xóa các phần filter/UI/comment không còn liên quan
  - [ ] Comment giải thích dễ hiểu cho logic chính

## Step 2: Verify UI
- [ ] Chạy FE, thử bấm vào dropdown menu:
  - [ ] URL dạng: `/products?cat=<catSlug>`
  - [ ] URL dạng: `/products?brand=<brandSlug>&cat=<catSlug>`
  - [ ] Sản phẩm hiển thị đúng nhóm
