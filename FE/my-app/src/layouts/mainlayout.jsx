import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!isAuthPage && <Header />}

      <div>
        <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <Outlet />
        </main>
      </div>

      {!isAuthPage && <Footer />}
    </>
  );
}
