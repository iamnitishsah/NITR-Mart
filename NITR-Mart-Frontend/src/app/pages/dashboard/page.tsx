"use client";
import {
  Bike,
  BookOpen,
  Boxes,
  CheckCircle,
  Coffee,
  Dumbbell,
  Edit3,
  FlaskConical,
  Grid,
  Laptop,
  LogOut,
  Menu,
  Paintbrush,
  Plus,
  Search,
  ShoppingBag,
  Tag,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { FaWhatsapp } from 'react-icons/fa';
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";


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
  wp_number: string;
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // const [formData, setFormData] = useState<{
  //   title: string;
  //   description: string;
  //   price: string;
  //   negotiable: boolean;
  //   image: File | null;
  //   category: string;
  //   is_sold: boolean;
  // }>({
  //   title: "",
  //   description: "",
  //   price: "",
  //   negotiable: false,
  //   image: null,
  //   category: "Others",
  //   is_sold: false,
  // });

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
      setUserLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setUserLoading(false);
        router.push("/pages/welcome");
        return;
      }

      try {
        const res = await fetch("https://nitr-mart-production.up.railway.app/users/me/", {
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
        } else {
          router.push("/pages/welcome");
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
        router.push("/pages/welcome");
      } finally {
        setUserLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://nitr-mart-production.up.railway.app/products/", {
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

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter out sold products - this is the key change
    filtered = filtered.filter((product) => !product.is_sold);

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

    return filtered;
  }, [products, selectedCategory, searchTerm]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setUser(null);
    router.push("/pages/welcome");
  };

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

  // // New function to delete product
  // const deleteProduct = async (productId: number) => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     alert("You must be logged in to delete a product.");
  //     return;
  //   }
  //   try {
  //     const res = await fetch(
  //       `https://nitr-mart-production.up.railway.app/products/${productId}/delete/`,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     if (res.status === 204) {
  //       setProducts((prevProducts) =>
  //         prevProducts.filter((p) => p.id !== productId)
  //       );
  //     } else {
  //       const contentType = res.headers.get("Content-Type");
  //       if (contentType && contentType.includes("application/json")) {
  //         const data = await res.json();
  //         alert(data.detail || "Failed to delete product.");
  //       } else {
  //         const text = await res.text();
  //         console.error("Unexpected response:", text);
  //         alert("Failed to delete product. Please check the server logs.");
  //       }
  //     }
  //   } catch (err) {
  //     console.error("Failed to delete product", err);
  //     alert("Failed to delete product.");
  //   }
  // };


  const markProductAsSold = async (productId: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to mark a product as sold.");
      return;
    }

    const confirmMarkSold = window.confirm(
        "Are you sure you want to mark this item as sold?"
    );
    if (!confirmMarkSold) return;

    try {
      const res = await fetch(
          `https://nitr-mart-production.up.railway.app/products/${productId}/`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ is_sold: true }),
          }
      );

      if (res.ok) {
        alert("Product marked as sold.");
      } else {
        const error = await res.text();
        alert("Failed to mark as sold: " + error);
      }
    } catch (err) {
      console.error("Error marking product as sold:", err);
      alert("Failed to mark product as sold.");
    }
  };

  const handleContactClick = (seller: Seller, itemTitle: string) => {
    const phone = seller.wp_number.replace(/\D/g, "");
    const message = encodeURIComponent(
      `Hi ${seller.name}, I came across your listing for "${itemTitle}" on NITR-Mart. I'm interested and would like to connect with you regarding the item.`
    );
    const whatsappURL = `https://wa.me/91${phone}?text=${message}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative">

      {userLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-500/20 border-t-cyan-500" />
          </div>
      )}


      {/* Background Stars */}
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

      {/* Background Blurs */}
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

      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-gray-900/80 border-b border-gray-700/50 py-3">
          <div className="px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-emerald-600 rounded-xl flex items-center justify-center">
                  <img
                      src="/logo.png"
                      alt="NITR Mart Logo"
                      className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-serif font-black bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                    NITR Mart
                  </h1>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-6">
                  <button
                    onClick={() => router.push("/pages/sell")}
                    className="flex items-center px-6 py-3 bg-black text-green-400 rounded-none font-mono text-sm border-2 border-green-400 hover:bg-green-400 hover:text-black transition-all duration-300 shadow-md shadow-green-400/50 hover:shadow-green-400/80"
                  >
                    <Plus className="w-5 h-5 mr-3" />
                    SELL ITEM
                  </button>

                  <Link href="/pages/profile/" className="block">
                    <div className="flex items-center space-x-4 bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl px-5 py-2 border border-cyan-500/50 shadow-xl shadow-cyan-500/20 hover:ring-2 hover:ring-cyan-400/40 transition duration-200 cursor-pointer">
                      <div className="relative w-12 h-12 bg-gradient-to-tr from-cyan-400 to-green-600 rounded-lg flex items-center justify-center border border-cyan-300/60 shadow-lg shadow-cyan-400/40">
                          <span className="text-sm font-bold text-white z-10">
                            {user?.firstName?.charAt(0) || ""}
                            {user?.lastName?.charAt(0) || ""}
                          </span>
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 to-blue-600/20 rounded-lg animate-ping"></div>
                      </div>
                      <div className="hidden sm:block">
                        <p className="text-cyan-300 text-sm font-semibold tracking-wide">
                          {user?.firstName || ""} {user?.lastName || ""}
                        </p>
                        <p className="text-blue-400 text-xs font-mono tracking-wider">
                          Roll No: {user?.rollNo || ""}
                        </p>
                        <button
                            className="mt-1 text-xs text-cyan-200 hover:text-white underline underline-offset-4"
                        >
                          View/Edit
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>

                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-white hover:bg-red-600 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-400 hover:text-white"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-gray-900/95 backdrop-blur-xl border-t border-gray-700/50">
              <div className="px-4 py-4 space-y-3">
                <Link href="/pages/profile/" className="block">
                  <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg hover:ring-2 hover:ring-cyan-400/40 transition duration-200 cursor-pointer">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-emerald-600 rounded-lg flex items-center justify-center">
      <span className="text-sm font-bold text-white">
        {user?.firstName?.charAt(0) || ""}
        {user?.lastName?.charAt(0) || ""}
      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {user?.firstName || ""} {user?.lastName || ""}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {user?.rollNo || ""}
                      </p>
                      <button className="text-xs text-cyan-300 mt-1 underline underline-offset-4 hover:text-white">
                        View/Edit
                      </button>
                    </div>
                  </div>
                </Link>


                <button
                  onClick={() => {
                    router.push("/pages/sell");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center px-4 py-3 bg-gradient-to-r from-cyan-500 to-emerald-600 text-white rounded-lg font-medium"
                >
                  <Plus className="w-5 h-5 mr-3" />
                  Sell Item
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 text-gray-300 hover:bg-red-600 rounded-lg"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="px-4 py-6 ">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between ">
                <div>
                  <p className="text-gray-400 text-sm">Total Products</p>
                  <p className="text-2xl font-bold text-white">
                    {products.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Available</p>
                  <p className="text-2xl font-bold text-white">
                    {products.filter((p) => !p.is_sold).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Categories</p>
                  <p className="text-2xl font-bold text-white">
                    {categories.length - 1}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Grid className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Sellers</p>
                  <p className="text-2xl font-bold text-white">
                    {new Set(products.map((p) => p.seller.email)).size}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search Bar */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search products, descriptions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Category Filters */}
            <div className="mt-6">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  // Update category count to only show available products
                  const categoryCount =
                    category.value === "all"
                      ? products.filter((p) => !p.is_sold).length
                      : products.filter(
                          (p) => p.category === category.value && !p.is_sold
                        ).length;

                  return (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedCategory === category.value
                          ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25"
                          : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                      }`}
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      {category.label}
                      {category.value !== "all" && (
                        <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                          {categoryCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="pb-20 px-4 md:px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white tracking-tight">
                {selectedCategory === "all"
                  ? "Available Products"
                  : categories.find((c) => c.value === selectedCategory)?.label}
                <span className="text-cyan-400 text-lg ml-2 font-medium">
                  ({filteredProducts.length})
                </span>
              </h2>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-32">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-500/20 border-t-cyan-500" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="group flex flex-col bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden hover:shadow-lg hover:border-cyan-500/50 transition-all duration-300"
                    >
                      {/* Image */}
                      <div className="relative h-48 bg-gray-800/50 overflow-hidden">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.title}
                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Boxes className="w-12 h-12 text-gray-500" />
                          </div>
                        )}

                        {/* Price Badge */}
                        <div className="absolute top-3 right-3 text-sm font-bold text-white px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-600 shadow-md">
                          ₹{product.price.toLocaleString()}
                        </div>

                        {/* Negotiable */}
                        {product.negotiable && (
                          <div className="absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-full bg-yellow-500 text-black shadow-md">
                            Negotiable
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex flex-col justify-between flex-1 p-5">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                            {product.title}
                          </h3>
                          <div className="inline-flex items-center bg-white/10 text-xs px-2 py-1 rounded-md text-gray-300 mb-3">
                            <Tag className="w-3 h-3 mr-1 text-cyan-400" />
                            {product.category}
                          </div>

                          <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                            {product.description}
                          </p>
                        </div>

                        {/* Seller */}
                        <div className="flex items-center space-x-3 mb-5 p-3 rounded-lg bg-white/5">
                          <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-cyan-400 to-emerald-600 text-white rounded-full font-semibold">
                            {product.seller.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm text-white truncate font-medium">
                              {product.seller.name}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                              {product.seller.roll_number} •{" "}
                              {formatTimeAgo(product.posted_at)}
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-2">
                          <button
                            onClick={() =>
                              handleContactClick(product.seller, product.title)
                            }
                            className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-br from-sky-700 to-blue-800 text-white rounded-lg font-medium hover:from-sky-800 hover:to-blue-900 transition duration-200 shadow"
                          >
                            <FaWhatsapp className="w-4 h-4 mr-2" />
                            Contact Seller
                          </button>

                          {user?.email === product.seller?.email && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => markProductAsSold(product.id)}
                                className="flex-1 flex items-center justify-center px-3 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Sold
                              </button>

                              <button
                                onClick={() =>
                                  router.push(
                                    `/pages/updateproduct/${product.id}`
                                  )
                                }
                                className="flex-1 flex items-center justify-center px-3 py-2 rounded-lg font-semibold text-yellow-400 bg-yellow-500/10 hover:bg-yellow-500/20"
                              >
                                <Edit3 className="w-4 h-4 mr-1" />
                                Edit
                              </button>

                              {/*<button*/}
                              {/*  onClick={() => deleteProduct(product.id)}*/}
                              {/*  className="flex-1 flex items-center justify-center px-3 py-2 rounded-lg font-semibold text-red-400 bg-red-700/10 hover:bg-red-700/20"*/}
                              {/*>*/}
                              {/*  <Trash2 className="w-4 h-4 mr-1" />*/}
                              {/*  Delete*/}
                              {/*</button>*/}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-24">
                    <div className="max-w-md mx-auto">
                      <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search className="w-10 h-10 text-gray-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        No products found
                      </h3>
                      <p className="text-gray-400">
                        Try adjusting your search terms or browse different
                        categories.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
