import React from "react";
import { Link } from "react-router-dom";

/* ═══════════════════════════════════════════════════════════════
   HẰNG SỐ & DỮ LIỆU
   ═══════════════════════════════════════════════════════════════ */
const SF_TEXT = "SF Pro Text, system-ui, -apple-system, sans-serif";
const SF_DISPLAY = "SF Pro Display, system-ui, -apple-system, sans-serif";

const CURRENT_VERSION = "v1.0.0";

/** Status indicators (system health — dữ liệu mẫu, sau thay bằng API) */
const SYSTEM_STATUS = [
  { label: "Máy chủ", value: "Hoạt động", ok: true },
  { label: "Cơ sở dữ liệu", value: "Bình thường", ok: true },
  { label: "Dung lượng lưu trữ", value: "62%", ok: true },
];

/** Link columns */
const FOOTER_COLUMNS = [
  {
    heading: "Quản lý",
    links: [
      { label: "Dashboard", href: "/admin/dashboard" },
      { label: "Sản phẩm", href: "/admin/products" },
      { label: "Đơn hàng", href: "/admin/orders" },
      { label: "Khách hàng", href: "/admin/customers" },
      { label: "Báo cáo", href: "/admin/reports/revenue" },
    ],
  },
  {
    heading: "Hệ thống",
    links: [
      { label: "Cài đặt chung", href: "/admin/settings/general" },
      { label: "Thanh toán", href: "/admin/settings/payments" },
      { label: "Vận chuyển", href: "/admin/settings/shipping" },
      { label: "Đơn vị tiền tệ", href: "/admin/settings/currency" },
      { label: "Email & Thông báo", href: "/admin/settings/notifications" },
    ],
  },
  {
    heading: "Hỗ trợ",
    links: [
      { label: "Trung tâm trợ giúp", href: "/admin/support" },
      { label: "Tài liệu API", href: "/admin/docs" },
      { label: "Báo lỗi hệ thống", href: "/admin/support/report" },
      { label: "Liên hệ kỹ thuật", href: "/contact" },
    ],
  },
];

/** Legal links */
const LEGAL_LINKS = [
  { label: "Chính sách bảo mật", href: "/privacy" },
  { label: "Điều khoản sử dụng", href: "/terms" },
  { label: "Chính sách cookie", href: "/cookies" },
];

/* ═══════════════════════════════════════════════════════════════
   SVG ICONS
   ═══════════════════════════════════════════════════════════════ */
function StatusDot({ ok }) {
  return (
    <span
      className={`inline-block w-[6px] h-[6px] rounded-full shrink-0 ${
        ok ? "bg-[#1d8a3d]" : "bg-[#e30000]"
      }`}
      aria-hidden="true"
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER ADMIN
   ═══════════════════════════════════════════════════════════════ */
export default function FooterAdmin() {
  return (
    <footer
      id="admin-footer"
      className="bg-[#f5f5f7] text-[#333333]"
      style={{ fontFamily: SF_TEXT }}
    >
      {/* ═══════════════════════════════════════
          STATUS BAR — system overview, admin chrome
      ═══════════════════════════════════════ */}
      <div className="border-b border-[#e0e0e0] bg-white/60">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            {/* Left: system name + version */}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-[26px] h-[26px] rounded-[7px] bg-[#0066cc] shrink-0">
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
              <div className="flex items-baseline gap-2 min-w-0">
                <span
                  className="text-[15px] font-semibold tracking-[-0.224px] text-[#1d1d1f] truncate"
                  style={{ fontFamily: SF_DISPLAY }}
                >
                  Hệ thống quản trị TechStore
                </span>
                <span className="hidden sm:inline-block text-[11px] font-normal tracking-[-0.12px] text-[#7a7a7a]">
                  {CURRENT_VERSION}
                </span>
              </div>
            </div>

            {/* Right: status chips */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {SYSTEM_STATUS.map((s) => (
                <span
                  key={s.label}
                  className="flex items-center gap-1.5 text-[12px] font-normal tracking-[-0.12px] leading-none text-[#7a7a7a]"
                >
                  <StatusDot ok={s.ok} />
                  <span className="text-[#333333]">{s.label}:</span>
                  <span className="text-[#1d8a3d]">{s.value}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          MAIN LINK COLUMNS — dense-link stack
      ═══════════════════════════════════════ */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              {/* Heading — caption-strong 14px / 600 / -0.224px */}
              <h4
                className="text-[14px] font-semibold tracking-[-0.224px] leading-[1.29] text-[#1d1d1f] mb-3"
                style={{ fontFamily: SF_TEXT }}
              >
                {col.heading}
              </h4>
              {/* Links — dense-link 17px / 400 / 2.41 leading */}
              <ul className="list-none m-0 p-0">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      to={link.href}
                      className="text-[15px] font-normal tracking-[0px] leading-[2.0] text-[#333333] hover:text-[#0066cc] transition-colors no-underline"
                      style={{ fontFamily: SF_TEXT }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ─── Quick note ─── */}
        <div className="mt-8 pt-6 border-t border-[#e0e0e0] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-[12px] font-normal tracking-[-0.12px] leading-[1.3] text-[#7a7a7a] max-w-[480px]">
            Khu vực dành riêng cho quản trị viên. Vui lòng không chia sẻ thông
            tin truy cập với người khác.
          </p>
          <Link
            to="/"
            className="shrink-0 self-start sm:self-auto inline-flex items-center gap-1.5 text-[13px] font-normal tracking-[-0.12px] text-[#0066cc] hover:underline active:opacity-70 transition-opacity no-underline"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Về trang chủ bán hàng
          </Link>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          BOTTOM LEGAL ROW — fine-print
      ═══════════════════════════════════════ */}
      <div className="border-t border-[#e0e0e0]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* Copyright */}
            <p className="text-[12px] font-normal tracking-[-0.12px] leading-none text-[#7a7a7a]">
              &copy; {new Date().getFullYear()} TechStore Admin. Mọi quyền được
              bảo lưu.
            </p>

            {/* Legal links */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              {LEGAL_LINKS.map((link, i) => (
                <span
                  key={link.href + link.label}
                  className="flex items-center gap-4"
                >
                  <Link
                    to={link.href}
                    className="text-[12px] font-normal tracking-[-0.12px] leading-none text-[#7a7a7a] hover:text-[#0066cc] transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                  {i < LEGAL_LINKS.length - 1 && (
                    <span className="hidden sm:inline text-[#e0e0e0] text-[10px]">
                      |
                    </span>
                  )}
                </span>
              ))}
            </div>

            {/* Version */}
            <p className="text-[12px] font-normal tracking-[-0.12px] leading-none text-[#7a7a7a] flex items-center gap-1.5">
              <span className="inline-block w-[6px] h-[6px] rounded-full bg-[#1d8a3d]" />
              Hệ thống đang chạy {CURRENT_VERSION}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
