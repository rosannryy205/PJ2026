import React, { useState } from "react";
import { Link } from "react-router-dom";

const SF_DISPLAY = "SF Pro Display, system-ui, -apple-system, sans-serif";
const SF_TEXT = "SF Pro Text, system-ui, -apple-system, sans-serif";

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "iPhone 15 Pro",
      tagline: "Natural Titanium, 256GB",
      price: 1099,
      quantity: 1,
      image:
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-natural-titanium-select?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1692875994000",
    },
    {
      id: 2,
      name: "AirPods Pro (2nd generation)",
      tagline: "with MagSafe Charging Case (USB-C)",
      price: 249,
      quantity: 1,
      image:
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1660803972361",
    },
  ]);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

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
            {cartItems.length > 0
              ? `Your Bag total is $${total.toLocaleString()}.`
              : "Your Bag is empty."}
          </h1>
        </div>

        {cartItems.length > 0 ? (
          <>
            <div className="border-t border-[#e0e0e0]">
              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-center md:items-start gap-8 py-10 border-b border-[#e0e0e0] animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
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
                        ${(item.price * item.quantity).toLocaleString()}
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#f5f5f7] hover:bg-[#e0e0e0] active:scale-95 transition-all text-[20px] text-[#1d1d1f]"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="text-[17px] font-semibold w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#f5f5f7] hover:bg-[#e0e0e0] active:scale-95 transition-all text-[20px] text-[#1d1d1f]"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-[#0066cc] text-[17px] font-normal hover:underline active:opacity-70 transition-opacity"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="mt-10 md:mt-16 ml-auto md:w-1/2 lg:w-5/12 animate-fade-in"
              style={{ animationDelay: `${cartItems.length * 100}ms` }}
            >
              <div className="flex justify-between items-center py-4 border-b border-[#e0e0e0]">
                <span className="text-[17px] font-normal">Subtotal</span>
                <span className="text-[17px] font-semibold">
                  ${total.toLocaleString()}
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
                  ${total.toLocaleString()}
                </span>
              </div>

              <div className="mt-4 flex justify-end">
                <Link
                  to="/check_out"
                  className="inline-block text-center w-full sm:w-auto bg-[#0066cc] text-[#ffffff] px-[28px] py-[14px] rounded-full text-[18px] font-normal hover:bg-[#0071e3] active:scale-95 transition-all"
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
