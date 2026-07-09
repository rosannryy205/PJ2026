import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SF_DISPLAY = "SF Pro Display, system-ui, -apple-system, sans-serif";
const SF_TEXT = "SF Pro Text, system-ui, -apple-system, sans-serif";

export default function Check_out() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  
  // Mock cart items (same as Cart.jsx for consistency)
  const cartItems = [
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
  ];

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate checkout
    alert("Order placed successfully!");
    navigate("/");
  };

  return (
    <main
      className="w-full min-h-screen bg-[#ffffff] text-[#1d1d1f]"
      style={{ fontFamily: SF_TEXT }}
    >
      <div className="max-w-[1068px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center md:text-left mb-12 fade-in-up">
          <h1
            className="text-[34px] md:text-[40px] font-semibold leading-[1.1] tracking-[-0.374px] mb-2"
            style={{ fontFamily: SF_DISPLAY }}
          >
            Checkout
          </h1>
          <p className="text-[17px] text-[#7a7a7a] font-normal tracking-[-0.374px]">
            Please enter your details to complete your order.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 xl:gap-24">
          {/* Left Column: Form */}
          <div className="flex-1 w-full fade-in-up" style={{ animationDelay: '100ms' }}>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Info */}
              <section>
                <h2 
                  className="text-[24px] font-semibold leading-[1.14] tracking-[0.196px] mb-6"
                  style={{ fontFamily: SF_DISPLAY }}
                >
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <input
                      type="email"
                      placeholder="Email address"
                      className="w-full bg-[#ffffff] text-[#1d1d1f] text-[17px] rounded-lg border border-[#e0e0e0] px-4 py-3 focus:outline-none focus:border-[#0071e3] transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone number"
                      className="w-full bg-[#ffffff] text-[#1d1d1f] text-[17px] rounded-lg border border-[#e0e0e0] px-4 py-3 focus:outline-none focus:border-[#0071e3] transition-colors"
                      required
                    />
                  </div>
                </div>
              </section>

              {/* Shipping Address */}
              <section>
                <h2 
                  className="text-[24px] font-semibold leading-[1.14] tracking-[0.196px] mb-6"
                  style={{ fontFamily: SF_DISPLAY }}
                >
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="First name"
                      className="w-1/2 bg-[#ffffff] text-[#1d1d1f] text-[17px] rounded-lg border border-[#e0e0e0] px-4 py-3 focus:outline-none focus:border-[#0071e3] transition-colors"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      className="w-1/2 bg-[#ffffff] text-[#1d1d1f] text-[17px] rounded-lg border border-[#e0e0e0] px-4 py-3 focus:outline-none focus:border-[#0071e3] transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Street address"
                      className="w-full bg-[#ffffff] text-[#1d1d1f] text-[17px] rounded-lg border border-[#e0e0e0] px-4 py-3 focus:outline-none focus:border-[#0071e3] transition-colors"
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="City"
                      className="w-1/2 bg-[#ffffff] text-[#1d1d1f] text-[17px] rounded-lg border border-[#e0e0e0] px-4 py-3 focus:outline-none focus:border-[#0071e3] transition-colors"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Postal code"
                      className="w-1/2 bg-[#ffffff] text-[#1d1d1f] text-[17px] rounded-lg border border-[#e0e0e0] px-4 py-3 focus:outline-none focus:border-[#0071e3] transition-colors"
                      required
                    />
                  </div>
                </div>
              </section>

              {/* Payment */}
              <section>
                <h2 
                  className="text-[24px] font-semibold leading-[1.14] tracking-[0.196px] mb-6"
                  style={{ fontFamily: SF_DISPLAY }}
                >
                  Payment Method
                </h2>

                <div className="space-y-4 mb-6">
                  <label className="flex items-center gap-3 cursor-pointer p-4 border border-[#e0e0e0] rounded-lg hover:border-[#0071e3] transition-colors">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="cod" 
                      checked={paymentMethod === 'cod'} 
                      onChange={() => setPaymentMethod('cod')}
                      className="w-5 h-5 accent-[#0066cc]"
                    />
                    <span className="text-[17px] font-normal text-[#1d1d1f]">Thanh toán khi nhận hàng (COD)</span>
                  </label>
                  
                  <label className="flex items-center gap-3 cursor-pointer p-4 border border-[#e0e0e0] rounded-lg hover:border-[#0071e3] transition-colors">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="card" 
                      checked={paymentMethod === 'card'} 
                      onChange={() => setPaymentMethod('card')}
                      className="w-5 h-5 accent-[#0066cc]"
                    />
                    <span className="text-[17px] font-normal text-[#1d1d1f]">Thanh toán trước (Thẻ tín dụng)</span>
                  </label>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <input
                        type="text"
                        placeholder="Card number"
                        className="w-full bg-[#ffffff] text-[#1d1d1f] text-[17px] rounded-lg border border-[#e0e0e0] px-4 py-3 focus:outline-none focus:border-[#0071e3] transition-colors"
                        required
                      />
                    </div>
                    <div className="flex gap-4">
                      <input
                        type="text"
                        placeholder="Expiration date (MM/YY)"
                        className="w-1/2 bg-[#ffffff] text-[#1d1d1f] text-[17px] rounded-lg border border-[#e0e0e0] px-4 py-3 focus:outline-none focus:border-[#0071e3] transition-colors"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Security code"
                        className="w-1/2 bg-[#ffffff] text-[#1d1d1f] text-[17px] rounded-lg border border-[#e0e0e0] px-4 py-3 focus:outline-none focus:border-[#0071e3] transition-colors"
                        required
                      />
                    </div>
                  </div>
                )}
              </section>
              
              <div className="pt-6 hidden lg:block">
                 <button
                  type="submit"
                  className="w-full bg-[#0066cc] text-[#ffffff] px-[28px] py-[14px] rounded-full text-[18px] font-normal hover:bg-[#0071e3] active:scale-95 transition-all"
                >
                  Place Order
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full lg:w-[420px] shrink-0 fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="bg-[#f5f5f7] rounded-[18px] p-6 lg:p-8 lg:sticky lg:top-24">
              <h2 
                className="text-[24px] font-semibold leading-[1.14] tracking-[0.196px] mb-6"
                style={{ fontFamily: SF_DISPLAY }}
              >
                Order Summary
              </h2>
              
              <div className="space-y-6 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-16 shrink-0 bg-[#ffffff] rounded-[8px] flex items-center justify-center p-2 border border-[#e0e0e0]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[14px] font-semibold tracking-[-0.224px] text-[#1d1d1f]">
                        {item.name}
                      </h3>
                      <p className="text-[12px] text-[#7a7a7a]">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-[14px] font-semibold text-[#1d1d1f]">
                      ${(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#e0e0e0] pt-6 space-y-4">
                <div className="flex justify-between items-center text-[14px] text-[#1d1d1f]">
                  <span>Subtotal</span>
                  <span className="font-semibold">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-[14px] text-[#1d1d1f]">
                  <span>Shipping</span>
                  <span className="font-semibold">FREE</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-[#e0e0e0]">
                  <span 
                    className="text-[21px] font-semibold tracking-[0.231px]"
                    style={{ fontFamily: SF_DISPLAY }}
                  >
                    Total
                  </span>
                  <span 
                    className="text-[21px] font-semibold tracking-[0.231px]"
                    style={{ fontFamily: SF_DISPLAY }}
                  >
                    ${total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-8 lg:hidden">
                 <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full bg-[#0066cc] text-[#ffffff] px-[28px] py-[14px] rounded-full text-[18px] font-normal hover:bg-[#0071e3] active:scale-95 transition-all"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
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
          opacity: 0;
        }
      `,
        }}
      />
    </main>
  );
}
