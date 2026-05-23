import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

// Mock data
const heroSlides = [
  {
    id: 1,
    title: "BỘ SƯU TẬP MÙA HÈ 2026",
    subtitle: "KHÁM PHÁ XU HƯỚNG THỜI TRANG",
    description: "GIẢM GIÁ ĐẾN 50% CHO TOÀN BỘ SẢN PHẨM",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80",
    cta: "MUA NGAY",
  },
  {
    id: 2,
    title: "STREET STYLE COLLECTION",
    subtitle: "PHONG CÁCH ĐƯỜNG PHỐ ĐƯƠNG ĐẠI",
    description: "FREESHIP CHO ĐƠN HÀNG TỪ 500K",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&q=80",
    cta: "XEM NGAY",
  },
  {
    id: 3,
    title: "PREMIUM QUALITY",
    subtitle: "CHẤT LƯỢNG ĐỈNH CAO",
    description: "ĐỔI TRẢ MIỄN PHÍ TRONG 30 NGÀY",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80",
    cta: "KHÁM PHÁ",
  },
];

const categories = [
  {
    id: 1,
    name: "Áo Thun",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
    count: 120,
  },
  {
    id: 2,
    name: "Áo Khoác",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80",
    count: 85,
  },
  {
    id: 3,
    name: "Quần Jeans",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80",
    count: 95,
  },
  {
    id: 4,
    name: "Đầm Váy",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80",
    count: 78,
  },
  {
    id: 5,
    name: "Giày Sneaker",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    count: 150,
  },
  {
    id: 6,
    name: "Phụ Kiện",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&q=80",
    count: 200,
  },
  {
    id: 7,
    name: "Túi Xách",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80",
    count: 65,
  },
  {
    id: 8,
    name: "Đồng Hồ",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&q=80",
    count: 45,
  },
];

const featuredProducts = [
  {
    id: 1,
    name: "Áo Thun Basic Premium",
    price: 299000,
    originalPrice: 450000,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
    badge: "Hot",
    rating: 4.8,
    sold: 234,
  },
  {
    id: 2,
    name: "Quần Jeans Slim Fit",
    price: 599000,
    originalPrice: 799000,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80",
    badge: "Sale",
    rating: 4.6,
    sold: 189,
  },
  {
    id: 3,
    name: "Áo Khoác Denim",
    price: 899000,
    originalPrice: 1200000,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80",
    badge: "New",
    rating: 4.9,
    sold: 156,
  },
  {
    id: 4,
    name: "Giày Sneaker Classic",
    price: 750000,
    originalPrice: 950000,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    badge: "Best",
    rating: 4.7,
    sold: 312,
  },
  {
    id: 5,
    name: "Đầm Maxi Floral",
    price: 650000,
    originalPrice: 850000,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80",
    badge: "Trend",
    rating: 4.5,
    sold: 98,
  },
  {
    id: 6,
    name: "Túi Xách Leather",
    price: 1290000,
    originalPrice: 1590000,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80",
    badge: "Lux",
    rating: 4.8,
    sold: 67,
  },
  {
    id: 7,
    name: "Áo Polo Cotton",
    price: 350000,
    originalPrice: 450000,
    image: "https://images.unsplash.com/photo-1625910513413-5fc45b64e95a?w=500&q=80",
    badge: "Hot",
    rating: 4.6,
    sold: 278,
  },
  {
    id: 8,
    name: "Quần Short Casual",
    price: 250000,
    originalPrice: 350000,
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&q=80",
    badge: "Sale",
    rating: 4.4,
    sold: 345,
  },
];

const comboDeals = [
  {
    id: 1,
    title: "COMBO OFFICE CHIC",
    description: "ÁO + QUẦN + GIÀY",
    discount: "30%",
    image: "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=600&q=80",
    products: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=100&q=80",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=100&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80",
    ],
  },
  {
    id: 2,
    title: "COMBO WEEKEND VIBES",
    description: "ÁO THUN + QUẦN SHORT",
    discount: "25%",
    image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80",
    products: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&q=80",
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=100&q=80",
    ],
  },
  {
    id: 3,
    title: "COMBO DATE NIGHT",
    description: "ĐẦM + TÚI + GIÀY",
    discount: "35%",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
    products: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=100&q=80",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=100&q=80",
    ],
  },
];

const blogPosts = [
  {
    id: 1,
    title: "XU HƯỚNG THỜI TRANG MÙA HÈ 2026",
    excerpt: "Khám phá những phong cách sẽ lên ngôi trong mùa hè năm nay...",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
    date: "12/05/2026",
    author: "Fashion Editor",
    category: "Trends",
  },
  {
    id: 2,
    title: "CÁCH MIX & MATCH ĐỒ CƠ BẢN",
    excerpt: "Biến những món đồ cơ bản thành outfit ấn tượng với bí quyết đơn giản...",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
    date: "10/05/2026",
    author: "Style Expert",
    category: "Tips",
  },
  {
    id: 3,
    title: "TOP 5 MÀU SẮC HOT NHẤT NĂM NAY",
    excerpt: "Những gam màu sẽ thống trị làng mốt trong năm 2026...",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80",
    date: "08/05/2026",
    author: "Color Specialist",
    category: "Colors",
  },
  {
    id: 4,
    title: "CHĂM SÓC VẢI ĐÚNG CÁCH",
    excerpt: "Hướng dẫn chi tiết cách bảo quản quần áo để luôn như mới...",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80",
    date: "05/05/2026",
    author: "Care Guide",
    category: "Care",
  },
];

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(price);

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index) => setCurrentSlide(index);

  const sectionTitleClass = useMemo(
    () =>
      "font-[Helvetica_Now_Display_Medium] text-[#111111] text-[16px] md:text-[24px] lg:text-[32px] leading-[1.2] font-medium",
    []
  );

  return (
    <div className="min-h-screen bg-[#ffffff]">
      {/* Hero */}
      <section className="pt-0">
        <div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
          <div
            className="flex h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {heroSlides.map((slide) => (
              <div key={slide.id} className="min-w-full h-full relative">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />

                {/* editorial burn (ink overlay) */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(17,17,17,0.75) 0%, rgba(17,17,17,0.35) 45%, rgba(17,17,17,0) 100%)",
                  }}
                />

                <div className="absolute inset-0 flex items-end md:items-center px-4 md:px-10 lg:px-16 pb-8 md:pb-0">
                  <div className="w-full max-w-2xl text-[#ffffff]">
                    {/* subtitle pill */}
                    <div
                      className="inline-flex items-center justify-center rounded-full"
                      style={{
                        backgroundColor: "#111111",
                        padding: "8px 16px",
                        height: 40,
                      }}
                    >
                      <span
                        className="text-[16px] leading-[1.5] font-[Helvetica_Now_Text_Medium]"
                        style={{ letterSpacing: 0 }}
                      >
                        {slide.subtitle}
                      </span>
                    </div>

                    {/* display headline */}
                    <h2
                      className="mt-4 uppercase font-[Nike_Futura_ND] leading-[0.9] font-medium text-[48px] md:text-[64px] lg:text-[96px]"
                      style={{ letterSpacing: 0 }}
                    >
                      {slide.title}
                    </h2>

                    <p className="mt-4 text-[16px] md:text-[18px] leading-[1.5] text-[#f5f5f5]">
                      {slide.description}
                    </p>

                    {/* primary pill CTA */}
                    <div className="mt-6">
                      <Link
                        to="/products"
                        className="inline-flex items-center justify-center rounded-full"
                        style={{
                          backgroundColor: "#111111",
                          color: "#ffffff",
                          padding: "16px 32px",
                          height: 48,
                        }}
                      >
                        <span className="font-[Helvetica_Now_Text_Medium] text-[16px] leading-[1.5]">
                          {slide.cta}
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* arrows */}
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "#ffffff" }}
            aria-label="Previous slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "#ffffff" }}
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className="rounded-full"
                style={{
                  width: currentSlide === index ? 32 : 12,
                  height: 12,
                  backgroundColor:
                    currentSlide === index ? "#ffffff" : "rgba(255,255,255,0.5)",
                  transition: "none",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="pt-[48px] pb-12 md:pb-[48px] px-4">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-10">
            <h2 className={sectionTitleClass} style={{ letterSpacing: 0 }}>
              DANH MỤC NỔI BẬT
            </h2>
            <p className="mt-3 text-[16px] leading-[1.5] text-[#707072] font-[Helvetica_Now_Text]">
              KHÁM PHÁ CÁC BỘ SƯU TẬP THỜI TRANG ĐA DẠNG
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to="/products"
                className="group relative overflow-hidden"
                style={{ borderRadius: 0 }}
              >
                <div className="aspect-square bg-[#f5f5f5]">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* image wash */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(17,17,17,0.65) 100%)",
                  }}
                />

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-[#ffffff] font-[Helvetica_Now_Text_Medium] text-[16px] leading-[1.5]">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-[#e5e5e5] text-[12px] leading-[1.5] font-[Helvetica_Now_Text_Medium]">
                    {category.count} SẢN PHẨM
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-12 md:py-[48px] px-4" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-end flex-col gap-6 md:flex-row md:justify-between">
            <div>
              <h2 className={sectionTitleClass} style={{ letterSpacing: 0 }}>
                SẢN PHẨM NỔI BẬT
              </h2>
              <p className="mt-3 text-[16px] leading-[1.5] text-[#707072] font-[Helvetica_Now_Text]">
                NHỮNG SẢN PHẨM ĐƯỢC YÊU THÍCH NHẤT
              </p>
            </div>

            <Link
              to="/products"
              className="text-[#111111] font-[Helvetica_Now_Text_Medium]"
              style={{ textDecoration: "underline", textUnderlineOffset: 2 }}
            >
              XEM TẤT CẢ →
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="cursor-pointer" style={{ backgroundColor: "#f5f5f5" }}>
                {/* product card: flat, no shadow, no extra radius */}
                <div className="relative" style={{ backgroundColor: "#f5f5f5" }}>
                  <div className="aspect-[3/4]" style={{ backgroundColor: "#f5f5f5" }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* promo badge */}
                  <div
                    className="absolute top-4 left-4 inline-flex items-center justify-center"
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #cacacb",
                      borderRadius: 9999,
                      padding: "4px 12px",
                      height: 28,
                    }}
                  >
                    <span className="text-[12px] leading-[1.5] font-[Helvetica_Now_Text_Medium] text-[#111111]">
                      {product.badge}
                    </span>
                  </div>
                </div>

                <div className="mt-2">
                  <h3 className="text-[#111111] font-[Helvetica_Now_Text_Medium] text-[16px] leading-[1.5]">
                    {product.name}
                  </h3>

                  <div className="mt-1 flex items-center gap-3">
                    <span className="text-[14px] font-[Helvetica_Now_Text_Medium] text-[#111111] leading-[1.5]">
                      {formatPrice(product.price)}đ
                    </span>
                    <span className="text-[14px] font-[Helvetica_Now_Text_Medium] text-[#707072] leading-[1.5] line-through">
                      {formatPrice(product.originalPrice)}đ
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Combo deals */}
      <section className="py-12 md:py-[48px] px-4" style={{ backgroundColor: "#f5f5f5" }}>
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-10">
            <h2 className={sectionTitleClass} style={{ letterSpacing: 0 }}>
              COMBO KHUYẾN MÃI
            </h2>
            <p className="mt-3 text-[16px] leading-[1.5] text-[#707072] font-[Helvetica_Now_Text]">
              MUA COMBO TIẾT KIỆM HƠN
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {comboDeals.map((combo) => (
              <div key={combo.id} style={{ backgroundColor: "#ffffff" }}>
                <div className="relative">
                  <div className="aspect-[16/10]" style={{ backgroundColor: "#f5f5f5" }}>
                    <img
                      src={combo.image}
                      alt={combo.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div
                    className="absolute top-4 right-4 inline-flex items-center justify-center rounded-full"
                    style={{
                      backgroundColor: "#d30005",
                      color: "#ffffff",
                      padding: "12px 16px",
                      height: 40,
                    }}
                  >
                    <span className="text-[14px] leading-[1.5] font-[Helvetica_Now_Text_Medium]">
                      -{combo.discount}
                    </span>
                  </div>
                </div>

                <div className="pt-6">
                  <h3
                    className="text-[#111111] font-[Helvetica_Now_Display_Medium] text-[24px] leading-[1.2] font-medium"
                    style={{ letterSpacing: 0 }}
                  >
                    {combo.title}
                  </h3>
                  <p className="mt-3 text-[16px] leading-[1.5] text-[#707072] font-[Helvetica_Now_Text]">
                    {combo.description}
                  </p>

                  <div className="mt-5 flex gap-3">
                    {combo.products.map((p, idx) => (
                      <img
                        key={idx}
                        src={p}
                        alt={`${combo.title} product ${idx + 1}`}
                        className="w-[64px] h-[64px] object-cover"
                        style={{ borderRadius: 0, border: "1px solid #e5e5e5" }}
                      />
                    ))}
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-full"
                      style={{
                        backgroundColor: "#111111",
                        color: "#ffffff",
                        height: 48,
                        padding: "16px 32px",
                        width: "100%",
                      }}
                    >
                      <span className="font-[Helvetica_Now_Text_Medium] text-[16px] leading-[1.5]">
                        MUA COMBO
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-12 md:py-[48px] px-4" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-end flex-col gap-6 md:flex-row md:justify-between">
            <div>
              <h2 className={sectionTitleClass} style={{ letterSpacing: 0 }}>
                TIN TỨC & XU HƯỚNG
              </h2>
              <p className="mt-3 text-[16px] leading-[1.5] text-[#707072] font-[Helvetica_Now_Text]">
                CẬP NHẬT NHỮNG THÔNG TIN MỚI NHẤT VỀ THỜI TRANG
              </p>
            </div>

            <Link
              to="/blog"
              className="text-[#111111] font-[Helvetica_Now_Text_Medium]"
              style={{ textDecoration: "underline", textUnderlineOffset: 2 }}
            >
              XEM TẤT CẢ →
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {blogPosts.map((post) => (
              <article key={post.id} className="cursor-pointer">
                <div className="relative aspect-[4/5] bg-[#f5f5f5]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute top-4 left-4">
                    <span
                      className="inline-flex items-center justify-center rounded-full"
                      style={{
                        backgroundColor: "#ffffff",
                        height: 40,
                        padding: "8px 16px",
                        borderRadius: 9999,
                      }}
                    >
                      <span className="text-[12px] leading-[1.5] font-[Helvetica_Now_Text_Medium] text-[#111111]">
                        {post.category}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-[14px] leading-[1.5] text-[#707072] font-[Helvetica_Now_Text_Medium] flex gap-2">
                    <span>{post.date}</span>
                    <span aria-hidden>•</span>
                    <span>{post.author}</span>
                  </div>

                  <h3 className="mt-2 text-[#111111] font-[Helvetica_Now_Text_Medium] text-[16px] leading-[1.5]">
                    {post.title}
                  </h3>

                  <p className="mt-2 text-[16px] leading-[1.5] text-[#707072] font-[Helvetica_Now_Text]">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 md:py-[48px] px-4" style={{ backgroundColor: "#111111" }}>
        <div className="max-w-[720px] mx-auto text-center">
          <h2 className="text-[#ffffff] font-[Helvetica_Now_Display_Medium] text-[24px] md:text-[32px] leading-[1.2] font-medium">
            ĐĂNG KÝ NHẬN TIN
          </h2>
          <p className="mt-3 text-[#f5f5f5] text-[16px] leading-[1.5] font-[Helvetica_Now_Text]">
            NHẬN THÔNG TIN KHUYẾN MÃI VÀ XU HƯỚNG THỜI TRANG MỚI NHẤT
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Nhập email của bạn..."
              className="flex-1"
              style={{
                height: 48,
                borderRadius: 9999,
                padding: "8px 16px",
                backgroundColor: "#ffffff",
                color: "#111111",
                border: "1px solid #e5e5e5",
                fontFamily: "Helvetica Now Text, Arial, sans-serif",
                outline: "none",
              }}
            />

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full"
              style={{
                backgroundColor: "#ffffff",
                color: "#111111",
                height: 48,
                padding: "16px 32px",
              }}
            >
              <span className="font-[Helvetica_Now_Text_Medium] text-[16px] leading-[1.5]">
                ĐĂNG KÝ
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

