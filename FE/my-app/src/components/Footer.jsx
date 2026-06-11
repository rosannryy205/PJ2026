import { Link } from "react-router-dom";

/* ─── FOOTER DATA ─── */
const footerColumns = [
  {
    heading: "Sản phẩm",
    links: [
      { label: "Mac", href: "/products?cat=mac" },
      { label: "iPhone", href: "/products?cat=iphone" },
      { label: "iPad", href: "/products?cat=ipad" },
      { label: "Apple Watch", href: "/products?cat=watch" },
      { label: "AirPods", href: "/products?cat=airpods" },
      { label: "Phụ kiện", href: "/products?cat=accessories" },
    ],
  },
  {
    heading: "Cửa hàng",
    links: [
      { label: "Tìm cửa hàng", href: "/stores" },
      { label: "Mua trực tuyến", href: "/products" },
      { label: "Trả góp 0%", href: "/installment" },
      { label: "Khuyến mãi", href: "/products?sale=true" },
      { label: "Chương trình Trade-In", href: "/trade-in" },
      { label: "Đơn hàng của bạn", href: "/orders" },
    ],
  },
  {
    heading: "Hỗ trợ",
    links: [
      { label: "Trung tâm hỗ trợ", href: "/contact" },
      { label: "Bảo hành & Sửa chữa", href: "/warranty" },
      { label: "Hướng dẫn sử dụng", href: "/guides" },
      { label: "Liên hệ", href: "/contact" },
      { label: "Câu hỏi thường gặp", href: "/faq" },
    ],
  },
  {
    heading: "Về chúng tôi",
    links: [
      { label: "Giới thiệu", href: "/about" },
      { label: "Tuyển dụng", href: "/careers" },
      { label: "Tin tức", href: "/news" },
      { label: "Trách nhiệm môi trường", href: "/environment" },
      { label: "Nhà đầu tư", href: "/investors" },
    ],
  },
];

const legalLinks = [
  { label: "Chính sách bảo mật", href: "/privacy" },
  { label: "Điều khoản sử dụng", href: "/terms" },
  { label: "Chính sách cookie", href: "/cookies" },
  { label: "Sitemap", href: "/sitemap" },
];

/* ─── SVG SOCIAL ICONS ─── */
function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function TiktokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function ZaloIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 16.32c-.21.472-.678.856-1.198.856H13.61l-2.26 2.003c-.178.158-.41.06-.41-.17v-1.833H9.396c-.52 0-.988-.384-1.198-.856a6.997 6.997 0 0 1-.498-2.57c0-3.866 3.134-7 7-7s7 3.134 7 7a6.997 6.997 0 0 1-.806 3.07zM10.5 11h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1zm0 2h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1z" />
    </svg>
  );
}

/* ─── MAIN FOOTER ─── */
export default function Footer() {
  return (
    <footer
      id="site-footer"
      className="bg-[#f5f5f7]"
      style={{
        fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif",
      }}
    >
      {/* ═══════════════════════════════════════
          TOP SECTION — Newsletter + Social
      ═══════════════════════════════════════ */}
      <div className="border-b border-[#e0e0e0]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-10">
            {/* Newsletter */}
            <div className="max-w-[480px]">
              <h3
                className="text-[21px] font-semibold tracking-[0.231px] leading-[1.19] text-[#1d1d1f] mb-2"
                style={{
                  fontFamily:
                    "SF Pro Display, system-ui, -apple-system, sans-serif",
                }}
              >
                Đăng ký nhận tin
              </h3>
              <p className="text-[14px] font-normal tracking-[-0.224px] leading-[1.43] text-[#333333] mb-4">
                Nhận thông tin sản phẩm mới, khuyến mãi độc quyền và mẹo công
                nghệ hàng tuần.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Nhập email của bạn"
                  className="flex-1 min-w-0 rounded-full bg-white text-[#1d1d1f] text-[17px] font-normal tracking-[-0.374px] leading-[1.47] px-5 py-[10px] border border-[rgba(0,0,0,0.08)] outline-none focus:border-[#0066cc] transition-colors placeholder:text-[#7a7a7a]"
                  style={{
                    fontFamily:
                      "SF Pro Text, system-ui, -apple-system, sans-serif",
                  }}
                />
                <button
                  className="shrink-0 rounded-full bg-[#0066cc] text-white text-[17px] font-normal tracking-[-0.374px] leading-[1.47] px-[22px] py-[10px] hover:bg-[#0071e3] active:scale-95 transition-all cursor-pointer border-none outline-none"
                  style={{
                    fontFamily:
                      "SF Pro Text, system-ui, -apple-system, sans-serif",
                  }}
                >
                  Đăng ký
                </button>
              </div>
            </div>

            {/* Social Icons */}
            <div>
              <p className="text-[14px] font-semibold tracking-[-0.224px] leading-[1.29] text-[#1d1d1f] mb-3 lg:text-right">
                Kết nối với chúng tôi
              </p>
              <div className="flex items-center gap-3 lg:justify-end">
                {[
                  {
                    Icon: FacebookIcon,
                    label: "Facebook",
                    href: "https://facebook.com",
                  },
                  {
                    Icon: InstagramIcon,
                    label: "Instagram",
                    href: "https://instagram.com",
                  },
                  {
                    Icon: YoutubeIcon,
                    label: "YouTube",
                    href: "https://youtube.com",
                  },
                  {
                    Icon: TiktokIcon,
                    label: "TikTok",
                    href: "https://tiktok.com",
                  },
                  {
                    Icon: ZaloIcon,
                    label: "Zalo",
                    href: "https://zalo.me",
                  },
                ].map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#e0e0e0]/60 text-[#333333] hover:bg-[#0066cc] hover:text-white transition-all active:scale-95"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          MAIN COLUMNS — Link Grid
      ═══════════════════════════════════════ */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {footerColumns.map((col) => (
            <div key={col.heading}>
              {/* Column heading — caption-strong: 14px / 600 / -0.224px */}
              <h4 className="text-[14px] font-semibold tracking-[-0.224px] leading-[1.29] text-[#1d1d1f] mb-3">
                {col.heading}
              </h4>

              {/* Links — dense-link: 17px / 400 / 2.41 line-height */}
              <ul className="list-none m-0 p-0">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-[17px] font-normal tracking-[0px] leading-[2.41] text-[#333333] hover:text-[#0066cc] transition-colors no-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ─── Contact Info Bar ─── */}
        <div className="mt-10 pt-8 border-t border-[#e0e0e0] flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
          {/* Hotline */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-[36px] h-[36px] rounded-full bg-[#e0e0e0]/60 text-[#333333] shrink-0">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <div>
              <p className="text-[12px] font-normal tracking-[-0.12px] leading-none text-[#7a7a7a] mb-1">
                Hotline
              </p>
              <p className="text-[17px] font-semibold tracking-[-0.374px] leading-[1.24] text-[#1d1d1f]">
                1900 6868
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-[36px] h-[36px] rounded-full bg-[#e0e0e0]/60 text-[#333333] shrink-0">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </span>
            <div>
              <p className="text-[12px] font-normal tracking-[-0.12px] leading-none text-[#7a7a7a] mb-1">
                Email
              </p>
              <p className="text-[17px] font-semibold tracking-[-0.374px] leading-[1.24] text-[#1d1d1f]">
                support@techstore.vn
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-[36px] h-[36px] rounded-full bg-[#e0e0e0]/60 text-[#333333] shrink-0">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <div>
              <p className="text-[12px] font-normal tracking-[-0.12px] leading-none text-[#7a7a7a] mb-1">
                Địa chỉ
              </p>
              <p className="text-[14px] font-normal tracking-[-0.224px] leading-[1.43] text-[#333333]">
                123 Nguyễn Huệ, Q.1, TP.HCM
              </p>
            </div>
          </div>
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
              &copy; {new Date().getFullYear()} TechStore. Mọi quyền được bảo
              lưu.
            </p>

            {/* Legal links */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              {legalLinks.map((link, i) => (
                <span key={link.label} className="flex items-center gap-4">
                  <Link
                    to={link.href}
                    className="text-[12px] font-normal tracking-[-0.12px] leading-none text-[#7a7a7a] hover:text-[#0066cc] transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                  {i < legalLinks.length - 1 && (
                    <span className="text-[#e0e0e0] text-[10px] hidden sm:inline">
                      |
                    </span>
                  )}
                </span>
              ))}
            </div>

            {/* Region */}
            <p className="text-[12px] font-normal tracking-[-0.12px] leading-none text-[#7a7a7a] flex items-center gap-1">
              <span>🇻🇳</span> Việt Nam
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}