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
  const [searchItem, setSearchItem] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const notificationsRef = useRef(null);
  const settingsRef = useRef(null);
  const searchRef = useRef(null);

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
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchItem(false);
      }
    };

    if (showNotifications || showSettings || searchItem) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNotifications, showSettings, searchItem]);

  return (
    <header className="bg-white shadow-md p-2 ">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-12 w-auto object-contain" />
        </Link>
        <nav className="flex items-center space-x-6">
          {/* GIÀY DÉP */}
          <div className="relative group">
            <Link className="hover:text-red-300 font-medium " to="/products">
              Giày Dép
            </Link>
            {/* LV2 */}
            <div
              className="absolute left-0 mt-2 bg-white w-50 shadow-lg 
            rounded-md border border-gray-300 opacity-0 invisible 
            group-hover:opacity-100 group-hover:visible transition-all 
            duration-200 z-50"
            >
              <div className="relative group/item">
                <Link
                  to="/products"
                  className="px-4 py-2 hover:bg-gray-100 hover:text-red-300 flex items-center justify-between"
                >
                  Sneaker
                </Link>

                {/* LV3 */}
                <div className="absolute bg-white w-50 ml-1 
                left-full top-0 shadow-lg rounded-md border 
                border-gray-300 opacity-0 invisible group-hover/item:opacity-100 
                group-hover/item:visible transition-all duration-200">
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                </div>
              </div>
              <div className="relative group/item">
                <Link
                  to="/products"
                  className="px-4 py-2 hover:bg-gray-100 hover:text-red-300 flex items-center justify-between"
                >
                  Sneaker
                </Link>

                {/* LV3 */}
                <div className="absolute bg-white w-50 ml-1 
                left-full top-0 shadow-lg rounded-md border 
                border-gray-300 opacity-0 invisible group-hover/item:opacity-100 
                group-hover/item:visible transition-all duration-200">
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                </div>
              </div>
              <div className="relative group/item">
                <Link
                  to="/products"
                  className="px-4 py-2 hover:bg-gray-100 hover:text-red-300 flex items-center justify-between"
                >
                  Sneaker
                </Link>

                {/* LV3 */}
                <div className="absolute bg-white w-50 ml-1 
                left-full top-0 shadow-lg rounded-md border 
                border-gray-300 opacity-0 invisible group-hover/item:opacity-100 
                group-hover/item:visible transition-all duration-200">
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Quần Áo */}
          <div className="relative group">
            <Link className="hover:text-red-300 font-medium " to="/products">
              Quần Áo
            </Link>
            {/* LV2 */}
            <div
              className="absolute left-0 mt-2 bg-white w-50 shadow-lg 
            rounded-md border border-gray-300 opacity-0 invisible 
            group-hover:opacity-100 group-hover:visible transition-all 
            duration-200 z-50"
            >
              <div className="relative group/item">
                <Link
                  to="/products"
                  className="px-4 py-2 hover:bg-gray-100 hover:text-red-300 flex items-center justify-between"
                >
                  Sneaker
                </Link>

                {/* LV3 */}
                <div className="absolute bg-white w-50 ml-1 
                left-full top-0 shadow-lg rounded-md border 
                border-gray-300 opacity-0 invisible group-hover/item:opacity-100 
                group-hover/item:visible transition-all duration-200">
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                </div>
              </div>
              <div className="relative group/item">
                <Link
                  to="/products"
                  className="px-4 py-2 hover:bg-gray-100 hover:text-red-300 flex items-center justify-between"
                >
                  Sneaker
                </Link>

                {/* LV3 */}
                <div className="absolute bg-white w-50 ml-1 
                left-full top-0 shadow-lg rounded-md border 
                border-gray-300 opacity-0 invisible group-hover/item:opacity-100 
                group-hover/item:visible transition-all duration-200">
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                </div>
              </div>
              <div className="relative group/item">
                <Link
                  to="/products"
                  className="px-4 py-2 hover:bg-gray-100 hover:text-red-300 flex items-center justify-between"
                >
                  Sneaker
                </Link>

                {/* LV3 */}
                <div className="absolute bg-white w-50 ml-1 
                left-full top-0 shadow-lg rounded-md border 
                border-gray-300 opacity-0 invisible group-hover/item:opacity-100 
                group-hover/item:visible transition-all duration-200">
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Phụ kiện */}
          <div className="relative group">
            <Link className="hover:text-red-300 font-medium " to="/products">
              Phụ kiện
            </Link>
            {/* LV2 */}
            <div
              className="absolute left-0 mt-2 bg-white w-50 shadow-lg 
            rounded-md border border-gray-300 opacity-0 invisible 
            group-hover:opacity-100 group-hover:visible transition-all 
            duration-200 z-50"
            >
              <div className="relative group/item">
                <Link
                  to="/products"
                  className="px-4 py-2 hover:bg-gray-100 hover:text-red-300 flex items-center justify-between"
                >
                  Sneaker
                </Link>

                {/* LV3 */}
                <div className="absolute bg-white w-50 ml-1 
                left-full top-0 shadow-lg rounded-md border 
                border-gray-300 opacity-0 invisible group-hover/item:opacity-100 
                group-hover/item:visible transition-all duration-200">
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                </div>
              </div>
              <div className="relative group/item">
                <Link
                  to="/products"
                  className="px-4 py-2 hover:bg-gray-100 hover:text-red-300 flex items-center justify-between"
                >
                  Sneaker
                </Link>

                {/* LV3 */}
                <div className="absolute bg-white w-50 ml-1 
                left-full top-0 shadow-lg rounded-md border 
                border-gray-300 opacity-0 invisible group-hover/item:opacity-100 
                group-hover/item:visible transition-all duration-200">
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                </div>
              </div>
              <div className="relative group/item">
                <Link
                  to="/products"
                  className="px-4 py-2 hover:bg-gray-100 hover:text-red-300 flex items-center justify-between"
                >
                  Sneaker
                </Link>

                {/* LV3 */}
                <div className="absolute bg-white w-50 ml-1 
                left-full top-0 shadow-lg rounded-md border 
                border-gray-300 opacity-0 invisible group-hover/item:opacity-100 
                group-hover/item:visible transition-all duration-200">
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Bóp Ví */}
          <div className="relative group">
            <Link className="hover:text-red-300 font-medium " to="/products">
              Bóp Ví
            </Link>
            {/* LV2 */}
            <div
              className="absolute left-0 mt-2 bg-white w-50 shadow-lg 
            rounded-md border border-gray-300 opacity-0 invisible 
            group-hover:opacity-100 group-hover:visible transition-all 
            duration-200 z-50"
            >
              <div className="relative group/item">
                <Link
                  to="/products"
                  className="px-4 py-2 hover:bg-gray-100 hover:text-red-300 flex items-center justify-between"
                >
                  Sneaker
                </Link>

                {/* LV3 */}
                <div className="absolute bg-white w-50 ml-1 
                left-full top-0 shadow-lg rounded-md border 
                border-gray-300 opacity-0 invisible group-hover/item:opacity-100 
                group-hover/item:visible transition-all duration-200">
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                </div>
              </div>
              <div className="relative group/item">
                <Link
                  to="/products"
                  className="px-4 py-2 hover:bg-gray-100 hover:text-red-300 flex items-center justify-between"
                >
                  Sneaker
                </Link>

                {/* LV3 */}
                <div className="absolute bg-white w-50 ml-1 
                left-full top-0 shadow-lg rounded-md border 
                border-gray-300 opacity-0 invisible group-hover/item:opacity-100 
                group-hover/item:visible transition-all duration-200">
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                </div>
              </div>
              <div className="relative group/item">
                <Link
                  to="/products"
                  className="px-4 py-2 hover:bg-gray-100 hover:text-red-300 flex items-center justify-between"
                >
                  Sneaker
                </Link>

                {/* LV3 */}
                <div className="absolute bg-white w-50 ml-1 
                left-full top-0 shadow-lg rounded-md border 
                border-gray-300 opacity-0 invisible group-hover/item:opacity-100 
                group-hover/item:visible transition-all duration-200">
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Nón Mũ */}
          <div className="relative group">
            <Link className="hover:text-red-300 font-medium " to="/products">
              Nón Mũ
            </Link>
            {/* LV2 */}
            <div
              className="absolute left-0 mt-2 bg-white w-50 shadow-lg 
            rounded-md border border-gray-300 opacity-0 invisible 
            group-hover:opacity-100 group-hover:visible transition-all 
            duration-200 z-50"
            >
              <div className="relative group/item">
                <Link
                  to="/products"
                  className="px-4 py-2 hover:bg-gray-100 hover:text-red-300 flex items-center justify-between"
                >
                  Sneaker
                </Link>

                {/* LV3 */}
                <div className="absolute bg-white w-50 ml-1 
                left-full top-0 shadow-lg rounded-md border 
                border-gray-300 opacity-0 invisible group-hover/item:opacity-100 
                group-hover/item:visible transition-all duration-200">
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                </div>
              </div>
              <div className="relative group/item">
                <Link
                  to="/products"
                  className="px-4 py-2 hover:bg-gray-100 hover:text-red-300 flex items-center justify-between"
                >
                  Sneaker
                </Link>

                {/* LV3 */}
                <div className="absolute bg-white w-50 ml-1 
                left-full top-0 shadow-lg rounded-md border 
                border-gray-300 opacity-0 invisible group-hover/item:opacity-100 
                group-hover/item:visible transition-all duration-200">
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                </div>
              </div>
              <div className="relative group/item">
                <Link
                  to="/products"
                  className="px-4 py-2 hover:bg-gray-100 hover:text-red-300 flex items-center justify-between"
                >
                  Sneaker
                </Link>

                {/* LV3 */}
                <div className="absolute bg-white w-50 ml-1 
                left-full top-0 shadow-lg rounded-md border 
                border-gray-300 opacity-0 invisible group-hover/item:opacity-100 
                group-hover/item:visible transition-all duration-200">
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                  <Link
                    to="/products"
                    className=" block px-4 py-2 hover:bg-gray-100 hover:text-red-300 "
                  >
                    Sneaker
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <nav className="flex items-center space-x-6 relative">
          {/* seacrh */}
          <div ref={searchRef} className="relative flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className={` h-10 transition-all duration-300 ease-in-out bg-white border
                 border-gray-300 rounded-full py-2 px-4 mr-2
                focus:outline-none focus:ring-0.5 focus:ring-gray-300
            ${searchItem ? "w-64 opacity-100" : "w-0 opacity-0 px-0 border-none"}`}
            />
            <button
              onClick={() => setSearchItem(!searchItem)}
              className="flex items-center justify-center h-10 w-10 text-gray-400 hover:text-gray-500 transition-colors"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
          </div>
                {/* Bell */}
          <div ref={notificationsRef} className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="flex items-center justify-center h-10 w-10 text-gray-400 hover:text-gray-500 transition-colors"
            >
              <BellIcon className="h-5 w-5" />
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
              className="flex items-center justify-center h-10 w-10 text-gray-400 hover:text-gray-500 transition-colors"
            >
              <SpeakerWaveIcon className="h-5 w-5" />
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

          <Link to="/login" className="flex items-center justify-center h-10 w-10 text-gray-400 hover:text-gray-500">
            <UserIcon className="h-5 w-5" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
