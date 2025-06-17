"use client";

import Login from "@/app/auth/login/page";
import {
  Bike,
  BookOpen,
  Boxes,
  Coffee,
  Dumbbell,
  FlaskConical,
  Grid,
  Laptop,
  LogOut,
  Paintbrush,
  Plus,
  Search,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  rollNo?: string;
  branch?: string;
}

interface Seller {
  name: string;
  roll_number: string;
  email: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  negotiable: boolean;
  image?: string;
  category: string;
  seller: Seller;
  is_sold: boolean;
  posted_at: string;
}

const Dashboard = () => {
  const [stars, setStars] = useState<
    {
      id: number;
      x: number;
      y: number;
      size: number;
      opacity: number;
      animationDelay: number;
    }[]
  >([]);
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Updated categories to match backend
  const categories = [
    {
      value: "all",
      label: "All Items",
      icon: Grid,
      color: "from-gray-500 to-gray-600",
    },
    {
      value: "Electronics",
      label: "Electronics",
      icon: Laptop,
      color: "from-purple-500 to-purple-600",
    },
    {
      value: "Books & Study Materials",
      label: "Books & Study",
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
    },
    {
      value: "Hostel Essentials",
      label: "Hostel Essentials",
      icon: Coffee,
      color: "from-yellow-500 to-yellow-600",
    },
    {
      value: "Furniture",
      label: "Furniture",
      icon: Coffee,
      color: "from-green-500 to-green-600",
    },
    {
      value: "Sports & Fitness",
      label: "Sports & Fitness",
      icon: Dumbbell,
      color: "from-red-500 to-red-600",
    },
    {
      value: "Cycle & Transport",
      label: "Cycle & Transport",
      icon: Bike,
      color: "from-pink-500 to-pink-600",
    },
    {
      value: "Room Decor",
      label: "Room Decor",
      icon: Paintbrush,
      color: "from-indigo-500 to-indigo-600",
    },
    {
      value: "Lab Equipment",
      label: "Lab Equipment",
      icon: FlaskConical,
      color: "from-teal-500 to-teal-600",
    },
    {
      value: "Others",
      label: "Others",
      icon: Boxes,
      color: "from-gray-400 to-gray-500",
    },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      try {
        const res = await fetch("https://nitr-mart.onrender.com/users/me/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUser({
            email: data.email,
            firstName: data.first_name,
            lastName: data.last_name,
            rollNo: data.roll_no,
            branch: data.branch,
          });
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    fetchUser();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://nitr-mart.onrender.com/products/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProducts();
    }
  }, [user]);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setUser(null);
    router.push("/pages/welcome");
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) {
      return "Just now";
    }
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    }
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  // Generate random stars
  useEffect(() => {
    const generateStars = (count: number) => {
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        animationDelay: Math.random() * 2,
      }));
    };

    setStars(generateStars(150));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative">
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
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-pulse" />
        <div
          className="absolute top-60 right-20 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-32 left-1/4 w-20 h-20 bg-green-500/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-20 right-1/3 w-28 h-28 bg-pink-500/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {user ? (
          <>
            <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
              <div className="flex items-center space-x-4 mb-6 lg:mb-0">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-b from-cyan-400 to-emerald-600 rounded-2xl shadow-2xl">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-serif font-black bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                    NITR Mart
                  </h1>
                  <p className="text-gray-400">Campus Marketplace</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 px-4 py-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-emerald-600 rounded-xl flex items-center justify-center">
                    <span className="text-sm font-bold text-white">
                      {user.firstName.charAt(0)}
                      {user.lastName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-gray-400 text-xs">{user.rollNo}</p>
                  </div>
                </div>

                <button
                  onClick={() => router.push("/pages/sell")}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Sell Item
                </button>

                <button
                  onClick={handleLogout}
                  className="p-3 bg-gray-700/80 hover:bg-red-600/80 text-white rounded-xl transition-all duration-300"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-xl rounded-2xl border border-blue-500/30 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm font-medium">
                      Total Products
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {products.length}
                    </p>
                  </div>
                  <ShoppingBag className="w-8 h-8 text-blue-400" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-xl rounded-2xl border border-emerald-500/30 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-200 text-sm font-medium">
                      Available
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {products.filter((p) => !p.is_sold).length}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-emerald-400" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-200 text-sm font-medium">
                      Categories
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {categories.length - 1}
                    </p>
                  </div>
                  <Grid className="w-8 h-8 text-purple-400" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-xl rounded-2xl border border-yellow-500/30 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-200 text-sm font-medium">
                      Active Sellers
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {new Set(products.map((p) => p.seller)).size}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-yellow-400" />
                </div>
              </div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl mb-8 p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
              <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-2 mt-6">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                        selectedCategory === category.value
                          ? "border border-cyan-500 bg-cyan-950 text-white shadow-cyan-500/50 shadow-md"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600"
                      }`}
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      {category.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {selectedCategory === "all"
                    ? "All Products"
                    : categories.find((c) => c.value === selectedCategory)
                        ?.label}
                  <span className="text-cyan-400 text-xl ml-3 font-medium">
                    ({filteredProducts.length})
                  </span>
                </h2>
              </div>
              {loading ? (
                <div className="flex justify-center items-center py-24">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-14 w-14 border-4 border-cyan-500/20 border-t-cyan-500"></div>
                    <div className="absolute inset-0 animate-ping rounded-full h-14 w-14 border-4 border-cyan-500/10"></div>
                  </div>
                </div>
              ) : (
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="group relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden transition-all duration-300 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500 transform hover:scale-[1.01] flex flex-col h-[420px]"
                      >
                        <div className="relative w-full h-96 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800" />
                          {product.image ? (
                            <Image
                              src={product.image}
                              alt={product.title}
                              unoptimized
                              fill
                              className="relative z-10 w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
                            />
                          ) : (
                            <div className="relative z-10 w-full h-full flex items-center justify-center">
                              <div className="p-4 rounded-full bg-gray-600/30 backdrop-blur-sm">
                                <Boxes className="w-12 h-12 text-gray-400" />
                              </div>
                            </div>
                          )}
                          <div className="absolute top-3 right-3 z-20">
                            <div className="bg-gradient-to-l from-cyan-500 to-green-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm">
                              <span className="text-xs">₹</span>
                              {product.price.toLocaleString()}
                            </div>
                          </div>

                          {product.negotiable && (
                            <div className="absolute top-3 left-3 z-20">
                              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-2.5 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm ">
                                Negotiable
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="relative z-10 p-5 flex flex-col flex-1">
                          <div className="mb-3">
                            <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300">
                              {product.title}
                            </h3>
                            <div className="inline-flex items-center px-2.5 py-1 rounded-lg bg-gradient-to-r from-gray-700/50 to-gray-600/50 backdrop-blur-sm border border-gray-600/30">
                              <span className="text-xs font-medium text-gray-300">
                                {product.category}
                              </span>
                            </div>
                          </div>
                          <div className="flex-1 mb-4">
                            <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                              {product.description}
                            </p>
                          </div>
                          <div className="space-y-4 mt-auto">

                            <div className="flex items-center space-x-3">
                              <div className="relative">
                                <div className="w-10 h-10 bg-gradient-to-tl from-emerald-500 via-cyan-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                                  <span className="text-sm font-bold text-white">
                                    {product.seller?.name?.charAt(0).toUpperCase() || "?"}
                                  </span>
                                </div>
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-emerald-500 rounded-full opacity-30 group-hover:opacity-70 transition-opacity duration-300 blur-sm" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-white text-sm font-semibold truncate">
                                  {product.seller?.name || "Unknown Seller"}
                                </p>
                                <p className="text-gray-400 text-xs truncate">
                                  Roll No: {product.seller?.roll_number || "N/A"}
                                </p>
                                <p className="text-gray-400 text-xs">
                                  {formatTimeAgo(product.posted_at)}
                                </p>
                              </div>
                            </div>

                            <button className="w-full relative overflow-hidden bg-gradient-to-r from-cyan-500 to-emerald-600 hover:from-cyan-600 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] group/btn">
                              <span className="relative z-10 text-sm">
                                Contact Seller
                              </span>
                              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-24">
                      <div className="relative max-w-md mx-auto">
                        <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-3xl p-12 border border-gray-700/50 shadow-2xl">
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-emerald-500/5 rounded-3xl animate-pulse" />
                          <div className="relative z-10">
                            <div className="relative mb-8">
                              <Boxes className="w-20 h-20 text-gray-500 mx-auto" />
                              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-full blur-xl animate-pulse" />
                            </div>

                            <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-3">
                              No products found
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                              Try adjusting your search or filters to discover
                              amazing products
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
