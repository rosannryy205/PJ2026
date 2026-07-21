import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "../components/Loading";

const SF_DISPLAY = "SF Pro Display, system-ui, -apple-system, sans-serif";
const SF_TEXT = "SF Pro Text, system-ui, -apple-system, sans-serif";

const API_BASE_URL = "http://localhost:3000/"; // Cấu hình URL API backend

function formatVndFromNumber(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return "";
  return new Intl.NumberFormat("vi-VN").format(Math.round(num)) + " ₫";
}

export default function Cart() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [loadingCart, setLoadingCart] = useState(false);
  const [error, setError] = useState(null);

  // Track which item is currently being mutated (for inline spinner)
  const [updatingItemId, setUpdatingItemId] = useState(null);

  // Track if initial mount has completed (to control animations)
  const hasMounted = useRef(false);

  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (acc, item) => acc + Number(item.price) * Number(item.quantity),
      0,
    );
  }, [cartItems]);

  // ─── Fetch cart (chỉ dùng cho initial load) ───
  const fetchCart = useCallback(async () => {
    if (authLoading) return;
    if (!isAuthenticated) {
      setCartItems([]);
      return;
    }

    try {
      setLoadingCart(true);
      setError(null);

      const res = await fetch(`${API_BASE_URL}api/cart`, {
        method: "GET",
        credentials: "include",
      });

      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(payload?.message || `HTTP ${res.status}`);
      }

      const items = payload?.data?.items ?? [];

      const mapped = items.map((it) => {
        const variant = it.variant ?? {};
        const product = it.product ?? {};

        const sale = Number(variant.sale_price);
        const price = Number(variant.price);
        const effectivePrice = Number.isFinite(sale) && sale > 0 ? sale : price;

        return {
          id: it.variant_id,
          productId: variant.product_id,
          name: product.name ?? "Sản phẩm",
          tagline: [variant.color, variant.ram, variant.storage]
            .filter(Boolean)
            .join(" • "),
          price: effectivePrice,
          quantity: Number(it.quantity ?? 1),
          // FE hiện chưa có endpoint lấy image theo variant,
          // nên dùng ảnh placeholder
          image: "/src/assets/product.jpg",
        };
      });

      setCartItems(mapped);
    } catch (e) {
      setError(e?.message || "Failed to load cart.");
      setCartItems([]);
    } finally {
      setLoadingCart(false);
      hasMounted.current = true;
    }
  }, [authLoading, isAuthenticated]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // ─── PUT /api/cart/items — Set quantity chính xác ───
  const updateQuantityOnServer = useCallback(
    async ({ variantId, quantity }) => {
      const res = await fetch(`${API_BASE_URL}api/cart/items`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ variantId, quantity }),
      });

      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(payload?.message || `HTTP ${res.status}`);
      }
      return payload;
    },
    [],
  );

  // ─── DELETE /api/cart/items — Xóa item ───
  const removeItemOnServer = useCallback(async ({ variantId }) => {
    const res = await fetch(`${API_BASE_URL}api/cart/items`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ variantId }),
    });

    const payload = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(payload?.message || `HTTP ${res.status}`);
    }
    return payload;
  }, []);

  // ─── Handler: Tăng / Giảm quantity (optimistic UI) ───
  const handleChangeQuantity = useCallback(
    async (item, delta) => {
      const nextQty = item.quantity + delta;
      if (nextQty < 1) return;

      // Optimistic: update UI ngay lập tức
      setCartItems((prev) =>
        prev.map((p) => (p.id === item.id ? { ...p, quantity: nextQty } : p)),
      );
      setUpdatingItemId(item.id);
      setError(null);

      try {
        await updateQuantityOnServer({
          variantId: item.id,
          quantity: nextQty,
        });
      } catch (e) {
        // Rollback nếu server lỗi
        setCartItems((prev) =>
          prev.map((p) =>
            p.id === item.id ? { ...p, quantity: item.quantity } : p,
          ),
        );
        setError(e?.message || "Failed to update quantity.");
      } finally {
        setUpdatingItemId(null);
      }
    },
    [updateQuantityOnServer],
  );

  // ─── Handler: Remove item (optimistic UI) ───
  const handleRemoveItem = useCallback(
    async (item) => {
      // Optimistic: remove khỏi UI ngay
      setCartItems((prev) => prev.filter((p) => p.id !== item.id));
      setUpdatingItemId(item.id);
      setError(null);

      try {
        await removeItemOnServer({ variantId: item.id });
      } catch (e) {
        // Rollback: thêm item lại
        setCartItems((prev) => [...prev, item]);
        setError(e?.message || "Failed to remove item.");
      } finally {
        setUpdatingItemId(null);
      }
    },
    [removeItemOnServer],
  );

  return (
    <main
      className="w-full min-h-screen bg-[#ffffff] text-[#1d1d1f]"
      style={{ fontFamily: SF_TEXT }}
    >
      <div className="max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center md:text-left mb-12 fade-in-up">
          <h1
            className="text-[34px] md:text-[40px] font-semibold leading-[1.1] tracking-[-0.374px] mb-6"
            style={{ fontFamily: SF_DISPLAY }}
          >
            {authLoading
              ? "Loading..."
              : cartItems.length > 0
                ? `Your Bag total is ${formatVndFromNumber(cartTotal)}.`
                : "Your Bag is empty."}
          </h1>
        </div>

        {error ? (
          <div className="text-center py-6 bg-red-50 text-red-700">{error}</div>
        ) : null}

        {/* ─── Initial Loading (fullscreen LoadingOverlay) ─── */}
        {loadingCart ? (
          <div className="relative min-h-[200px]">
            <Loading
              variant="overlay"
              size="medium"
              text="Loading cart..."
              shouldShow={true}
              minDurationMs={1000}
              maxDurationMs={3000}
            />
          </div>
        ) : cartItems.length > 0 ? (
          <>
            <div className="border-t border-[#e0e0e0]">
              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex flex-col md:flex-row items-center md:items-start gap-8 py-10 border-b border-[#e0e0e0] ${
                    !hasMounted.current ? "animate-fade-in" : ""
                  }`}
                  style={
                    !hasMounted.current
                      ? { animationDelay: `${index * 100}ms` }
                      : undefined
                  }
                >
                  <div className="w-48 h-48 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>

                  <div className="flex-1 w-full flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex flex-col text-center md:text-left">
                      <h2
                        className="text-[24px] md:text-[28px] font-semibold leading-[1.14] tracking-[0.196px] mb-1"
                        style={{ fontFamily: SF_DISPLAY }}
                      >
                        {item.name}
                      </h2>
                      <p className="text-[17px] text-[#7a7a7a] font-normal">
                        {item.tagline}
                      </p>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-4">
                      <div
                        className="text-[24px] font-semibold leading-[1.14] tracking-[0.196px]"
                        style={{ fontFamily: SF_DISPLAY }}
                      >
                        {formatVndFromNumber(item.price * item.quantity)}
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {/* ─── Nút giảm ─── */}
                          <button
                            type="button"
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#f5f5f7] text-[20px] text-[#1d1d1f] hover:opacity-100 opacity-80 transition-opacity disabled:opacity-40"
                            aria-label="Decrease quantity"
                            disabled={
                              item.quantity <= 1 || updatingItemId === item.id
                            }
                            onClick={() => handleChangeQuantity(item, -1)}
                          >
                            -
                          </button>

                          {/* ─── Quantity display / inline spinner ─── */}
                          <span className="text-[17px] font-semibold w-8 text-center relative flex items-center justify-center">
                            {updatingItemId === item.id ? (
                              <span className="inline-flex items-center justify-center">
                                <Loading variant="inline" size="small" />
                              </span>
                            ) : (
                              item.quantity
                            )}
                          </span>

                          {/* ─── Nút tăng ─── */}
                          <button
                            type="button"
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#f5f5f7] text-[20px] text-[#1d1d1f] hover:opacity-100 opacity-80 transition-opacity disabled:opacity-40"
                            aria-label="Increase quantity"
                            disabled={updatingItemId === item.id}
                            onClick={() => handleChangeQuantity(item, +1)}
                          >
                            +
                          </button>
                        </div>

                        {/* ─── Remove button ─── */}
                        <button
                          type="button"
                          className="text-[#0066cc] text-[17px] font-normal hover:underline opacity-80 transition-opacity disabled:opacity-40"
                          disabled={updatingItemId === item.id}
                          onClick={() => handleRemoveItem(item)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 md:mt-16 ml-auto md:w-1/2 lg:w-5/12 fade-in-up">
              <div className="flex justify-between items-center py-4 border-b border-[#e0e0e0]">
                <span className="text-[17px] font-normal">Subtotal</span>
                <span className="text-[17px] font-semibold">
                  {formatVndFromNumber(cartTotal)}
                </span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-[#e0e0e0]">
                <span className="text-[17px] font-normal">Shipping</span>
                <span className="text-[17px] font-semibold">FREE</span>
              </div>
              <div className="flex justify-between items-center py-6">
                <span
                  className="text-[24px] md:text-[28px] font-semibold leading-[1.14] tracking-[0.196px]"
                  style={{ fontFamily: SF_DISPLAY }}
                >
                  Total
                </span>
                <span
                  className="text-[24px] md:text-[28px] font-semibold leading-[1.14] tracking-[0.196px]"
                  style={{ fontFamily: SF_DISPLAY }}
                >
                  {formatVndFromNumber(cartTotal)}
                </span>
              </div>

              <div className="mt-4 flex justify-end">
                <Link
                  to="/checkout"
                  className="w-full sm:w-auto bg-[#0066cc] text-[#ffffff] px-[28px] py-[14px] rounded-full text-[18px] font-normal hover:bg-[#0071e3] active:scale-95 transition-all"
                  aria-label="Check out your bag"
                >
                  Check Out
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20 fade-in-up">
            <Link
              to="/products"
              className="inline-block bg-[#0066cc] text-[#ffffff] px-[22px] py-[11px] rounded-full text-[17px] font-normal hover:bg-[#0071e3] active:scale-95 transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeInUp 0.5s ease-out forwards;
          opacity: 0;
        }
        .fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `,
        }}
      />
    </main>
  );
}
