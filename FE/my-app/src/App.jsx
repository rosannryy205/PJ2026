import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthModalProvider } from "./contexts/authModalContext";
import { AuthProvider } from "./contexts/authContext";
import MainLayout from "./layouts/mainLayout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Product_detail from "./pages/productDetail";
import Cart from "./pages/Cart";
import Check_out from "./pages/CheckOut";
import User_profile from "./pages/userProfile";
import OrderSuccess from "./pages/orderSuccess";

function App() {
  return (
    <AuthModalProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="contact" element={<Contact />} />
              <Route path="product_detail" element={<Product_detail />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Check_out />} />
              <Route path="user_profile" element={<User_profile />} />
              <Route path="order-success" element={<OrderSuccess />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </AuthModalProvider>
  );
}

export default App;
