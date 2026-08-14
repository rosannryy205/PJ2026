
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ShoppingBagIcon,
  UsersIcon,
  InboxStackIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: HomeIcon },
    { name: "Products", path: "/admin/products", icon: ShoppingBagIcon },
    { name: "Orders", path: "/admin/orders", icon: InboxStackIcon },
    { name: "Users", path: "/admin/users", icon: UsersIcon },
    { name: "Settings", path: "/admin/settings", icon: Cog6ToothIcon },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#000000] bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 transform bg-[#f5f5f7] border-r border-[#e0e0e0] transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:shrink-0 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-center border-b border-[#e0e0e0] px-6">
          <span
            className="text-[21px] font-semibold text-[#1d1d1f]"
            style={{
              fontFamily: "SF Pro Display, system-ui, sans-serif",
              letterSpacing: "0.231px",
            }}
          >
            Admin Panel
          </span>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-6 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`group flex items-center rounded-lg px-3 py-2 text-[14px] font-medium transition-colors ${
                  isActive
                    ? "bg-[#0066cc] text-white"
                    : "text-[#1d1d1f] hover:bg-[#e0e0e0] hover:text-[#1d1d1f]"
                }`}
                style={{
                  fontFamily: "SF Pro Text, system-ui, sans-serif",
                  letterSpacing: "-0.224px",
                }}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 shrink-0 ${
                    isActive ? "text-white" : "text-[#7a7a7a] group-hover:text-[#1d1d1f]"
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-[#e0e0e0] p-4">
          <button
            className="group flex w-full items-center rounded-lg px-3 py-2 text-[14px] font-medium text-[#1d1d1f] transition-colors hover:bg-[#e0e0e0]"
            style={{
              fontFamily: "SF Pro Text, system-ui, sans-serif",
              letterSpacing: "-0.224px",
            }}
          >
            <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5 text-[#7a7a7a] group-hover:text-[#1d1d1f]" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
