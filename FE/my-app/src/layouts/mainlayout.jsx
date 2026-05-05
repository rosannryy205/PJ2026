import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <>
      <Header />

      <div className="flex flex-1">
        <main style={{ minHeight: "80vh" }}>
          <Outlet />
        </main>
      </div>

      <Footer />
    </>
  );
}
