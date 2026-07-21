import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthModalProvider } from "./contexts/AuthModalContext";
import { AuthProvider } from "./contexts/AuthContext";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Product_detail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Check_out from "./pages/CheckOut";
import User_profile from "./pages/UserProfile";

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
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </AuthModalProvider>
  );
}

export default App;

