"use client";

import Login from "@/app/auth/login/page";
import {
  BookOpen,
  Coffee,
  Gamepad2,
  Grid,
  Laptop,
  LogOut,
  Plus,
  Search,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  rollNo?: string;
  branch?: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const router = useRouter();

  const categories = [
    { value: "all", label: "All Items", icon: Grid, color: "from-gray-500 to-gray-600" },
    { value: "textbooks", label: "Books & Notes", icon: BookOpen, color: "from-blue-500 to-blue-600" },
    { value: "electronics", label: "Electronics & Tech", icon: Laptop, color: "from-purple-500 to-purple-600" },
    { value: "furniture", label: "Furniture", icon: Coffee, color: "from-green-500 to-green-600" },
    { value: "gaming", label: "Gaming & Entertainment", icon: Gamepad2, color: "from-red-500 to-red-600" },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {return};

      try {
        const res = await fetch("http://localhost:8000/users/me/", {
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

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {return};

    try {
      const res = await fetch("http://localhost:8000/users/logout/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (res.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        setUser(null);
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const stars = Array.from({ length: 150 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.8 + 0.2,
    animationDelay: Math.random() * 2,
  }));

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
        <div className="absolute top-60 right-20 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-green-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-pink-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: "3s" }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-b from-cyan-400 to-emerald-600 rounded-2xl mb-6 shadow-2xl">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-serif font-black bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-3">
            NITR Mart
          </h1>
        </div>

        {user ? (
          <>
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
                    <p className="text-gray-400">{user.rollNo} · {user.branch}</p>
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

            <div className="flex flex-col lg:flex-row gap-6 bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl mt-8 p-6">
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
          </>
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
