import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

/* ─── NAV DATA with Level-2 submenus ─── */
const navItems = [
  {
    label: "Mac",
    href: "/products?cat=mac",
    children: [
      { label: "MacBook Air", href: "/products?item=macbook-air" },
      { label: "MacBook Pro", href: "/products?item=macbook-pro" },
      { label: "iMac", href: "/products?item=imac" },
      { label: "Mac Mini", href: "/products?item=mac-mini" },
      { label: "Mac Studio", href: "/products?item=mac-studio" },
      { label: "Mac Pro", href: "/products?item=mac-pro" },
      { label: "So sánh", href: "/products?compare=mac" },
    ],
  },
  {
    label: "iPhone",
    href: "/products?cat=iphone",
    children: [
      { label: "iPhone 17 Pro", href: "/products?item=iphone-17-pro" },
      { label: "iPhone 17", href: "/products?item=iphone-17" },
      { label: "iPhone 16", href: "/products?item=iphone-16" },
      { label: "iPhone SE", href: "/products?item=iphone-se" },
      { label: "So sánh", href: "/products?compare=iphone" },
    ],
  },
  {
    label: "iPad",
    href: "/products?cat=ipad",
    children: [
      { label: "iPad Pro", href: "/products?item=ipad-pro" },
      { label: "iPad Air", href: "/products?item=ipad-air" },
      { label: "iPad", href: "/products?item=ipad" },
      { label: "iPad Mini", href: "/products?item=ipad-mini" },
      { label: "So sánh", href: "/products?compare=ipad" },
    ],
  },
  {
    label: "Watch",
    href: "/products?cat=watch",
    children: [
      { label: "Apple Watch Ultra 2", href: "/products?item=watch-ultra" },
      { label: "Apple Watch Series 10", href: "/products?item=watch-s10" },
      { label: "Apple Watch SE", href: "/products?item=watch-se" },
      { label: "Dây đeo", href: "/products?item=watch-bands" },
    ],
  },
  {
    label: "AirPods",
    href: "/products?cat=airpods",
    children: [
      { label: "AirPods Pro 2", href: "/products?item=airpods-pro" },
      { label: "AirPods 4", href: "/products?item=airpods-4" },
      { label: "AirPods Max", href: "/products?item=airpods-max" },
      { label: "So sánh", href: "/products?compare=airpods" },
    ],
  },
  {
    label: "Phụ kiện",
    href: "/products?cat=accessories",
    children: [
      { label: "Ốp lưng", href: "/products?item=cases" },
      { label: "Sạc & Cáp", href: "/products?item=chargers" },
      { label: "Bàn phím & Chuột", href: "/products?item=keyboards" },
      { label: "Màn hình", href: "/products?item=displays" },
    ],
  },
  { label: "Khuyến mãi", href: "/products?sale=true" },
];

/* ─── SVG Icons ─── */
function SearchIcon({ className = "" }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function BagIcon({ className = "" }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function UserIcon({ className = "" }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ChevronDown({ className = "" }) {
  return (
    <svg
      className={className}
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/* ─── SEARCH OVERLAY ─── */
function SearchOverlay({ open, onClose }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[60] transition-all duration-300 ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* search bar */}
      <div
        className={`relative z-10 bg-[#1d1d1f] transition-transform duration-300 ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto max-w-[980px] px-6 py-5">
          <div className="flex items-center gap-3">
            <SearchIcon className="text-[#86868b] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full bg-transparent text-white text-[17px] font-light tracking-[-0.374px] leading-[1.47] placeholder:text-[#86868b] outline-none border-none"
              style={{
                fontFamily:
                  "SF Pro Text, system-ui, -apple-system, sans-serif",
              }}
            />
            <button
              onClick={onClose}
              className="text-[#86868b] hover:text-white transition-colors cursor-pointer"
              aria-label="Đóng tìm kiếm"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Quick Links */}
          <div className="mt-5 border-t border-[#333336] pt-4">
            <p
              className="text-[#86868b] text-[12px] font-normal tracking-[-0.12px] mb-3"
              style={{
                fontFamily:
                  "SF Pro Text, system-ui, -apple-system, sans-serif",
              }}
            >
              Tìm kiếm nhanh
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "iPhone 17 Pro",
                "MacBook Air M4",
                "iPad Pro",
                "Apple Watch",
                "AirPods Pro",
              ].map((term) => (
                <Link
                  key={term}
                  to={`/products?q=${encodeURIComponent(term)}`}
                  onClick={onClose}
                  className="inline-block rounded-full bg-[#333336] px-[14px] py-[7px] text-[12px] text-[#d2d2d7] hover:bg-[#424245] transition-colors no-underline"
                  style={{
                    fontFamily:
                      "SF Pro Text, system-ui, -apple-system, sans-serif",
                  }}
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── DESKTOP DROPDOWN (Level 2) ─── */
function DesktopDropdown({ children, align = "center" }) {
  const alignClass =
    align === "center"
      ? "left-1/2 -translate-x-1/2"
      : "left-0";

  return (
    <div
      className={`absolute top-full pt-2 ${alignClass} opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out z-50`}
    >
      <div
        className="bg-[#1d1d1f] rounded-[12px] py-2 min-w-[200px] shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
      >
        {children.map((child) => (
          <Link
            key={child.href}
            to={child.href}
            className="block px-5 py-[9px] text-[12px] font-normal tracking-[-0.12px] text-[#d2d2d7] hover:text-white hover:bg-[#2a2a2c] transition-colors no-underline whitespace-nowrap"
            style={{
              fontFamily:
                "SF Pro Text, system-ui, -apple-system, sans-serif",
            }}
          >
            {child.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ─── MOBILE ACCORDION ITEM ─── */
function MobileAccordion({ item, onNavigate }) {
  const [open, setOpen] = useState(false);

  if (!item.children) {
    return (
      <Link
        to={item.href}
        onClick={onNavigate}
        className="block py-[10px] text-[17px] font-normal tracking-[-0.374px] text-white/90 hover:text-white transition-colors no-underline border-b border-[#333336]"
        style={{
          fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif",
        }}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-[#333336]">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-[10px] text-[17px] font-normal tracking-[-0.374px] text-white/90 hover:text-white transition-colors cursor-pointer bg-transparent border-none outline-none"
        style={{
          fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif",
        }}
      >
        {item.label}
        <ChevronDown
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pl-4 pb-2">
          {item.children.map((child) => (
            <Link
              key={child.href}
              to={child.href}
              onClick={onNavigate}
              className="block py-[8px] text-[14px] font-normal tracking-[-0.224px] text-[#86868b] hover:text-white transition-colors no-underline"
              style={{
                fontFamily:
                  "SF Pro Text, system-ui, -apple-system, sans-serif",
              }}
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN HEADER ─── */
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* Track scroll for subtle shadow on sticky nav */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header
        id="global-header"
        className="sticky top-0 z-50"
        style={{
          fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif",
        }}
      >
        {/* ─── TOP PROMO BAR ─── */}
        <div
          className="bg-[#0066cc] text-white text-center py-[6px] text-[12px] font-normal tracking-[-0.12px] leading-none hidden sm:block"
        >
          Miễn phí giao hàng cho đơn từ 500.000₫&nbsp;&nbsp;|&nbsp;&nbsp;Trả
          góp 0% lãi suất
        </div>

        {/* ═══════════════════════════════════════════
            GLOBAL NAV — Pure black, 44px
        ═══════════════════════════════════════════ */}
        <nav
          id="global-nav"
          className={`bg-black h-[44px] flex items-center transition-shadow duration-200 ${
            scrolled ? "shadow-[0_1px_0_rgba(255,255,255,0.08)]" : ""
          }`}
        >
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
            {/* ── Logo ── */}
            <Link
              to="/"
              className="flex items-center gap-[6px] text-white no-underline shrink-0"
              aria-label="Trang chủ TechStore"
            >
              {/* Stylized logo mark */}
              <span className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-[5px] bg-[#0066cc]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M13 3L4 14h7l-2 7 9-11h-7l2-7z"
                    fill="white"
                    stroke="white"
                    strokeWidth="1"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span
                className="text-[12px] font-semibold tracking-[0.5px] uppercase leading-none hidden sm:inline"
              >
                TechStore
              </span>
            </Link>

            {/* ── Desktop Nav Links ── */}
            <div className="hidden lg:flex items-center gap-[20px]">
              {navItems.map((item) => (
                <div key={item.label} className="relative group">
                  <Link
                    to={item.href}
                    className="text-[12px] font-normal tracking-[-0.12px] leading-none text-[#d2d2d7] hover:text-white transition-colors no-underline py-[14px] inline-block"
                  >
                    {item.label}
                  </Link>

                  {/* Level-2 dropdown */}
                  {item.children && (
                    <DesktopDropdown children={item.children} />
                  )}
                </div>
              ))}
            </div>

            {/* ── Right Actions ── */}
            <div className="flex items-center gap-[12px]">
              {/* Search */}
              <button
                id="search-toggle"
                onClick={() => setSearchOpen(true)}
                className="text-[#d2d2d7] hover:text-white transition-colors cursor-pointer bg-transparent border-none outline-none p-1"
                aria-label="Tìm kiếm"
              >
                <SearchIcon />
              </button>

              {/* Bag */}
              <Link
                to="/cart"
                className="text-[#d2d2d7] hover:text-white transition-colors p-1 relative no-underline"
                aria-label="Giỏ hàng"
              >
                <BagIcon />
                <span className="absolute -top-[3px] -right-[5px] w-[14px] h-[14px] rounded-full bg-[#0066cc] text-white text-[9px] font-semibold flex items-center justify-center leading-none">
                  3
                </span>
              </Link>

              {/* User — desktop only */}
              <Link
                to="/login"
                className="hidden sm:flex items-center gap-1 text-[#d2d2d7] hover:text-white transition-colors no-underline"
              >
                <UserIcon />
                <span className="text-[12px] font-normal tracking-[-0.12px] leading-none">
                  Đăng nhập
                </span>
              </Link>

              {/* Hamburger — mobile / tablet */}
              <button
                id="mobile-menu-toggle"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden text-[#d2d2d7] hover:text-white transition-colors cursor-pointer bg-transparent border-none outline-none p-1"
                aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
              >
                {mobileOpen ? <CloseIcon /> : <HamburgerIcon />}
              </button>
            </div>
          </div>
        </nav>

        {/* ═══════════════════════════════════════════
            SUB-NAV FROSTED — Parchment, 52px
            Visible on desktop only
        ═══════════════════════════════════════════ */}
        <div
          id="sub-nav"
          className="hidden lg:block h-[52px] border-b border-[#e0e0e0]"
          style={{
            backgroundColor: "rgba(245, 245, 247, 0.80)",
            backdropFilter: "saturate(180%) blur(20px)",
            WebkitBackdropFilter: "saturate(180%) blur(20px)",
          }}
        >
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-full flex items-center justify-between">
            {/* Left: category name */}
            <span
              className="text-[21px] font-semibold tracking-[0.231px] leading-[1.19] text-[#1d1d1f]"
              style={{
                fontFamily:
                  "SF Pro Display, system-ui, -apple-system, sans-serif",
              }}
            >
              Thiết bị công nghệ
            </span>

            {/* Right: utility links + CTA */}
            <div className="flex items-center gap-[20px]">
              <Link
                to="/products"
                className="text-[14px] font-normal tracking-[-0.224px] leading-[1.29] text-[#1d1d1f] hover:text-[#0066cc] transition-colors no-underline"
              >
                Tất cả sản phẩm
              </Link>
              <Link
                to="/products?cat=mac"
                className="text-[14px] font-normal tracking-[-0.224px] leading-[1.29] text-[#1d1d1f] hover:text-[#0066cc] transition-colors no-underline"
              >
                Mới nhất
              </Link>
              <Link
                to="/products?sale=true"
                className="text-[14px] font-normal tracking-[-0.224px] leading-[1.29] text-[#1d1d1f] hover:text-[#0066cc] transition-colors no-underline"
              >
                Ưu đãi
              </Link>
              <Link
                to="/contact"
                className="text-[14px] font-normal tracking-[-0.224px] leading-[1.29] text-[#1d1d1f] hover:text-[#0066cc] transition-colors no-underline"
              >
                Hỗ trợ
              </Link>

              {/* Primary CTA */}
              <Link
                to="/products"
                className="inline-flex items-center rounded-full bg-[#0066cc] text-white text-[17px] font-normal tracking-[-0.374px] leading-[1.47] px-[22px] py-[8px] hover:bg-[#0071e3] active:scale-95 transition-all no-underline"
              >
                Mua ngay
              </Link>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            MOBILE SIDE DRAWER
            Visible on mobile / tablet (< lg / 1024px)
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
          id="mobile-drawer"
          className={`fixed top-0 right-0 h-full w-[300px] max-w-[85vw] bg-[#1d1d1f] z-50 lg:hidden transition-transform duration-300 ease-out overflow-y-auto ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#333336]">
            <span className="text-white text-[14px] font-semibold tracking-[-0.224px] uppercase">
              Menu
            </span>
            <button
              onClick={closeMobile}
              className="text-[#86868b] hover:text-white transition-colors cursor-pointer bg-transparent border-none outline-none"
              aria-label="Đóng menu"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Login link - mobile */}
          <div className="px-5 py-3 border-b border-[#333336]">
            <Link
              to="/login"
              onClick={closeMobile}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors no-underline"
            >
              <UserIcon className="text-[#86868b]" />
              <span
                className="text-[14px] font-normal tracking-[-0.224px]"
                style={{
                  fontFamily:
                    "SF Pro Text, system-ui, -apple-system, sans-serif",
                }}
              >
                Đăng nhập / Đăng ký
              </span>
            </Link>
          </div>

          {/* Nav items with accordion */}
          <div className="px-5 py-2">
            {navItems.map((item) => (
              <MobileAccordion
                key={item.label}
                item={item}
                onNavigate={closeMobile}
              />
            ))}
          </div>

          {/* CTA button */}
          <div className="px-5 py-4">
            <Link
              to="/products"
              onClick={closeMobile}
              className="flex items-center justify-center w-full rounded-full bg-[#0066cc] text-white text-[17px] font-normal tracking-[-0.374px] py-[11px] hover:bg-[#0071e3] active:scale-95 transition-all no-underline"
              style={{
                fontFamily:
                  "SF Pro Text, system-ui, -apple-system, sans-serif",
              }}
            >
              Mua ngay
            </Link>
          </div>

          {/* Bottom links */}
          <div className="px-5 py-3 mt-auto border-t border-[#333336]">
            {[
              { label: "Giỏ hàng", href: "/cart" },
              { label: "Hỗ trợ", href: "/contact" },
              { label: "Ưu đãi", href: "/products?sale=true" },
            ].map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={closeMobile}
                className="block py-[8px] text-[14px] font-normal tracking-[-0.224px] text-[#86868b] hover:text-white transition-colors no-underline"
                style={{
                  fontFamily:
                    "SF Pro Text, system-ui, -apple-system, sans-serif",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}