import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/mainlayout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Login from "./auth/login";
import Register from "./auth/register";
import Product_detail from "./pages/Product_detail";
import Cart from "./pages/Cart";
import Check_out from "./pages/Check_out";

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="products" element={<Products />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="product_detail" element={<Product_detail />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="check_out" element={<Check_out />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;