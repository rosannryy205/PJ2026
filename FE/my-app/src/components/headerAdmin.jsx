import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

/* ═══════════════════════════════════════════════════════════════
   HẰNG SỐ & DỮ LIỆU
   ═══════════════════════════════════════════════════════════════ */
const SF_TEXT = "SF Pro Text, system-ui, -apple-system, sans-serif";
const SF_DISPLAY = "SF Pro Display, system-ui, -apple-system, sans-serif";

/**
 * Menu dashboard — phân cấp BẬC 2.
 * - item có `children`      => hiển thị dropdown (desktop) / accordion (mobile)
 * - item không có `children`=> link trực tiếp (VD: Dashboard)
 * Các href trỏ tới route admin sẽ được khai báo sau (chưa tồn tại trong App.jsx).
 */
const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: "grid",
  },
  {
    label: "Sản phẩm",
    icon: "box",
    children: [
      { label: "Tất cả sản phẩm", href: "/admin/products" },
      { label: "Danh mục", href: "/admin/products/categories" },
      { label: "Thương hiệu", href: "/admin/products/brands" },
      { label: "Tồn kho", href: "/admin/products/inventory" },
    ],
  },
  {
    label: "Đơn hàng",
    icon: "cart",
    children: [
      { label: "Tất cả đơn hàng", href: "/admin/orders" },
      { label: "Đang xử lý", href: "/admin/orders?status=processing" },
      { label: "Đang giao", href: "/admin/orders?status=shipping" },
      { label: "Đã hủy / Trả hàng", href: "/admin/orders?status=cancelled" },
    ],
  },
  {
    label: "Khách hàng",
    icon: "users",
    children: [
      { label: "Danh sách khách hàng", href: "/admin/customers" },
      { label: "Nhóm khách hàng", href: "/admin/customers/groups" },
    ],
  },
  {
    label: "Báo cáo",
    icon: "chart",
    children: [
      { label: "Doanh thu", href: "/admin/reports/revenue" },
      { label: "Tồn kho", href: "/admin/reports/inventory" },
      { label: "Khách hàng", href: "/admin/reports/customers" },
    ],
  },
  {
    label: "Cài đặt",
    icon: "cog",
    children: [
      { label: "Cài đặt chung", href: "/admin/settings/general" },
      { label: "Thanh toán", href: "/admin/settings/payments" },
      { label: "Vận chuyển", href: "/admin/settings/shipping" },
    ],
  },
];

/* Thông báo mẫu — sau này thay bằng dữ liệu thật từ API */
const NOTIFICATIONS = [
  {
    id: 1,
    title: "Đơn hàng mới #TS-1024",
    detail: "Khách vừa đặt hàng trị giá 25.900.000 ₫",
    time: "2 phút trước",
    unread: true,
  },
  {
    id: 2,
    title: "Tồn kho sắp hết",
    detail: "iPhone 17 Pro 256GB còn 3 chiếc",
    time: "1 giờ trước",
    unread: true,
  },
  {
    id: 3,
    title: "Khách hàng mới đăng ký",
    detail: "nguyen***@gmail.com vừa tạo tài khoản",
    time: "3 giờ trước",
    unread: false,
  },
];

/* ═══════════════════════════════════════════════════════════════
   SVG ICONS
   ═══════════════════════════════════════════════════════════════ */
function IconBase({ size = 16, strokeWidth = 2, className = "", children }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/* Map tên icon -> SVG path (dùng cho menu) */
const ICON_PATHS = {
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </>
  ),
  box: (
    <>
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </>
  ),
  cart: (
    <>
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </>
  ),
  cog: (
    <>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </>
  ),
  bell: (
    <>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </>
  ),
  chevronDown: <polyline points="6 9 12 15 18 9" />,
  chevronRight: <polyline points="9 18 15 12 9 6" />,
  menu: (
    <>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </>
  ),
  close: (
    <>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </>
  ),
  home: (
    <>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </>
  ),
  user: (
    <>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  logout: (
    <>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </>
  ),
  plus: (
    <>
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </>
  ),
};

function NavIcon({ name, size = 16, className = "" }) {
  return (
    <IconBase size={size} className={className}>
      {ICON_PATHS[name]}
    </IconBase>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HOOK: click bên ngoài để đóng dropdown
   ═══════════════════════════════════════════════════════════════ */
function useClickOutside(onOutside) {
  const ref = useRef(null);
  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) onOutside();
    }
    document.addEventListener("mousedown", handle);
    document.addEventListener("touchstart", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
      document.removeEventListener("touchstart", handle);
    };
  }, [onOutside]);
  return ref;
}

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENT: DESKTOP DROPDOWN (menu cấp 2)
   ═══════════════════════════════════════════════════════════════ */
function DesktopDropdown({ children = [] }) {
  if (!children.length) return null;
  return (
    <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out z-50">
      <div className="w-[232px] rounded-[12px] bg-white border border-[#e0e0e0] py-2 shadow-[0_16px_40px_rgba(0,0,0,0.10)]">
        {children.map((child) => (
          <Link
            key={child.href + child.label}
            to={child.href}
            className="flex items-center gap-2.5 px-4 py-[9px] text-[14px] font-normal tracking-[-0.224px] leading-[1.29] text-[#333333] hover:text-[#0066cc] hover:bg-[#f5f5f7] transition-colors no-underline"
            style={{ fontFamily: SF_TEXT }}
          >
            <span className="w-1 h-1 rounded-full bg-[#d2d2d7] group-hover:bg-[#0066cc] shrink-0" />
            {child.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENT: MOBILE ACCORDION (menu cấp 2)
   ═══════════════════════════════════════════════════════════════ */
function MobileAccordion({ item, active, onNavigate }) {
  const [open, setOpen] = useState(active);

  // Tự mở nếu item đang active (khi drawer vừa mở)
  useEffect(() => {
    if (active) setOpen(true);
  }, [active]);

  // Item không có children => link trực tiếp
  if (!item.children) {
    return (
      <Link
        to={item.href}
        onClick={onNavigate}
        className={`flex items-center gap-3 px-4 py-[11px] text-[15px] font-normal tracking-[-0.224px] rounded-[8px] no-underline transition-colors ${
          active
            ? "bg-[#0066cc]/10 text-[#0066cc] font-semibold"
            : "text-[#d2d2d7] hover:text-white hover:bg-[#2a2a2c]"
        }`}
        style={{ fontFamily: SF_TEXT }}
      >
        <NavIcon name={item.icon} size={17} className="shrink-0" />
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      {/* Level 1 */}
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className={`flex w-full items-center justify-between gap-3 px-4 py-[11px] text-[15px] font-normal tracking-[-0.224px] rounded-[8px] transition-colors bg-transparent border-none outline-none cursor-pointer ${
          active
            ? "bg-[#0066cc]/10 text-[#0066cc] font-semibold"
            : "text-[#d2d2d7] hover:text-white hover:bg-[#2a2a2c]"
        }`}
        style={{ fontFamily: SF_TEXT }}
      >
        <span className="flex items-center gap-3">
          <NavIcon name={item.icon} size={17} className="shrink-0" />
          {item.label}
        </span>
        <IconBase
          size={14}
          className={`transition-transform duration-200 shrink-0 ${
            open ? "rotate-180" : ""
          }`}
        >
          {ICON_PATHS.chevronDown}
        </IconBase>
      </button>

      {/* Level 2 */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="ml-[34px] pl-4 border-l border-[#333336] py-1 mb-1 flex flex-col gap-[2px]">
          {item.children.map((child) => (
            <Link
              key={child.href + child.label}
              to={child.href}
              onClick={onNavigate}
              className={`px-3 py-[8px] text-[13px] font-normal tracking-[-0.12px] rounded-[8px] no-underline transition-colors ${
                item.activeHref === child.href
                  ? "text-white bg-[#2a2a2c]"
                  : "text-[#86868b] hover:text-white hover:bg-[#2a2a2c]"
              }`}
              style={{ fontFamily: SF_TEXT }}
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HEADER ADMIN
   ═══════════════════════════════════════════════════════════════ */
export default function HeaderAdmin() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const userMenuRef = useClickOutside(() => setUserMenuOpen(false));
  const notifRef = useClickOutside(() => setNotifOpen(false));

  const pathname = location.pathname;

  /* Trạng thái active cho từng nav item */
  const navState = NAV_ITEMS.map((item) => {
    if (item.href) {
      return { item, active: pathname.startsWith(item.href) };
    }
    const activeChild = item.children.find((c) => pathname.startsWith(c.href));
    return {
      item,
      active: !!activeChild,
      activeHref: activeChild?.href,
    };
  });

  /* Hiệu ứng khi scroll: thêm hairline nhẹ dưới top bar */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Khóa body scroll khi drawer mở */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  const initials = (user?.name || "A")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const firstName = (user?.name || "Admin").split(" ")[0];

  return (
    <>
      <header
        id="admin-header"
        className="sticky top-0 z-50"
        style={{ fontFamily: SF_TEXT }}
      >
        {/* ═══════════════════════════════════════════
            TOP BAR — dark, admin chrome
        ═══════════════════════════════════════════ */}
        <nav
          className={`bg-[#1d1d1f] h-[56px] flex items-center transition-shadow duration-200 ${
            scrolled ? "shadow-[0_1px_0_rgba(255,255,255,0.08)]" : ""
          }`}
        >
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-3">
            {/* ── Left: hamburger + logo ── */}
            <div className="flex items-center gap-2 min-w-0">
              {/* Hamburger — mobile / tablet */}
              <button
                id="admin-mobile-toggle"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden inline-flex items-center justify-center w-[40px] h-[40px] rounded-[8px] text-[#d2d2d7] hover:text-white hover:bg-[#2a2a2c] transition-colors bg-transparent border-none outline-none cursor-pointer shrink-0"
                aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
              >
                <IconBase size={18}>
                  {ICON_PATHS[mobileOpen ? "close" : "menu"]}
                </IconBase>
              </button>

              {/* Logo / brand */}
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-[8px] no-underline shrink-0"
                aria-label="TechStore Admin"
              >
                <span className="inline-flex items-center justify-center w-[26px] h-[26px] rounded-[7px] bg-[#0066cc]">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M13 3L4 14h7l-2 7 9-11h-7l2-7z"
                      fill="white"
                      stroke="white"
                      strokeWidth="1"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="hidden sm:flex items-center gap-2 leading-none">
                  <span className="text-white text-[13px] font-semibold tracking-[0.3px] uppercase">
                    TechStore
                  </span>
                  <span className="inline-block rounded-full bg-[#0066cc] text-white text-[10px] font-semibold tracking-[0.2px] px-[7px] py-[3px] leading-none">
                    ADMIN
                  </span>
                </span>
              </Link>
            </div>

            {/* ── Center: search (desktop) ── */}
            <div className="hidden md:block flex-1 max-w-[380px] mx-auto">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b] flex pointer-events-none">
                  <NavIcon name="search" size={15} />
                </span>
                <input
                  type="text"
                  placeholder="Tìm kiếm đơn hàng, khách hàng, sản phẩm..."
                  className="w-full rounded-full bg-[#333336] text-white text-[13px] font-normal tracking-[-0.12px] leading-none py-[10px] pl-9 pr-4 border border-transparent placeholder:text-[#86868b] focus:bg-[#1d1d1f] focus:border-[#0066cc] focus:outline-none transition-all"
                  style={{ fontFamily: SF_TEXT }}
                />
              </div>
            </div>

            {/* ── Right: notification + user ── */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Notifications */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => {
                    setNotifOpen(!notifOpen);
                    setUserMenuOpen(false);
                  }}
                  className="relative inline-flex items-center justify-center w-[40px] h-[40px] rounded-[8px] text-[#d2d2d7] hover:text-white hover:bg-[#2a2a2c] transition-colors bg-transparent border-none outline-none cursor-pointer"
                  aria-label="Thông báo"
                  aria-expanded={notifOpen}
                >
                  <NavIcon name="bell" size={18} />
                  <span className="absolute top-[7px] right-[8px] min-w-[14px] h-[14px] px-[3px] rounded-full bg-[#e30000] text-white text-[9px] font-semibold flex items-center justify-center leading-none">
                    2
                  </span>
                </button>

                {/* Notification dropdown */}
                {notifOpen && (
                  <div className="absolute right-0 top-full pt-2 z-50 w-[320px] max-w-[calc(100vw-32px)]">
                    <div className="rounded-[12px] bg-white border border-[#e0e0e0] shadow-[0_16px_40px_rgba(0,0,0,0.10)] overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-3 border-b border-[#f0f0f0]">
                        <span className="text-[14px] font-semibold tracking-[-0.224px] text-[#1d1d1f]">
                          Thông báo
                        </span>
                        <span className="text-[12px] text-[#0066cc] cursor-pointer">
                          Đánh dấu đã đọc
                        </span>
                      </div>
                      <div className="max-h-[320px] overflow-y-auto">
                        {NOTIFICATIONS.map((n) => (
                          <div
                            key={n.id}
                            className={`flex gap-3 px-4 py-3 border-b border-[#f0f0f0] last:border-b-0 cursor-pointer transition-colors hover:bg-[#f5f5f7] ${
                              n.unread ? "bg-[#e8f4ff]/40" : ""
                            }`}
                          >
                            <span
                              className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
                                n.unread ? "bg-[#0066cc]" : "bg-[#d2d2d7]"
                              }`}
                            />
                            <div className="min-w-0">
                              <p className="text-[13px] font-semibold tracking-[-0.12px] text-[#1d1d1f] truncate">
                                {n.title}
                              </p>
                              <p className="text-[12px] font-normal tracking-[-0.12px] text-[#7a7a7a] leading-[1.3] mt-0.5 line-clamp-2">
                                {n.detail}
                              </p>
                              <p className="text-[11px] font-normal text-[#b0b0b0] mt-1">
                                {n.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="px-4 py-3 text-center border-t border-[#f0f0f0]">
                        <span className="text-[12px] text-[#0066cc] cursor-pointer">
                          Xem tất cả thông báo
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Divider */}
              <span className="hidden sm:block w-px h-[24px] bg-[#333336] mx-1" />

              {/* User menu */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => {
                    setUserMenuOpen(!userMenuOpen);
                    setNotifOpen(false);
                  }}
                  className="flex items-center gap-2.5 py-1 pl-1 pr-2 rounded-[8px] hover:bg-[#2a2a2c] transition-colors bg-transparent border-none outline-none cursor-pointer"
                  aria-expanded={userMenuOpen}
                  aria-label="Menu tài khoản"
                >
                  <span className="inline-flex items-center justify-center w-[30px] h-[30px] rounded-full bg-[#0066cc] text-white text-[12px] font-semibold leading-none shrink-0">
                    {initials}
                  </span>
                  <span className="hidden lg:flex flex-col items-start leading-none">
                    <span className="text-white text-[13px] font-medium tracking-[-0.12px]">
                      {firstName}
                    </span>
                    <span className="text-[#86868b] text-[11px] tracking-[-0.12px] mt-1">
                      Quản trị viên
                    </span>
                  </span>
                  <IconBase
                    size={14}
                    className={`text-[#86868b] transition-transform duration-200 ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                  >
                    {ICON_PATHS.chevronDown}
                  </IconBase>
                </button>

                {/* User dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 top-full pt-2 z-50 w-[240px]">
                    <div className="rounded-[12px] bg-white border border-[#e0e0e0] shadow-[0_16px_40px_rgba(0,0,0,0.10)] overflow-hidden">
                      {/* User summary */}
                      <div className="px-4 py-3.5 border-b border-[#f0f0f0] flex items-center gap-3">
                        <span className="inline-flex items-center justify-center w-[36px] h-[36px] rounded-full bg-[#0066cc] text-white text-[13px] font-semibold leading-none shrink-0">
                          {initials}
                        </span>
                        <div className="min-w-0">
                          <p className="text-[14px] font-semibold tracking-[-0.224px] text-[#1d1d1f] truncate">
                            {user?.name || "Admin"}
                          </p>
                          <p className="text-[12px] text-[#7a7a7a] truncate">
                            {user?.email || "admin@techstore.vn"}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="py-1.5">
                        <Link
                          to="/"
                          className="flex items-center gap-3 px-4 py-[9px] text-[14px] font-normal tracking-[-0.224px] text-[#333333] hover:text-[#0066cc] hover:bg-[#f5f5f7] transition-colors no-underline"
                        >
                          <NavIcon name="home" size={16} className="shrink-0" />
                          Về trang chủ
                        </Link>
                        <Link
                          to="/user_profile"
                          className="flex items-center gap-3 px-4 py-[9px] text-[14px] font-normal tracking-[-0.224px] text-[#333333] hover:text-[#0066cc] hover:bg-[#f5f5f7] transition-colors no-underline"
                        >
                          <NavIcon name="user" size={16} className="shrink-0" />
                          Tài khoản
                        </Link>
                      </div>

                      <div className="border-t border-[#f0f0f0] py-1.5">
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 px-4 py-[9px] text-[14px] font-normal tracking-[-0.224px] text-[#e30000] hover:bg-[#fff0f0] transition-colors bg-transparent border-none outline-none cursor-pointer text-left"
                          style={{ fontFamily: SF_TEXT }}
                        >
                          <NavIcon
                            name="logout"
                            size={16}
                            className="shrink-0"
                          />
                          Đăng xuất
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* ═══════════════════════════════════════════
            SUB-NAV — frosted parchment, menu bậc 2
            Chỉ hiển thị desktop (≥ lg / 1024px)
        ═══════════════════════════════════════════ */}
        <div
          id="admin-subnav"
          className="hidden lg:block h-[50px] border-b border-[#e0e0e0] relative"
          style={{
            backgroundColor: "rgba(245, 245, 247, 0.80)",
            backdropFilter: "saturate(180%) blur(20px)",
            WebkitBackdropFilter: "saturate(180%) blur(20px)",
          }}
        >
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-full flex items-center justify-between gap-6">
            {/* Left: menu chính */}
            <nav
              className="flex items-center h-full gap-1"
              aria-label="Menu quản trị"
            >
              {navState.map(({ item, active, activeHref }) => (
                <div
                  key={item.label}
                  className="relative group h-full flex items-center"
                >
                  {item.children ? (
                    <>
                      <button
                        className={`flex items-center gap-1.5 h-full px-3 text-[13px] font-normal tracking-[-0.12px] leading-none transition-colors bg-transparent border-none outline-none cursor-pointer ${
                          active
                            ? "text-[#0066cc] font-semibold"
                            : "text-[#333333] hover:text-[#1d1d1f]"
                        }`}
                        aria-haspopup="true"
                      >
                        <NavIcon
                          name={item.icon}
                          size={15}
                          className="shrink-0"
                        />
                        {item.label}
                        <IconBase
                          size={12}
                          className={`transition-transform duration-200 shrink-0 ${
                            active ? "rotate-180" : ""
                          }`}
                        >
                          {ICON_PATHS.chevronDown}
                        </IconBase>
                      </button>
                      <DesktopDropdown children={item.children} />
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className={`relative flex items-center gap-1.5 h-full px-3 text-[13px] font-normal tracking-[-0.12px] leading-none no-underline transition-colors ${
                        active
                          ? "text-[#0066cc] font-semibold"
                          : "text-[#333333] hover:text-[#1d1d1f]"
                      }`}
                    >
                      <NavIcon
                        name={item.icon}
                        size={15}
                        className="shrink-0"
                      />
                      {item.label}
                      {/* Active underline indicator */}
                      {active && (
                        <span className="absolute inset-x-3 bottom-0 h-[2px] rounded-full bg-[#0066cc]" />
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Right: quick action */}
            <Link
              to="/admin/products/create"
              className="inline-flex items-center gap-1.5 shrink-0 rounded-full bg-[#0066cc] text-white text-[13px] font-normal tracking-[-0.12px] leading-none px-[16px] py-[9px] hover:bg-[#0071e3] active:scale-95 transition-all no-underline"
            >
              <NavIcon name="plus" size={13} />
              Tạo mới
            </Link>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            MOBILE DRAWER — menu bậc 2 dạng accordion
            Hiển thị khi < lg (1024px)
        ═══════════════════════════════════════════ */}
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
            mobileOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={closeMobile}
        />

        {/* Drawer panel */}
        <div
          id="admin-mobile-drawer"
          className={`fixed top-0 left-0 h-full w-[300px] max-w-[85vw] bg-[#1d1d1f] z-50 lg:hidden transition-transform duration-300 ease-out overflow-y-auto ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-[#333336]">
            <Link
              to="/admin/dashboard"
              onClick={closeMobile}
              className="flex items-center gap-2 no-underline"
            >
              <span className="inline-flex items-center justify-center w-[24px] h-[24px] rounded-[6px] bg-[#0066cc]">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M13 3L4 14h7l-2 7 9-11h-7l2-7z"
                    fill="white"
                    stroke="white"
                    strokeWidth="1"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-white text-[13px] font-semibold tracking-[0.3px] uppercase">
                TechStore <span className="text-[#2997ff]">Admin</span>
              </span>
            </Link>
            <button
              onClick={closeMobile}
              className="inline-flex items-center justify-center w-[36px] h-[36px] rounded-[8px] text-[#86868b] hover:text-white hover:bg-[#2a2a2c] transition-colors bg-transparent border-none outline-none cursor-pointer"
              aria-label="Đóng menu"
            >
              <IconBase size={18}>{ICON_PATHS.close}</IconBase>
            </button>
          </div>

          {/* User summary */}
          <div className="px-4 py-4 border-b border-[#333336]">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#0066cc] text-white text-[14px] font-semibold leading-none shrink-0">
                {initials}
              </span>
              <div className="min-w-0">
                <p className="text-white text-[15px] font-semibold tracking-[-0.224px] truncate">
                  {user?.name || "Admin"}
                </p>
                <p className="text-[#86868b] text-[12px] truncate">
                  {user?.email || "admin@techstore.vn"}
                </p>
              </div>
            </div>
          </div>

          {/* Nav accordion (level 2) */}
          <div className="px-3 py-3 flex flex-col gap-1">
            {navState.map(({ item, active, activeHref }) => (
              <MobileAccordion
                key={item.label}
                item={{ ...item, activeHref }}
                active={active}
                onNavigate={closeMobile}
              />
            ))}
          </div>

          {/* Footer actions */}
          <div className="mt-auto px-4 py-4 border-t border-[#333336] flex flex-col gap-1">
            <Link
              to="/"
              onClick={closeMobile}
              className="flex items-center gap-3 px-3 py-[10px] text-[14px] text-[#d2d2d7] hover:text-white hover:bg-[#2a2a2c] rounded-[8px] transition-colors no-underline"
            >
              <NavIcon name="home" size={16} className="shrink-0" />
              Về trang chủ
            </Link>
            <button
              onClick={async () => {
                closeMobile();
                await handleLogout();
              }}
              className="flex items-center gap-3 px-3 py-[10px] text-[14px] text-[#e30000] hover:bg-[#fff0f0] hover:text-[#e30000] rounded-[8px] transition-colors bg-transparent border-none outline-none cursor-pointer text-left"
              style={{ fontFamily: SF_TEXT }}
            >
              <NavIcon name="logout" size={16} className="shrink-0" />
              Đăng xuất
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
