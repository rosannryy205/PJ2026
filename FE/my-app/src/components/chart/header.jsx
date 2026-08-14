
import { Bars3Icon, MagnifyingGlassIcon, BellIcon } from "@heroicons/react/24/outline";

export default function Header({ setIsOpen }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-[#e0e0e0] bg-[#ffffff] px-4 shadow-sm md:px-6">
      <div className="flex items-center">
        {/* Mobile menu button */}
        <button
          type="button"
          className="mr-4 inline-flex items-center justify-center rounded-md p-2 text-[#1d1d1f] hover:bg-[#f0f0f0] md:hidden"
          onClick={() => setIsOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>

        {/* Search */}
        <div className="hidden sm:flex max-w-md w-full items-center">
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-4 w-4 text-[#7a7a7a]" aria-hidden="true" />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              className="block w-full rounded-full border-0 bg-[#f5f5f7] py-2 pl-10 pr-4 text-[#1d1d1f] placeholder:text-[#7a7a7a] focus:ring-2 focus:ring-inset focus:ring-[#0071e3] sm:text-[14px]"
              style={{
                fontFamily: "SF Pro Text, system-ui, sans-serif",
                letterSpacing: "-0.224px",
              }}
              placeholder="Search..."
            />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notification button */}
        <button
          type="button"
          className="relative rounded-full bg-[#f5f5f7] p-2 text-[#1d1d1f] hover:bg-[#e0e0e0] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0071e3] focus:ring-offset-2"
        >
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-5 w-5" aria-hidden="true" />
          <span className="absolute top-1 right-1 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0066cc] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0066cc]"></span>
          </span>
        </button>

        {/* Profile dropdown / Avatar */}
        <div className="relative ml-3">
          <button
            type="button"
            className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3] focus:ring-offset-2"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="h-8 w-8 rounded-full border border-[#e0e0e0]"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Admin Profile"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
