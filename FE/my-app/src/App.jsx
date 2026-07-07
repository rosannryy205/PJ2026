import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthModalProvider } from "./contexts/AuthModalContext";
import MainLayout from "./layouts/mainlayout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Product_detail from "./pages/Product_detail";
import Cart from "./pages/Cart";
import Check_out from "./pages/Check_out";
import User_profile from "./pages/User_profile";

function App(){
    return(
        <AuthModalProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route path="products" element={<Products />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="product_detail" element={<Product_detail />} />
                        <Route path="cart" element={<Cart />} />
                        <Route path="check_out" element={<Check_out />} />
                        <Route path="user_profile" element={<User_profile />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthModalProvider>
    );
}

export default App;