import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AuthModal from "../components/AuthModal";

export default function MainLayout() {
  return (
    <>
      <Header />

      <div>
        <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <Outlet />
        </main>
      </div>

      <Footer />

      {/* Auth modal overlay — renders on top of everything */}
      <AuthModal />
    </>
  );
}
