import React, { useState } from 'react'

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-blue-500 sm:flex sm:justify-between sm:items-center">
      <div className="flex items-center justify-between px-4 py-3 sm:p-0">
        <div>
          <img
            className="h-8"
            src="https://example.com/logo.svg"
            alt="Logo"
          />
        </div>
        <div className="sm:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="block text-blue-200 hover:text-white focus:text-white focus:outline-none"
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 5h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1zm0 6h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2a1 1 0 011-1zm0 6h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2a1 1 0 011-1z"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`px-2 pt-2 pb-4 sm:flex ${isOpen ? "block" : "hidden"}`}
      >
        <a
          href="#"
          className="block px-2 py-1 text-white font-semibold rounded hover:bg-blue-600 sm:mt-0 sm:ml-2"
        >
          Home
        </a>
        <a
          href="/logout"
          className="mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-blue-600 sm:mt-0 sm:ml-2"
        >
          Logout
        </a>
      </div>
    </nav>
  )
}