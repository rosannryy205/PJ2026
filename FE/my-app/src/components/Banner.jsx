import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/*
 * 1. Phân tích DESIGN.md & Yêu cầu:
 * - Áp dụng React best practices để quản lý state (currentSlide) và side effects (setInterval) cho slider.
 * - Tuân thủ tuyệt đối typography (SF Pro Display, SF Pro Text) và màu sắc (surface-tile-1, action blue).
 * - Responsive slider: w-full full-bleed, flex container trượt mượt mà.
 * - Auto-sliding automation với khả năng pause khi hover (tăng tính accessibility).
 * - Cấu trúc DOM ngữ nghĩa và sạch sẽ.
 */

const slides = [
  {
    id: 1,
    eyebrow: "Sản phẩm mới",
    headline: "Kỷ nguyên công nghệ.<br className=\"hidden md:block\"/> Đột phá mọi giới hạn.",
    subhead: "Trải nghiệm sức mạnh xử lý vượt trội cùng thiết kế nguyên khối sang trọng.",
    primaryCta: { label: "Mua ngay", link: "/products" },
    secondaryCta: { label: "Tìm hiểu thêm", link: "/learn-more" },
    image: "/src/assets/banner1.jpg"
  },
  {
    id: 2,
    eyebrow: "Hiệu năng bứt phá",
    headline: "Sức mạnh di động.<br className=\"hidden md:block\"/> Đỉnh cao sáng tạo.",
    subhead: "Mỏng nhẹ tuyệt đối nhưng mang trong mình sức mạnh vô song của chip xử lý thế hệ mới.",
    primaryCta: { label: "Mua ngay", link: "/products" },
    secondaryCta: { label: "Xem chi tiết", link: "/learn-more" },
    image: "/src/assets/banner2.jpg" // Thay bằng ảnh khác nếu có
  },
  {
    id: 3,
    eyebrow: "Sắp ra mắt",
    headline: "Âm thanh vòm tinh tế.<br className=\"hidden md:block\"/> Đắm chìm mọi giác quan.",
    subhead: "Chất lượng âm thanh studio chuẩn xác trong thiết kế gần như vô hình.",
    primaryCta: { label: "Đặt trước", link: "/pre-order" },
    secondaryCta: { label: "Tìm hiểu thêm", link: "/learn-more" },
    image: "/src/assets/banner3.jpg" // Thay bằng ảnh khác nếu có
  }
];

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Automation Slider Effect
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // Trượt mỗi 5 giây
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section 
      className="relative w-full bg-[#1d1d1f] flex flex-col"
      style={{
        fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ─── SLIDER CONTAINER ─── */}
      <div className="relative w-full overflow-hidden">
        {/* Track */}
        <div 
          className="flex w-full transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div 
              key={slide.id} 
              className="w-full flex-shrink-0 flex flex-col items-center justify-center text-center relative px-4 sm:px-6 lg:px-10 min-h-[500px] md:min-h-[700px] py-24"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0 p-4 sm:p-6 lg:p-8">
                <div className="relative w-full h-full overflow-hidden rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                  <img 
                    src={slide.image} 
                    alt="Banner" 
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                  />
                  {/* Overlay để text luôn dễ đọc trên nền ảnh */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
                </div>
              </div>

              {/* Content Box */}
              <div 
                className={`w-full max-w-[1440px] mx-auto flex flex-col items-center z-10 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                {/* Eyebrow */}
                <span className="text-[#2997ff] text-[14px] font-semibold tracking-[-0.224px] uppercase mb-4">
                  {slide.eyebrow}
                </span>

                {/* Hero Headline */}
                <h1 
                  className="text-white text-[40px] md:text-[56px] font-semibold leading-[1.1] md:leading-[1.07] tracking-[0px] md:tracking-[-0.28px] mb-4 max-w-[800px]"
                  style={{ fontFamily: "SF Pro Display, system-ui, -apple-system, sans-serif" }}
                  dangerouslySetInnerHTML={{ __html: slide.headline }}
                />

                {/* Subhead */}
                <p 
                  className="text-[#cccccc] text-[21px] md:text-[28px] font-normal leading-[1.19] md:leading-[1.14] tracking-[0.231px] md:tracking-[0.196px] mb-8 max-w-[600px]"
                  style={{ fontFamily: "SF Pro Display, system-ui, -apple-system, sans-serif" }}
                >
                  {slide.subhead}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-16">
                  <Link 
                    to={slide.primaryCta.link}
                    className="inline-flex items-center justify-center rounded-full bg-[#0066cc] text-white text-[18px] font-light leading-none px-[28px] py-[14px] hover:bg-[#0071e3] active:scale-95 transition-all no-underline"
                  >
                    {slide.primaryCta.label}
                  </Link>
                  <Link 
                    to={slide.secondaryCta.link}
                    className="inline-flex items-center gap-1 text-[#2997ff] text-[17px] font-normal leading-[1.47] tracking-[-0.374px] hover:underline active:scale-95 transition-all no-underline group"
                  >
                    {slide.secondaryCta.label}
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ─── SLIDER DOTS (Apple Style Navigation) ─── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-[8px] rounded-full transition-all duration-300 ease-out cursor-pointer outline-none ${
                currentSlide === index ? 'w-[24px] bg-white' : 'w-[8px] bg-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.6)]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ─── TRUST INDICATORS BAR ─── */}
      {/* Đặt ra ngoài khu vực trượt để cố định trên mọi slide */}
      <div className="hidden md:block bg-[#252527] w-full relative z-20 mt-[-2px]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[rgba(255,255,255,0.08)]">
            
            {/* Indicator 1 */}
            <div className="flex flex-col items-center pt-6 md:pt-0">
              <div className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.04)] flex items-center justify-center mb-4 text-[#ffffff]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="text-[#ffffff] text-[14px] font-semibold tracking-[-0.224px] leading-[1.29] mb-1">Giao hàng toàn quốc</h3>
              <p className="text-[#cccccc] text-[14px] font-normal tracking-[-0.224px] leading-[1.43]">Miễn phí cho đơn hàng từ 500.000đ</p>
            </div>

            {/* Indicator 2 */}
            <div className="flex flex-col items-center pt-6 md:pt-0">
              <div className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.04)] flex items-center justify-center mb-4 text-[#ffffff]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-[#ffffff] text-[14px] font-semibold tracking-[-0.224px] leading-[1.29] mb-1">Bảo hành chính hãng</h3>
              <p className="text-[#cccccc] text-[14px] font-normal tracking-[-0.224px] leading-[1.43]">An tâm với bảo hành phần cứng 12 tháng</p>
            </div>

            {/* Indicator 3 */}
            <div className="flex flex-col items-center pt-6 md:pt-0">
              <div className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.04)] flex items-center justify-center mb-4 text-[#ffffff]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-[#ffffff] text-[14px] font-semibold tracking-[-0.224px] leading-[1.29] mb-1">Hỗ trợ kỹ thuật 24/7</h3>
              <p className="text-[#cccccc] text-[14px] font-normal tracking-[-0.224px] leading-[1.43]">Đội ngũ chuyên gia Apple luôn sẵn sàng</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
