import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
    return (
      <footer className="bg-cyan-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Logo and Copyright */}
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <img
                  src="/logo.png" // Replace with the path to your logo
                  alt="Logo"
                  className="h-8 w-8 mr-2"
                />
                <span className="text-lg font-bold font-serif">Connection</span>
              </div>
              <p className="text-sm mt-2">&copy; 2025 Connection. All rights reserved.</p>
            </div>
  
            {/* Navigation Links */}
            <div className="flex space-x-6">
              <a href="/" className="hover:text-cyan-300">
                Home
              </a>
              <a href="/about" className="hover:text-cyan-300">
                About
              </a>
              <a href="/contact" className="hover:text-cyan-300">
                Contact
              </a>
              <a href="/privacy" className="hover:text-cyan-300">
                Privacy Policy
              </a>
            </div>
  
            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-300"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-300"
              >
                <FaXTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-300"
              >
                <FaInstagramSquare />
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;