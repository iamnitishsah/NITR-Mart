'use client';
import React from 'react';
import { 
  Users, 
  Mail, 
  Phone, 
  MapPin,  
  Heart,
  ExternalLink,
  BookOpen,
  Laptop,
  Coffee,
  Gamepad2,
  Shield,
  HelpCircle,
  FileText,
  Zap
} from 'lucide-react';
import { RiTwitterXFill,RiInstagramLine,RiLinkedinFill,RiGithubLine } from "react-icons/ri";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: Users },
    { name: 'Sell Item', href: '/pages/sell', icon: Zap },
    { name: 'Browse Products', href: '/products', icon: BookOpen },
    { name: 'My Account', href: '/profile', icon: Users },
  ];

  const categories = [
    { name: 'Books & Notes', href: '/category/textbooks', icon: BookOpen },
    { name: 'Electronics & Tech', href: '/category/electronics', icon: Laptop },
    { name: 'Furniture', href: '/category/furniture', icon: Coffee },
    { name: 'Gaming & Entertainment', href: '/category/gaming', icon: Gamepad2 },
  ];

  const support = [
    { name: 'Help Center', href: '/help', icon: HelpCircle },
    { name: 'Safety Guidelines', href: '/safety', icon: Shield },
    { name: 'Terms of Service', href: '/terms', icon: FileText },
    { name: 'Privacy Policy', href: '/privacy', icon: Shield },
  ];

  const socialLinks = [
    {
      name: 'Github',
      href: 'https://github.com/iamnitishsah',
      icon: RiGithubLine,
      color: 'hover:text-gray-300'
    },
    {
      name: 'Twitter',
      href: 'https://x.com/nitishadow_?t=F4iYnXvQIkJQbHfacRxZIQ&s=08',
      icon: RiTwitterXFill,
      color: 'hover:text-black'
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/nitishadow_/',
      icon: RiInstagramLine,
      color: 'hover:text-pink-400'
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/iamnitishsah',
      icon: RiLinkedinFill,
      color: 'hover:text-sky-500'
    },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black border-t border-gray-700/50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Floating Accent Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/4 w-20 h-20 bg-cyan-500/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-1/3 w-16 h-16 bg-emerald-500/5 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-purple-500/5 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="bg-gray-900/30 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <div className="flex items-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-b from-cyan-400 to-emerald-600 rounded-xl mr-4 shadow-lg">
                    <img
                        src="/logo.png"
                        alt="NITR Mart Logo"
                        className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-black bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                      NITR Mart
                    </h3>
                    <p className="text-gray-400 text-sm">Campus Marketplace</p>
                  </div>
                </div>
                
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Your trusted campus marketplace connecting students at NIT Rourkela. 
                  Buy, sell, and exchange items safely within your college community.
                </p>
                
                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center text-gray-400">
                    <MapPin className="w-4 h-4 mr-3 text-cyan-400" />
                    <span className="text-sm">NIT Rourkela, Odisha, India</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Mail className="w-4 h-4 mr-3 text-emerald-400" />
                    <span className="text-sm">nitrmart2027@gmail.com</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Phone className="w-4 h-4 mr-3 text-purple-400" />
                    <span className="text-sm">+91 8862887291</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-white font-bold text-lg mb-6 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                  Quick Links
                </h4>
                <ul className="space-y-3">
                  {quickLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="flex items-center text-gray-400 hover:text-white transition-colors duration-300 group"
                        >
                          <IconComponent className="w-4 h-4 mr-3 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                          {link.name}
                          <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-white font-bold text-lg mb-6 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-blue-400" />
                  Categories
                </h4>
                <ul className="space-y-3">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <li key={category.name}>
                        <a
                          href={category.href}
                          className="flex items-center text-gray-400 hover:text-white transition-colors duration-300 group"
                        >
                          <IconComponent className="w-4 h-4 mr-3 text-gray-500 group-hover:text-emerald-400 transition-colors" />
                          {category.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="text-white font-bold text-lg mb-6 flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2 text-green-400" />
                  Support
                </h4>
                <ul className="space-y-3">
                  {support.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="flex items-center text-gray-400 hover:text-white transition-colors duration-300 group"
                        >
                          <IconComponent className="w-4 h-4 mr-3 text-gray-500 group-hover:text-purple-400 transition-colors" />
                          {item.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gray-900/50 backdrop-blur-xl border-t border-gray-700/30">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="text-center lg:text-left mb-6 lg:mb-0">
                <h4 className="text-xl font-bold text-white mb-2">Stay Updated</h4>
                <p className="text-gray-400">Get notified about new listings and campus marketplace updates</p>
              </div>
              
              <div className="flex flex-col sm:flex-row w-full lg:w-auto max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-l-xl sm:rounded-r-none rounded-r-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300"
                />
                <button  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-600 text-white font-semibold rounded-r-xl sm:rounded-l-none rounded-l-xl hover:from-cyan-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-gray-900/70 backdrop-blur-xl border-t border-gray-700/30">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              
              {/* Copyright */}
              <div className="flex items-center text-gray-400 text-sm mb-4 md:mb-0">
                <span>© {currentYear} NITR Mart. Made with</span>
                <Heart className="w-4 h-4 mx-2 text-red-500 fill-current animate-pulse" />
                <span>for NIT Rourkela students</span>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-400 text-sm mr-2">Follow us:</span>
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className={`w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 transform hover:scale-110 hover:shadow-lg`}
                      aria-label={social.name}
                    >
                      <IconComponent className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Trust & Security Banner */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border-t border-cyan-500/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-center">
              <Shield className="w-5 h-5 text-cyan-400 mr-3" />
              <span className="text-cyan-300 text-sm font-medium">
                Secure • Trusted • Student-Verified • Campus-Safe
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;