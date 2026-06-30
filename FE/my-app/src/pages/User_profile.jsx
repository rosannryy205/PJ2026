import React, { useState } from "react";
import { Link } from "react-router-dom";

const SF_DISPLAY = "SF Pro Display, system-ui, -apple-system, sans-serif";
const SF_TEXT = "SF Pro Text, system-ui, -apple-system, sans-serif";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    memberSince: "2024"
  };

  const orders = [
    { id: "W123456789", date: "Jun 15, 2026", total: 1099, status: "Delivered", item: "iPhone 15 Pro" },
    { id: "W987654321", date: "May 02, 2026", total: 249, status: "Delivered", item: "AirPods Pro (2nd generation)" },
    { id: "W445566778", date: "Nov 22, 2025", total: 1299, status: "Delivered", item: "MacBook Air M3" }
  ];

  return (
    <main className="w-full min-h-screen bg-[#f5f5f7] text-[#1d1d1f]" style={{ fontFamily: SF_TEXT }}>
      <div className="max-w-[1068px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        
        {/* Header */}
        <div className="mb-12 animate-fade-in-up">
          <h1 
            className="text-[34px] md:text-[40px] font-semibold leading-[1.1] tracking-[-0.374px]"
            style={{ fontFamily: SF_DISPLAY }}
          >
            Hi, {user.name.split(' ')[0]}.
          </h1>
          <p className="mt-2 text-[17px] text-[#7a7a7a] font-normal">
            Welcome to your account dashboard.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Sidebar Navigation */}
          <div className="md:col-span-4 lg:col-span-3 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="bg-[#ffffff] rounded-[18px] border border-[#e0e0e0] p-4 flex flex-col gap-1">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`text-left px-4 py-[11px] rounded-[11px] text-[17px] transition-all ${activeTab === 'dashboard' ? 'bg-[#f5f5f7] font-semibold text-[#1d1d1f]' : 'text-[#1d1d1f] hover:bg-[#f5f5f7]'}`}
              >
                Account Summary
              </button>
              <button 
                onClick={() => setActiveTab('orders')}
                className={`text-left px-4 py-[11px] rounded-[11px] text-[17px] transition-all ${activeTab === 'orders' ? 'bg-[#f5f5f7] font-semibold text-[#1d1d1f]' : 'text-[#1d1d1f] hover:bg-[#f5f5f7]'}`}
              >
                Order History
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`text-left px-4 py-[11px] rounded-[11px] text-[17px] transition-all ${activeTab === 'settings' ? 'bg-[#f5f5f7] font-semibold text-[#1d1d1f]' : 'text-[#1d1d1f] hover:bg-[#f5f5f7]'}`}
              >
                Settings
              </button>
              
              <div className="h-px bg-[#f0f0f0] my-2 mx-2"></div>
              
              <button 
                className="text-left px-4 py-[11px] rounded-[11px] text-[17px] text-[#e30000] hover:bg-[#fff0f0] transition-all active:scale-95 origin-left"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-8 lg:col-span-9 flex flex-col gap-6 lg:gap-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            
            {activeTab === 'dashboard' && (
              <>
                <div className="bg-[#ffffff] rounded-[18px] border border-[#e0e0e0] p-6 sm:p-8 hover:shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-shadow">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-[24px] font-semibold leading-[1.14] tracking-[0.196px]" style={{ fontFamily: SF_DISPLAY }}>Personal Info</h2>
                    <button 
                      onClick={() => setActiveTab('settings')}
                      className="text-[#0066cc] text-[17px] hover:underline active:opacity-70 transition-opacity"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-[#f0f0f0]">
                      <span className="text-[#7a7a7a] text-[17px] w-32 mb-1 sm:mb-0">Name</span>
                      <span className="text-[17px] font-medium">{user.name}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-[#f0f0f0]">
                      <span className="text-[#7a7a7a] text-[17px] w-32 mb-1 sm:mb-0">Email</span>
                      <span className="text-[17px] font-medium">{user.email}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center py-4">
                      <span className="text-[#7a7a7a] text-[17px] w-32 mb-1 sm:mb-0">Phone</span>
                      <span className="text-[17px] font-medium">{user.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#ffffff] rounded-[18px] border border-[#e0e0e0] p-6 sm:p-8 hover:shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-shadow">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-[24px] font-semibold leading-[1.14] tracking-[0.196px]" style={{ fontFamily: SF_DISPLAY }}>Recent Orders</h2>
                    <button 
                      onClick={() => setActiveTab('orders')} 
                      className="text-[#0066cc] text-[17px] hover:underline active:opacity-70 transition-opacity"
                    >
                      View All
                    </button>
                  </div>
                  {orders.slice(0, 1).map((order) => (
                    <div key={order.id} className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 p-5 bg-[#f5f5f7] rounded-[11px] border border-transparent hover:border-[#e0e0e0] transition-colors">
                      <div>
                        <div className="text-[17px] font-semibold mb-1 tracking-[-0.374px]">{order.item}</div>
                        <div className="text-[14px] text-[#7a7a7a] tracking-[-0.224px]">Order {order.id} • {order.date}</div>
                      </div>
                      <div className="flex flex-col sm:items-end gap-1">
                        <span className="text-[17px] font-semibold tracking-[-0.374px]">${order.total}</span>
                        <span className="text-[14px] text-[#0066cc] font-medium tracking-[-0.224px]">{order.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'orders' && (
              <div className="bg-[#ffffff] rounded-[18px] border border-[#e0e0e0] p-6 sm:p-8">
                <h2 className="text-[24px] font-semibold leading-[1.14] tracking-[0.196px] mb-8" style={{ fontFamily: SF_DISPLAY }}>Order History</h2>
                <div className="flex flex-col gap-5">
                  {orders.map((order) => (
                    <div key={order.id} className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 p-5 border border-[#e0e0e0] rounded-[11px] hover:border-[#0066cc] hover:shadow-[0_4px_12px_rgba(0,102,204,0.08)] transition-all cursor-pointer group">
                      <div>
                        <div className="text-[17px] font-semibold mb-1 tracking-[-0.374px] group-hover:text-[#0066cc] transition-colors">{order.item}</div>
                        <div className="text-[14px] text-[#7a7a7a] tracking-[-0.224px]">Order {order.id} • {order.date}</div>
                      </div>
                      <div className="flex flex-col sm:items-end gap-1">
                        <span className="text-[17px] font-semibold tracking-[-0.374px]">${order.total}</span>
                        <span className="text-[14px] text-[#0066cc] font-medium tracking-[-0.224px]">{order.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-[#ffffff] rounded-[18px] border border-[#e0e0e0] p-6 sm:p-8">
                <h2 className="text-[24px] font-semibold leading-[1.14] tracking-[0.196px] mb-8" style={{ fontFamily: SF_DISPLAY }}>Account Settings</h2>
                <div className="space-y-6 max-w-md">
                  <div>
                    <label className="block text-[14px] font-semibold tracking-[-0.224px] text-[#1d1d1f] mb-2">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue={user.name}
                      className="w-full bg-[#f5f5f7] border border-[#e0e0e0] text-[#1d1d1f] text-[17px] rounded-[11px] px-4 py-[11px] focus:outline-none focus:bg-[#ffffff] focus:ring-4 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] font-semibold tracking-[-0.224px] text-[#1d1d1f] mb-2">Email Address</label>
                    <input 
                      type="email" 
                      defaultValue={user.email}
                      className="w-full bg-[#f5f5f7] border border-[#e0e0e0] text-[#1d1d1f] text-[17px] rounded-[11px] px-4 py-[11px] focus:outline-none focus:bg-[#ffffff] focus:ring-4 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all"
                    />
                  </div>
                  <div className="pt-4">
                    <button className="bg-[#0066cc] text-[#ffffff] px-[22px] py-[11px] rounded-full text-[17px] font-normal hover:bg-[#0071e3] active:scale-95 transition-all">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
      `}} />
    </main>
  );
}
