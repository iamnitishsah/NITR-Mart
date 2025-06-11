"use client";

import { useState } from "react";
import Link from "next/link";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Simulate user authentication state (replace with actual logic)
  const isAuthenticated = false; // Change this to `true` if the user is logged in

  return (
    <nav className="bg-cyan-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img
                  src="/logo.png" // Replace with the path to your logo
                  alt="Logo"
                  className="h-8 w-8 mr-2"
                />
                <span className="text-2xl font-bold font-serif">Connection</span>
              </div>
            </Link>
          </div>

          {/* Menu for larger screens */}
          <div className="hidden md:flex space-x-4 font-serif">
            <Link href="/" className="hover:text-cyan-300">
              Home
            </Link>
            <Link href="/about" className="hover:text-cyan-300">
              About
            </Link>
            <Link href="/contact" className="hover:text-cyan-300">
              Contact
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/profile" className="hover:text-cyan-300">
                  Profile
                </Link>
                <Link href="/logout" className="hover:text-cyan-300">
                  Logout
                </Link>
              </>
            ) : (
              <Link href="/login" className="hover:text-cyan-300">
                Login
              </Link>
            )}
          </div>

          {/* Hamburger menu for smaller screens */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              
                {isOpen ? (
                  <RxCross2 />
                ) : (
                    <HiOutlineMenuAlt3 />
                )}
            </button>
          </div>
        </div>
      </div>

      {/* Dropdown menu for smaller screens */}
      {isOpen && (
        <div className="md:hidden bg-cyan-900">
          <Link
            href="/"
            className="block px-4 py-2 hover:text-cyan-300"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block px-4 py-2 hover:text-cyan-300"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block px-4 py-2 hover:text-cyan-300"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                href="/profile"
                className="block px-4 py-2 hover:text-cyan-300"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
              <Link
                href="/logout"
                className="block px-4 py-2 hover:text-cyan-300"
                onClick={() => setIsOpen(false)}
              >
                Logout
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className="block px-4 py-2 hover:text-cyan-300"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;