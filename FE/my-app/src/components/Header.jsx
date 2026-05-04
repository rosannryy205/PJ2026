import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState, useRef, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  UserIcon,
  BellIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/outline";

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const notificationsRef = useRef(null);
  const settingsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    };

    if (showNotifications || showSettings) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNotifications, showSettings]);

  return (
    <header className="bg-white shadow-md p-4 ">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <img src={logo} alt="Logo" className="h-20 w-auto object-contain" />
        <nav className="flex items-center space-x-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-150 pl-10 pr-4 py-2 bg-gray-100 border border-transparent rounded-full 
    text-sm placeholder-gray-500
    focus:bg-white focus:border-gray-500 focus:ring-blue-200 focus:outline-none
    transition-all duration-200"
            />
            <MagnifyingGlassIcon className="h-6 w-6 hover:text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </nav>
        <nav className="flex items-center space-x-6 relative">
          <div ref={notificationsRef} className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <BellIcon className="h-6 w-6" />
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50">
                <h3 className="font-bold text-gray-800 mb-3">Thông báo</h3>
                <div className="space-y-2">
                  <div className="p-2 bg-gray-50 rounded border-l-4 border-blue-500">
                    <p className="text-sm text-gray-700">
                      Bạn có 2 thông báo mới
                    </p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded border-l-4 border-green-500">
                    <p className="text-sm text-gray-700">
                      Đơn hàng đã được xác nhận
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div ref={settingsRef} className="relative">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <SpeakerWaveIcon className="h-6 w-6" />
            </button>
            {showSettings && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50">
                <h3 className="font-bold text-gray-800 mb-3">
                  Thông báo cập nhật
                </h3>
                <div className="space-y-2">
                  <div className="p-2 bg-gray-50 rounded border-l-4 border-blue-500">
                    <p className="text-sm text-gray-700">
                      Bạn có 2 thông báo mới
                    </p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded border-l-4 border-green-500">
                    <p className="text-sm text-gray-700">
                      Đơn hàng đã được xác nhận
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link to="/login" className="text-gray-400 hover:text-gray-500">
            <UserIcon className="h-6 w-6" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
