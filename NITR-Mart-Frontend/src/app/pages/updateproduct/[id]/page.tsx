"use client";

import {
  ArrowLeft,
  Bike,
  BookOpen,
  Boxes,
  CheckCircle,
  Coffee,
  DollarSign,
  Dumbbell,
  FileText,
  FlaskConical,
  ImageIcon,
  Laptop,
  Loader2,
  Paintbrush,
  Save,
  ShoppingBag,
  Tag,
  Upload,
  Users,
  Camera,
  Home,
  MoreHorizontal,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  negotiable: boolean;
  image: string | null;
  category: string;
  is_sold: boolean;
}

const categories = [
  {
    value: "Electronics",
    label: "Electronics",
    icon: Laptop,
    color: "from-purple-500 to-purple-600",
  },
  {
    value: "Books & Study Materials",
    label: "Books & Study Materials",
    icon: BookOpen,
    color: "from-blue-500 to-blue-600",
  },
  {
    value: "Hostel Essentials",
    label: "Hostel Essentials",
    icon: Coffee,
    color: "from-green-500 to-green-600",
  },
  {
    value: "Furniture",
    label: "Furniture",
    icon: Home,
    color: "from-amber-500 to-amber-600",
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
    color: "from-cyan-500 to-cyan-600",
  },
  {
    value: "Room Decor",
    label: "Room Decor",
    icon: Paintbrush,
    color: "from-pink-500 to-pink-600",
  },
  {
    value: "Lab Equipment",
    label: "Lab Equipment",
    icon: FlaskConical,
    color: "from-indigo-500 to-indigo-600",
  },
  {
    value: "Others",
    label: "Others",
    icon: MoreHorizontal,
    color: "from-gray-500 to-gray-600",
  },
];

const UpdateProductPage = ({ params }: { params: { id: string } }) => {
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
  const [product, setProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    price: string;
    negotiable: boolean;
    image: File | null;
    category: string;
    is_sold: boolean;
  }>({
    title: "",
    description: "",
    price: "",
    negotiable: false,
    image: null,
    category: "Others",
    is_sold: false,
  });
  const [loading, setLoading] = useState(false);
  const [fetchingProduct, setFetchingProduct] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const router = useRouter();

  // Generate stars for background
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

  const fetchProduct = async () => {
    setFetchingProduct(true);
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to update a product.");
      router.push("/pages/welcome");
      return;
    }

    try {
      const res = await fetch(
        `https://nitr-mart.onrender.com/products/${params.id}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setProduct(data);
        setFormData({
          title: data.title,
          description: data.description,
          price: data.price,
          negotiable: data.negotiable,
          image: null,
          category: data.category,
          is_sold: data.is_sold,
        });
        if (data.image) {
          setPreviewImage(data.image);
        }
      } else {
        alert("Failed to fetch product details.");
        router.push("/pages/dashboard");
      }
    } catch (err) {
      console.error("Failed to fetch product", err);
      router.push("/pages/dashboard");
    } finally {
      setFetchingProduct(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked ?? false;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: {
    preventDefault: () => void;
    stopPropagation: () => void;
    type: string;
  }) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === "string") {
          setPreviewImage(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = (categoryValue: string) => {
    setFormData((prev) => ({ ...prev, category: categoryValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to update a product.");
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("negotiable", String(formData.negotiable));
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }
    formDataToSend.append("category", formData.category);
    formDataToSend.append("is_sold", String(formData.is_sold));

    try {
      const res = await fetch(
        `https://nitr-mart.onrender.com/products/${params.id}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      );

      if (res.ok) {
        alert("Product updated successfully!");
        router.push("/pages/dashboard");
      } else {
        const data = await res.json();
        alert(data.detail || "Failed to update product.");
      }
    } catch (err) {
      console.error("Failed to update product", err);
      alert("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative">
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
        <div className="max-w-5xl mx-auto">
          {/* Header with Back Button */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <button
                onClick={() => router.push("/pages/dashboard")}
                className="absolute left-4 top-8 p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-b from-cyan-400 to-emerald-600 rounded-2xl shadow-2xl">
                <Users className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-3">
              NITR Mart
            </h1>
            <p className="text-gray-400 text-xl font-medium">
              Update your product listing
            </p>
          </div>

          {fetchingProduct ? (
            <div className="flex justify-center items-center py-24">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-500/20 border-t-cyan-500"></div>
            </div>
          ) : product ? (
            /* Main Container */
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 p-6 border-b border-gray-700/50">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <Save className="w-6 h-6 mr-3 text-cyan-400" />
                  Update Your Listing
                </h2>
                <p className="text-gray-400 mt-1">
                  Make changes to your product details
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                {/* Title Input */}
                <div className="space-y-2">
                  <label className="text-white font-semibold text-lg flex items-center">
                    <Tag className="w-5 h-5 mr-2 text-sky-400" />
                    Item Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="e.g., Calculus book, Cooler, Cupboard..."
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-gray-800 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300 text-lg"
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-white font-semibold text-lg flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-green-400" />
                    Description
                  </label>
                  <textarea
                    name="description"
                    placeholder="Describe your item's condition, features..."
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-4 bg-gray-800 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-500/20 transition-all duration-300 resize-none text-lg"
                    required
                  />
                </div>

                {/* Price and Checkboxes */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-white font-semibold text-lg flex items-center">
                      <FaRupeeSign className="w-5 h-5 mr-2 text-yellow-400" />
                      Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg font-semibold">
                        ₹
                      </span>
                      <input
                        type="number"
                        name="price"
                        placeholder="0"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full pl-8 pr-4 py-4 bg-gray-800 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-500/20 transition-all duration-300 text-lg"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 bg-gray-800 px-6 py-4 rounded-xl border-2 border-gray-600 hover:border-gray-500 transition-all duration-300">
                      <input
                        type="checkbox"
                        id="negotiable"
                        name="negotiable"
                        checked={formData.negotiable}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500 focus:ring-2"
                      />
                      <label htmlFor="negotiable" className="text-white font-semibold">
                        Negotiable
                      </label>
                    </div>

                    <div className="flex items-center space-x-3 bg-gray-800 px-6 py-4 rounded-xl border-2 border-gray-600 hover:border-gray-500 transition-all duration-300">
                      <input
                        type="checkbox"
                        id="is_sold"
                        name="is_sold"
                        checked={formData.is_sold}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-red-500 bg-gray-700 border-gray-600 rounded focus:ring-red-500 focus:ring-2"
                      />
                      <label htmlFor="is_sold" className="text-white font-semibold">
                        Mark as Sold
                      </label>
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-4">
                  <label className="block text-white font-semibold text-lg">
                    Choose Category
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((cat) => {
                      const IconComponent = cat.icon;
                      const isSelected = formData.category === cat.value;
                      return (
                        <label
                          key={cat.value}
                          className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 group ${
                            isSelected
                              ? "border-sky-600 bg-blue-500/20 shadow-lg shadow-blue-500/25 transform scale-105"
                              : "border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-700"
                          }`}
                        >
                          <input
                            type="radio"
                            name="category"
                            value={cat.value}
                            checked={isSelected}
                            onChange={(e) => handleCategoryChange(e.target.value)}
                            className="sr-only"
                          />
                          <div
                            className={`flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${cat.color} mr-4 flex-shrink-0`}
                          >
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <span className="text-white font-semibold block">
                              {cat.label}
                            </span>
                          </div>
                          {isSelected && (
                            <div className="absolute top-2 right-2">
                              <CheckCircle className="w-5 h-5 text-cyan-400" />
                            </div>
                          )}
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="text-white font-semibold text-lg flex items-center">
                    <Camera className="w-5 h-5 mr-2 text-purple-400" />
                    Product Photos
                  </label>
                  <div
                    className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
                      dragActive
                        ? "border-cyan-500 bg-cyan-500/10"
                        : "border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-700"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      name="image"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept="image/*"
                    />

                    {previewImage ? (
                      <div className="text-center">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="max-w-full max-h-64 mx-auto rounded-lg shadow-lg mb-4"
                        />
                        <p className="text-gray-400 text-lg">
                          Click or drag to change photo
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                        <p className="text-white font-semibold text-xl mb-2">
                          Upload Product Photo
                        </p>
                        <p className="text-gray-400 text-lg">
                          Drag & drop or click to browse
                        </p>
                        <p className="text-gray-500 text-sm mt-2">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-5 px-8 rounded-xl font-bold text-xl transition-all duration-300 transform ${
                      loading
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-cyan-500 to-emerald-800 hover:from-cyan-600 hover:to-emerald-700 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98] shadow-lg"
                    } text-white`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="w-7 h-7 mr-3 animate-spin" />
                        Updating Product...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Save className="w-6 h-6 mr-3" />
                        Update Product
                      </div>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="w-10 h-10 text-gray-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Product not found
                </h3>
                <p className="text-gray-400">
                  The product you're trying to update doesn't exist or you
                  don't have permission to edit it.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateProductPage;