import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const NAV = [
  {
    label: "Giày Dép",
    href: "/products",
    groups: [
      {
        label: "Sneaker",
        items: [
          { label: "Sneaker", href: "/products" },
          { label: "Sneaker", href: "/products" },
          { label: "Sneaker", href: "/products" },
          { label: "Sneaker", href: "/products" },
        ],
      },
    ],
  },
  {
    label: "Quần Áo",
    href: "/products",
    groups: [
      {
        label: "Sneaker",
        items: [
          { label: "Sneaker", href: "/products" },
          { label: "Sneaker", href: "/products" },
          { label: "Sneaker", href: "/products" },
          { label: "Sneaker", href: "/products" },
        ],
      },
    ],
  },
  {
    label: "Phụ Kiện",
    href: "/products",
    groups: [
      {
        label: "Sneaker",
        items: [
          { label: "Sneaker", href: "/products" },
          { label: "Sneaker", href: "/products" },
          { label: "Sneaker", href: "/products" },
          { label: "Sneaker", href: "/products" },
        ],
      },
    ],
  },
  {
    label: "Bóp Ví",
    href: "/products",
    groups: [
      {
        label: "Sneaker",
        items: [
          { label: "Sneaker", href: "/products" },
          { label: "Sneaker", href: "/products" },
          { label: "Sneaker", href: "/products" },
          { label: "Sneaker", href: "/products" },
        ],
      },
    ],
  },
  {
    label: "Nón Mũ",
    href: "/products",
    groups: [
      {
        label: "Sneaker",
        items: [
          { label: "Sneaker", href: "/products" },
          { label: "Sneaker", href: "/products" },
          { label: "Sneaker", href: "/products" },
          { label: "Sneaker", href: "/products" },
        ],
      },
    ],
  },
];

function useEscape(onEscape, enabled) {
  useEffect(() => {
    if (!enabled) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onEscape();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onEscape, enabled]);
}

function useOutsidePointerDown(refs, onOutside, enabled) {
  useEffect(() => {
    if (!enabled) return;

    const handler = (e) => {
      const target = e.target;
      const isInside = refs.some(
        (r) => r.current && r.current.contains(target),
      );
      if (!isInside) onOutside();
    };

    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, [refs, onOutside, enabled]);
}

function SearchDropdown({ query, setQuery, onClose, placeholder, isOpen }) {
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEscape(onClose, isOpen);
  useOutsidePointerDown([dropdownRef], onClose, isOpen);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus?.();
    }
  }, [isOpen]);

  const suggestions = [
    "New arrivals",
    "Air Max deals",
    "Running essentials",
    "Jordan classics",
  ];

  return (
    <>
      {/* Mobile: Fixed fullwidth under header */}
      <div className="sm:hidden fixed left-0 right-0 top-14 z-[160]">
        <div className="border-t border-[#e5e5e5] bg-white">
          <div className="px-4 pt-4 pb-2">
            <div className="flex items-center gap-2 relative">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="flex-1 h-10 px-4 rounded-full bg-[#f5f5f5] border border-[#f5f5f5] text-[#111111] focus:outline-none focus:border-[#cacacb] text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Escape") onClose();
                }}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 text-[#111111]"
                  aria-label="Clear search"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="px-4 py-3">
            <div className="text-xs font-medium tracking-wide uppercase text-[#6b6b6b] mb-3">
              Suggestions
            </div>
            <div className="flex flex-col gap-1">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setQuery(s);
                    onClose();
                  }}
                  className="text-left rounded-xl px-3 py-2 text-sm text-[#111111] hover:bg-[#f5f5f5] transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: Dropdown dưới button */}
      <div ref={dropdownRef} className="hidden sm:block absolute left-0 right-0 top-full mt-2 z-[160] sm:left-auto sm:w-96 lg:w-[400px]">
        <div className="rounded-[18px] border border-[#e5e5e5] bg-white overflow-hidden shadow-lg">
          <div className="px-4 pt-4 pb-2 border-b border-[#e5e5e5]">
            <div className="flex items-center gap-2 relative">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="flex-1 h-10 px-4 rounded-full bg-[#f5f5f5] border border-[#f5f5f5] text-[#111111] focus:outline-none focus:border-[#cacacb] text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Escape") onClose();
                }}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 text-[#111111]"
                  aria-label="Clear search"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="px-4 py-3">
            <div className="text-xs font-medium tracking-wide uppercase text-[#6b6b6b] mb-3">
              Suggestions
            </div>
            <div className="flex flex-col gap-1">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setQuery(s);
                    onClose();
                  }}
                  className="text-left rounded-xl px-3 py-2 text-sm text-[#111111] hover:bg-[#f5f5f5] transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function DesktopLv1Menu({ lv1, isOpen, onOpen, onClose }) {
  const wrapRef = useRef(null);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);

  useOutsidePointerDown(
    [wrapRef],
    () => {
      onClose();
    },
    isOpen,
  );

  useEscape(() => {
    onClose();
    triggerRef.current?.focus?.();
  }, isOpen);

  const onTriggerKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      onOpen();
      const first = panelRef.current?.querySelector(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      first?.focus?.();
    }
  };

  return (
    <div
      ref={wrapRef}
      className="relative z-[120]"
      onMouseEnter={() => onOpen()}
      onMouseLeave={() => onClose()}
    >
      <button
        ref={triggerRef}
        type="button"
        className="inline-flex items-center"
        style={{
          fontSize: 16,
          fontWeight: 500,
          lineHeight: 1.5,
          color: "#111111",
        }}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={`menu-${lv1.label}`}
        onFocus={() => onOpen()}
        onKeyDown={onTriggerKeyDown}
        onClick={() => onOpen()}
      >
        {lv1.label}
      </button>

      <div
        id={`menu-${lv1.label}`}
        role="menu"
        ref={panelRef}
        className={
          "absolute left-0 top-full w-[320px] z-[200] overflow-hidden bg-white border border-[#e5e5e5] " +
          (isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-1 pointer-events-none")
        }
        style={{
          transformOrigin: "top left",
          transition: "opacity 180ms ease, transform 180ms ease",
        }}
      >
        <div className="p-4">
          {lv1.groups.map((g) => (
            <div key={g.label}>
              <div
                className="pb-3 mb-3"
                style={{ borderBottom: "1px solid #cacacb" }}
              >
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    lineHeight: 1.75,
                    color: "#111111",
                  }}
                >
                  {g.label}
                </div>
              </div>

              <ul className="flex flex-col gap-3">
                {g.items.map((item, idx) => {
                  const key = `${lv1.label}-${g.label}-${item.href}-${item.label}-${idx}`;
                  return (
                    <li key={key}>
                      <Link
                        to={item.href}
                        role="menuitem"
                        className="block w-full"
                        style={{
                          fontSize: 16,
                          fontWeight: 500,
                          lineHeight: 1.5,
                          color: "#111111",
                        }}
                        onClick={() => onClose()}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [openLv1, setOpenLv1] = useState(null);

  const searchPlaceholder = useMemo(() => "Search...", []);

  const openDrawer = () => {
    setDrawerOpen(true);
    setSearchOpen(false);
    setOpenLv1(null);
  };

  const openSearch = () => {
    setDrawerOpen(false);
    setOpenLv1(null);
    setSearchOpen(true);
  };

  const closeDrawer = () => setDrawerOpen(false);
  const closeSearch = () => setSearchOpen(false);
  const closeLv1 = () => setOpenLv1(null);

  // Đóng dropdown khi mở overlay/search
  useEffect(() => {
    if (!drawerOpen && !searchOpen) return;
    queueMicrotask(() => setOpenLv1(null));
  }, [drawerOpen, searchOpen]);

  return (
    <header className="w-full relative z-20 bg-white">
      <div className="mx-auto max-w-[1440px] px-4">
        <div
          className="flex items-center justify-between flex-nowrap"
          style={{ height: 56 }}
        >
          {/* Mobile: hamburger */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={openDrawer}
              className="h-10 w-10 rounded-full bg-[#f5f5f5] text-[#111111]"
              aria-label="Open menu"
            >
              <Bars3Icon className="h-5 w-5 mx-auto" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="shrink-0">
              <img
                src={logo}
                alt="Logo"
                className="h-8 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop center nav */}
          <nav className="hidden lg:flex items-center gap-6 overflow-visible relative z-[100] flex-nowrap whitespace-nowrap shrink-0">
            {NAV.map((lv1) => (
              <DesktopLv1Menu
                key={lv1.label}
                lv1={lv1}
                isOpen={openLv1 === lv1.label}
                onOpen={() => setOpenLv1(lv1.label)}
                onClose={closeLv1}
              />
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Search - All devices */}
            <div className="relative flex-1 sm:flex-none">
              <div className="relative">
                <button
                  type="button"
                  onClick={openSearch}
                  className="h-10 w-10 sm:w-auto sm:px-4 rounded-full bg-[#f5f5f5] text-[#111111] inline-flex items-center justify-center gap-2"
                  aria-label="Open search"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>

                {/* Search dropdown */}
                {searchOpen && (
                  <SearchDropdown
                    query={query}
                    setQuery={setQuery}
                    onClose={closeSearch}
                    placeholder={searchPlaceholder}
                    isOpen={searchOpen}
                  />
                )}
              </div>
            </div>

            {/* Account */}
            <Link
              to="/login"
              className="hidden sm:flex items-center justify-center h-10 w-10 rounded-full bg-[#f5f5f5] text-[#111111]"
              aria-label="Account"
            >
              <UserIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Mobile drawer */}
        {drawerOpen && (
          <div
            className="fixed inset-0 z-50"
            style={{ backgroundColor: "rgba(255,255,255,0.96)" }}
          >
            <div className="absolute inset-0" />
            <div
              className="absolute left-0 top-0 bottom-0 w-[320px]"
              style={{
                backgroundColor: "#ffffff",
                borderRight: "1px solid #e5e5e5",
              }}
            >
              <div className="p-4 flex items-center justify-between">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-8 w-auto object-contain"
                />
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="h-10 w-10 rounded-full bg-[#f5f5f5] text-[#111111]"
                  aria-label="Close menu"
                >
                  <XMarkIcon className="h-5 w-5 mx-auto" />
                </button>
              </div>

              <div className="px-4 pb-6">
                <div style={{ height: 8 }} />
                <div
                  style={{
                    color: "#111111",
                    lineHeight: 1.5,
                    fontWeight: 500,
                    fontSize: 16,
                  }}
                >
                  Danh mục
                </div>

                <div className="mt-4 flex flex-col gap-6">
                  {NAV.map((lv1) => (
                    <div key={lv1.label}>
                      <Link
                        to={lv1.href}
                        className="block"
                        style={{
                          fontSize: 16,
                          fontWeight: 500,
                          lineHeight: 1.5,
                          color: "#111111",
                          paddingBottom: 16,
                          borderBottom: "1px solid #e5e5e5",
                        }}
                        onClick={closeDrawer}
                      >
                        {lv1.label}
                      </Link>

                      <div className="mt-4">
                        {lv1.groups.map((g) => (
                          <div key={g.label} className="mb-6">
                            <div
                              style={{
                                fontSize: 16,
                                fontWeight: 500,
                                lineHeight: 1.75,
                                color: "#111111",
                                marginBottom: 12,
                              }}
                            >
                              {g.label}
                            </div>
                            <ul className="flex flex-col gap-3">
                              {g.items.map((item, idx) => {
                                const key = `${lv1.label}-${g.label}-${item.href}-${item.label}-${idx}`;
                                return (
                                  <li key={key}>
                                    <Link
                                      to={item.href}
                                      className="block"
                                      style={{
                                        fontSize: 16,
                                        fontWeight: 500,
                                        lineHeight: 1.5,
                                        color: "#111111",
                                      }}
                                      onClick={closeDrawer}
                                    >
                                      {item.label}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              className="absolute inset-0"
              aria-label="Close menu"
              onClick={closeDrawer}
              style={{ backgroundColor: "transparent" }}
            />
          </div>
        )}
      </div>
    </header>
  );
}
