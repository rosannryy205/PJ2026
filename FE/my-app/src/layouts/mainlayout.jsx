import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SideBar from "../components/Sidebar";

export default function MainLayout() {
  return (
    <>
      <Header />

      <div className="flex flex-1">
        <aside className="w-64 bg-gray-100 p-4 border-none">
            <SideBar />
        </aside>
        <main style={{ minHeight: "80vh" }}>
          <Outlet />
        </main>
      </div>

      <Footer />
    </>
  );
}
