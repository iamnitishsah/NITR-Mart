'use client'
import React, { useState, useEffect } from 'react';

import {   ShoppingBag, 
  Users, 
  Recycle, 
  Heart, 
  Star, 
  ArrowRight, 
  CheckCircle, 
  BookOpen, 
  Laptop, 
  Home, 
  Bike, 
  Gift,
  MessageCircle,
  Shield,
  Zap,
  Sparkles,
  Play,
  Mail
} from 'lucide-react';

interface Product {
    id: string;
    title: string;
    description: string;
    negotiable: boolean;
    image: string;
    category: string;
    is_sold: boolean;
    created_at: string;
    updated_at: string;
}

const WelcomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});

  // Mock data for demonstration
  const mockProducts = [
    {
      id: '1',
      title: 'Engineering Textbooks',
      description: 'Engineering books in excellent condition',
      negotiable: true,
      image: 'https://a2zbookhub.in/wp-content/uploads/2024/03/Object-Oriented-Programming-with-C-By-Thareja.jpg',
      category: 'books',
      is_sold: false,
      created_at: '2025-01-01',
      updated_at: '2025-01-01'
    },
    {
      id: '2',
      title: 'Symphony Cooler',
      description: 'High-performance cooling solution for summer',
      negotiable: true,
      image: 'https://kaydeeelectronics.in/cdn/shop/files/untitled-design-38-676e816dae24b.webp?v=1735295362&width=1946',
      category: 'electronics',
      is_sold: false,
      created_at: '2025-01-01',
      updated_at: '2025-01-01'
    },
    {
      id: '3',
      title: 'Bicycle for Sale',
      description: 'Gently used bicycle in great condition, perfect for campus commuting',
      negotiable: true,
      image: 'https://rforrabbit.com/cdn/shop/files/RforRabbitCruizeBicycleforKids16inchOliveGreen_1.jpg?v=1721307165',
      category: 'vehicles',
      is_sold: false,
      created_at: '2024-01-01',
      updated_at: '2024-01-01'
    },
    {
        id: '4',
        title: 'Cabinate',
        description: 'Stylish and detachable cabinet for sale, perfect for hostel or office use',
        negotiable: true,
        image: 'https://www.nilkamalfurniture.com/cdn/shop/products/FMDR1CWBNBSTWBN_01.jpg?v=1636442511&width=1080',
        category: 'furniture',
        is_sold: false,
        created_at: '2024-01-01',
        updated_at: '2024-01-01'
      },
      {
        id: '5',
        title: 'Games',
        description: 'Popular games for sale, great condition, perfect for gaming enthusiasts',
        negotiable: true,
        image: 'https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHx8',
        category: 'gaming',
        is_sold: false,
        created_at: '2024-01-01',
        updated_at: '2024-01-01'
      },
        {
            id: '6',
            title: 'Miscellaneous Items',
            description: 'Various items for sale, check them out!',
            negotiable: true,
            image: 'https://www.rasoishop.com/cdn/shop/files/8901309227735-9.jpg?v=1701447072',
            category: 'miscellaneous',
            is_sold: false,
            created_at: '2024-01-01',
            updated_at: '2024-01-01'
        }
  ];

  useEffect(() => {
    setProducts(mockProducts);
    setLoading(false);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const getProductsByCategory = (categoryKey: string) => {
    return products.filter((product) => product.category === categoryKey).slice(0, 3);
  };

  const navigation = (path: string) => {
    console.log(`Navigate to: ${path}`);
  };

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Student Community",
      description: "Connect with fellow NITians from all departments and years",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Verified Users",
      description: "All users verified with @nitrkl.ac.in email addresses",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: <Recycle className="w-8 h-8" />,
      title: "Sustainable Living",
      description: "Give items a second life and reduce campus waste",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Quick Transactions",
      description: "Fast and easy buying/selling with instant messaging",
      gradient: "from-yellow-500 to-orange-600"
    }
  ];

  const categories = [
    { key: "books", icon: <BookOpen className="w-12 h-12 text-white" />, name: "Books & Notes", gradient: "from-cyan-500 to-blue-600" },
    { key: "electronics", icon: <Laptop className="w-12 h-12 text-white" />, name: "Electronics", gradient: "from-purple-500 to-purple-600" },
    { key: "vehicles", icon: <Bike className="w-12 h-12 text-white" />, name: "Vehicles", gradient: "from-red-500 to-red-600" },
    { key: "furniture", icon: <Home className="w-12 h-12 text-white" />, name: "Furniture", gradient: "from-green-500 to-green-600" },
    { key: "gaming", icon: <Star className="w-12 h-12 text-white" />, name: "Gaming", gradient: "from-yellow-500 to-yellow-600" },
    { key: "miscellaneous", icon: <Gift className="w-12 h-12 text-white" />, name: "Miscellaneous", gradient: "from-pink-500 to-pink-600" }
  ];

  // Generate random stars
  const generateStars = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      animationDelay: Math.random() * 2
    }));
  };

  const stars = generateStars(150);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden relative">
      
      {/* Animated Stars Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.animationDelay}s`,
              transform: `translateY(${scrollY * 0.1}px)`
            }}
          />
        ))}
      </div>

      {/* Parallax Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.3}px) rotate(${scrollY * 0.1}deg)` }}
        ></div>
        <div 
          className="absolute top-1/3 right-1/4 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl animate-pulse" 
          style={{ 
            animationDelay: '1s',
            transform: `translateY(${-scrollY * 0.2}px) rotate(${-scrollY * 0.05}deg)`
          }}
        ></div>
        <div 
          className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" 
          style={{ 
            animationDelay: '2s',
            transform: `translateY(${scrollY * 0.15}px) rotate(${scrollY * 0.08}deg)`
          }}
        ></div>
        <div 
          className="absolute bottom-1/3 right-1/3 w-56 h-56 bg-orange-500/10 rounded-full blur-2xl animate-pulse" 
          style={{ 
            animationDelay: '3s',
            transform: `translateY(${-scrollY * 0.25}px) rotate(${-scrollY * 0.12}deg)`
          }}
        ></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 px-4" data-section id="hero">
        <div className="pt-5 max-w-7xl mx-auto text-center">

          {/* Main Heading with Custom Font */}
          <h1 className={`text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-cyan-200 to-emerald-300 bg-clip-text text-transparent transition-all duration-1000 ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} 
              style={{ fontFamily: 'Georgia, serif', letterSpacing: '2px' }}>
            NITR Mart
          </h1>
          
          <p className={`text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} 
             style={{ fontFamily: 'Playfair Display, serif' }}>
            Where Students Connect, Trade & Thrive
          </p>
          
          <p className={`text-lg text-gray-400 mb-12 max-w-2xl mx-auto transition-all duration-1000 delay-500 ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            The sustainable marketplace built by NITians, for NITians. Buy, sell, and discover amazing deals while building lasting connections in our trusted community.
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-1000 delay-700 ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <button onClick={() => navigation('/auth/login')} className="bg-gradient-to-r from-cyan-500 to-emerald-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-cyan-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center group">
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-gray-800/50 border-2 border-gray-600 text-gray-300 font-semibold py-4 px-8 rounded-xl hover:bg-gray-700/50 hover:border-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-500/20 transition-all duration-300 flex items-center justify-center group">
              <Play className="w-5 h-5 mr-2 text-emerald-400" />
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className=" px-4 relative z-10" data-section id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent transition-all duration-1000 ${isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '1px' }}>
               Why Choose NITR Mart?
            </h2>
            <p className={`text-xl text-gray-400 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              We're more than just a marketplace - we're a community that believes in sustainable living and student connections.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className={`group transition-all duration-1000 ${isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: `${index * 200}ms` }}>
                <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-300 transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gray-900/20 relative z-10" data-section id="how-it-works">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent transition-all duration-1000 ${isVisible['how-it-works'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '2px' }}>
              🚀 How It Works 🚀
            </h2>
            <p className={`text-xl text-gray-400 transition-all duration-1000 delay-300 ${isVisible['how-it-works'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              Getting started is simple - join our community in 3 easy steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Sign Up & Verify",
                description: "Create your account using your @nitrkl.ac.in email address. We verify all users to ensure a safe community.",
                icon: <Shield className="w-8 h-8" />
              },
              {
                step: "02", 
                title: "Browse & Connect",
                description: "Explore categories, find what you need, or list items you want to sell. Chat directly with other students.",
                icon: <MessageCircle className="w-8 h-8" />
              },
              {
                step: "03",
                title: "Trade & Thrive",
                description: "Complete secure transactions, meet in safe campus locations, and build lasting connections with fellow NITians.",
                icon: <Heart className="w-8 h-8" />
              }
            ].map((step, index) => (
              <div key={index} className={`text-center group transition-all duration-1000 ${isVisible['how-it-works'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: `${index * 300}ms` }}>
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-emerald-600 rounded-full flex items-center justify-center text-white mx-auto group-hover:scale-110 transition-transform duration-300 group-hover:shadow-2xl group-hover:shadow-cyan-500/30">
                    {step.icon}
                  </div>
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold animate-pulse">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-300 transition-colors" style={{ fontFamily: 'Raleway, sans-serif' }}>
                  {step.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors max-w-sm mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 relative z-10" data-section id="categories">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent transition-all duration-1000 ${isVisible.categories ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '3px' }}>
               POPULAR CATEGORIES
            </h2>
            <p className={`text-xl text-gray-400 transition-all duration-1000 delay-300 ${isVisible.categories ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              Discover items across multiple categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div key={index} className={`group transition-all duration-1000 ${isVisible.categories ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: `${index * 150}ms` }}>
                <div className="bg-gray-900/40 backdrop-blur-xl border hover:border-cyan-500/50 border-gray-700/50 rounded-2xl p-6 text-center hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105">
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                  <h3 className="font-bold text-white mb-4 text-lg" style={{ fontFamily: 'Nunito, sans-serif' }}>{category.name}</h3>
                  <div className="space-y-4">
                    {getProductsByCategory(category.key).map((product) => (
                      <div
                        key={product.id}
                        className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:shadow-cyan-500/20 hover:scale-105"
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-32 object-cover rounded-md mb-2"
                        />
                        <h4 className="text-lg font-semibold text-white">
                          {product.title}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {product.description.slice(0, 50)}...
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 relative z-10" data-section id="cta">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-3xl border border-cyan-500/20 p-12 md:p-16 transition-all duration-1000 ${isVisible.cta ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}>
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '4px' }}>
              🎯 READY TO JOIN NITR MART? 🎯
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of NITR students who are already buying, selling, and connecting on our platform. Start your sustainable trading journey today!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-gradient-to-r from-cyan-500 to-emerald-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-cyan-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-cyan-500/30 transform hover:scale-105 flex items-center justify-center group">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Start Selling Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-gray-800/50 border-2 border-gray-600 text-gray-300 font-semibold py-4 px-8 rounded-xl hover:bg-gray-700/50 hover:border-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-500/20 transition-all duration-300 flex items-center justify-center hover:shadow-xl hover:shadow-purple-500/20 hover:scale-105">
                <Users className="w-5 h-5 mr-2 text-cyan-400" />
                Browse Items
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="bg-gradient-to-r from-cyan-500 to-emerald-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 animate-bounce hover:scale-110">
          <Star className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;