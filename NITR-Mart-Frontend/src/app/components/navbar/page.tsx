"use client";
import {
  Home,
  Info,
  LogIn,
  LogOut,
  Menu,
  MessageCircle,
  Sparkles,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = false; // Change this to `true` if the user is logged in

  return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <div className="flex items-center cursor-pointer group">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 overflow-hidden">
                      <img
                          src="/logo.png"
                          alt="NITR Mart Logo"
                          className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="ml-3">
                  <span className="text-xl font-black bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent font-serif">
                    NITR Mart
                  </span>
                    <div className="text-xs text-gray-400 -mt-1">
                      Campus Marketplace
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              <NavLink href="/" icon={<Home className="w-4 h-4" />} text="Home" />
              <NavLink
                  href="/pages/about"
                  icon={<Info className="w-4 h-4" />}
                  text="About"
              />
              <NavLink
                  href="/pages/contact"
                  icon={<MessageCircle className="w-4 h-4" />}
                  text="Contact"
              />

              {isAuthenticated ? (
                  <>
                    <NavLink
                        href="/pages/profile"
                        icon={<User className="w-4 h-4" />}
                        text="Profile"
                    />
                    <NavButton
                        href="/pages/logout"
                        icon={<LogOut className="w-4 h-4" />}
                        text="Logout"
                        variant="secondary"
                    />
                  </>
              ) : (
                  <NavButton
                      href="/auth/login"
                      icon={<LogIn className="w-4 h-4" />}
                      text="Login"
                      variant="primary"
                  />
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 rounded-xl bg-gray-800/50 border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              >
                {isOpen ? (
                    <X className="w-5 h-5" />
                ) : (
                    <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 shadow-2xl">
              <div className="px-4 py-3 space-y-1">
                <MobileNavLink
                    href="/"
                    icon={<Home className="w-4 h-4" />}
                    text="Home"
                    onClick={() => setIsOpen(false)}
                />
                <MobileNavLink
                    href="/pages/about"
                    icon={<Info className="w-4 h-4" />}
                    text="About"
                    onClick={() => setIsOpen(false)}
                />
                <MobileNavLink
                    href="/pages/contact"
                    icon={<MessageCircle className="w-4 h-4" />}
                    text="Contact"
                    onClick={() => setIsOpen(false)}
                />

                {isAuthenticated ? (
                    <>
                      <MobileNavLink
                          href="/pages/profile"
                          icon={<User className="w-4 h-4" />}
                          text="Profile"
                          onClick={() => setIsOpen(false)}
                      />
                      <MobileNavLink
                          href="/pages/logout"
                          icon={<LogOut className="w-4 h-4" />}
                          text="Logout"
                          onClick={() => setIsOpen(false)}
                          variant="secondary"
                      />
                    </>
                ) : (
                    <MobileNavLink
                        href="/auth/login"
                        icon={<LogIn className="w-4 h-4" />}
                        text="Login"
                        onClick={() => setIsOpen(false)}
                        variant="primary"
                    />
                )}
              </div>
            </div>
        )}
      </nav>
  );
};

// Desktop Navigation Link Component
const NavLink = ({
                   href,
                   icon,
                   text,
                 }: {
  href: string;
  icon: React.ReactNode;
  text: string;
}) => (
    <Link href={href}>
      <div className="flex items-center px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 group cursor-pointer">
      <span className="text-gray-400 group-hover:text-cyan-400 transition-colors mr-2">
        {icon}
      </span>
        <span className="font-medium">{text}</span>
      </div>
    </Link>
);

// Desktop Navigation Button Component
const NavButton = ({
                     href,
                     icon,
                     text,
                     variant = "primary",
                   }: {
  href: string;
  icon: React.ReactNode;
  text: string;
  variant?: "primary" | "secondary";
}) => {
  const baseClasses =
      "flex items-center px-4 py-2 rounded-xl font-semibold transition-all duration-300 cursor-pointer group";
  const primaryClasses =
      "bg-gradient-to-r from-cyan-500 to-emerald-600 text-white hover:from-cyan-600 hover:to-emerald-700 hover:scale-105 shadow-lg hover:shadow-xl";
  const secondaryClasses =
      "bg-gray-800/50 border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700/50 hover:border-gray-600";

  return (
      <Link href={href}>
        <div
            className={`${baseClasses} ${
                variant === "primary" ? primaryClasses : secondaryClasses
            }`}
        >
        <span
            className={`mr-2 ${
                variant === "primary"
                    ? "text-white"
                    : "text-gray-400 group-hover:text-emerald-400"
            } transition-colors`}
        >
          {icon}
        </span>
          <span>{text}</span>
          {variant === "primary" && (
              <Sparkles className="w-3 h-3 ml-2 text-yellow-300 animate-pulse" />
          )}
        </div>
      </Link>
  );
};

// Mobile Navigation Link Component
const MobileNavLink = ({
                         href,
                         icon,
                         text,
                         onClick,
                         variant = "default",
                       }: {
  href: string;
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
  variant?: "default" | "primary" | "secondary";
}) => {
  const baseClasses =
      "flex items-center w-full px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer group";
  const defaultClasses = "text-gray-300 hover:text-white hover:bg-gray-800/50";
  const primaryClasses =
      "bg-gradient-to-r from-cyan-500 to-emerald-600 text-white hover:from-cyan-600 hover:to-emerald-700 shadow-lg";
  const secondaryClasses =
      "bg-gray-800/50 border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700/50";

  const getClasses = () => {
    switch (variant) {
      case "primary":
        return `${baseClasses} ${primaryClasses}`;
      case "secondary":
        return `${baseClasses} ${secondaryClasses}`;
      default:
        return `${baseClasses} ${defaultClasses}`;
    }
  };

  return (
      <Link href={href}>
        <div className={getClasses()} onClick={onClick}>
        <span
            className={`mr-3 transition-colors ${
                variant === "primary"
                    ? "text-white"
                    : variant === "secondary"
                        ? "text-gray-400 group-hover:text-emerald-400"
                        : "text-gray-400 group-hover:text-cyan-400"
            }`}
        >
          {icon}
        </span>
          <span className="font-medium">{text}</span>
          {variant === "primary" && (
              <Sparkles className="w-3 h-3 ml-auto text-yellow-300 animate-pulse" />
          )}
        </div>
      </Link>
  );
};

export default Navbar;