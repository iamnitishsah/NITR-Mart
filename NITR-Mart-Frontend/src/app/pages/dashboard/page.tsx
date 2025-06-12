"use client";
import {
  BookOpen,
  Calendar,
  Coffee,
  Eye,
  Gamepad2,
  Grid,
  Heart,
  Laptop,
  LogOut,
  Plus,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  negotiable: boolean;
  image: string;
  category: string;
  is_sold: boolean;
  created_at: string;
  updated_at: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const router = useRouter();

  const categories = [
    {
      value: "all",
      label: "All Items",
      icon: Grid,
      color: "from-gray-500 to-gray-600",
    },
    {
      value: "textbooks",
      label: "Books & Notes",
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
    },
    {
      value: "electronics",
      label: "Electronics & Tech",
      icon: Laptop,
      color: "from-purple-500 to-purple-600",
    },
    {
      value: "furniture",
      label: "Furniture",
      icon: Coffee,
      color: "from-green-500 to-green-600",
    },
    {
      value: "gaming",
      label: "Gaming & Entertainment",
      icon: Gamepad2,
      color: "from-red-500 to-red-600",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");

        // Fetch user data
        const userResponse = await fetch(
          "http://localhost:8000/users/current/",
          {
            credentials: "include",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData);
        }

        // Fetch products
        const productsResponse = await fetch(
          "http://127.0.0.1:8000/products/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (productsResponse.ok) {
          const productsData = await productsResponse.json();
          setProducts(productsData);
        } else {
          setError("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        console.error("No refresh token found");
        return;
      }

      const response = await fetch("http://localhost:8000/users/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (response.ok) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/auth/login";
      } else {
        const data = await response.json();
        console.error("Logout failed:", data.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCategoryInfo = (categoryValue: string) => {
    return (
      categories.find((cat) => cat.value === categoryValue) || categories[0]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading your marketplace...</p>
        </div>
      </div>
    );
  }

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
              transform: `translateY(${scrollY * 0.1}px)`
            }}
          />
        ))}
      </div>
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 2px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Floating Accent Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-pulse"></div>
        <div
          className="absolute top-60 right-20 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 w-20 h-20 bg-green-500/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 right-1/3 w-28 h-28 bg-pink-500/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-b from-cyan-400 to-emerald-600 rounded-2xl mb-6 shadow-2xl">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-serif font-black bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-3">
            NITR Mart
          </h1>
        </div>

        {/* User Welcome Section */}
        {user && (
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl mb-8 p-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Welcome back, {user.firstName} {user.lastName}!
                  </h2>
                  <p className="text-gray-400">{user.email}</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => router.push("/pages/sell")}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Product
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all duration-300"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filter Section */}
        <div className="flex flex-col lg:flex-row gap-6 bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl mb-8 p-6">
          {/* Search Bar */}
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

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`flex items-center px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedCategory === category.value
                      ? "bg-gradient-to-r from-cyan-500 to-emerald-600 text-white shadow-lg"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div>
        <div className="bg-gray-900/50 backdrop-blur-xl shadow-2xl p-10 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <ShoppingCart className="w-6 h-6 mr-3 text-cyan-400" />
              Marketplace ({filteredProducts.length} items)
            </h3>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-400 mb-2">
                No products found
              </h4>
              <p className="text-gray-500 mb-6">
                {searchTerm || selectedCategory !== "all"
                  ? "Try adjusting your search or filters"
                  : "Be the first to add a product to the marketplace!"}
              </p>
              <button
                onClick={() => router.push("/pages/sell")}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add First Product
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const categoryInfo = getCategoryInfo(product.category);
                const IconComponent = categoryInfo.icon;

                return (
                  <div
                    key={product.id}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:border-gray-600 transition-all duration-300 group hover:transform hover:scale-105 hover:shadow-2xl"
                  >
                    {/* Product Image */}
                    <div className="relative h-48 bg-gray-700 overflow-hidden">
                      {product.image ? (
                        <img
                          src={
                            product.image.startsWith("http")
                              ? product.image
                              : `http://127.0.0.1:8000${product.image}`
                          }
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <IconComponent className="w-16 h-16 text-gray-500" />
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <div
                          className={`flex items-center px-3 py-1 rounded-full bg-gradient-to-r ${categoryInfo.color} text-white text-xs font-semibold shadow-lg`}
                        >
                          <IconComponent className="w-3 h-3 mr-1" />
                          {categoryInfo.label}
                        </div>
                      </div>

                      {/* Status Badge */}
                      {product.is_sold && (
                        <div className="absolute top-3 right-3">
                          <div className="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-semibold shadow-lg">
                            SOLD
                          </div>
                        </div>
                      )}

                      {product.negotiable && !product.is_sold && (
                        <div className="absolute bottom-3 right-3">
                          <div className="px-2 py-1 rounded-full bg-green-500/90 text-white text-xs font-semibold shadow-lg">
                            Negotiable
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="p-4">
                      <h4 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-cyan-400 transition-colors">
                        {product.title}
                      </h4>

                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Price */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <FaRupeeSign className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="text-2xl font-bold text-white">
                            {product.price.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Date */}
                      <div className="flex items-center text-xs text-gray-500 mb-4">
                        <Calendar className="w-3 h-3 mr-1" />
                        Listed on {formatDate(product.created_at)}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <button className="flex-1 flex items-center justify-center px-3 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-semibold transition-all duration-300">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </button>
                        <button className="flex items-center justify-center px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-all duration-300">
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
