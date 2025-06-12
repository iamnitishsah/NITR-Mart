'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, BookOpen, Laptop, ShoppingCart, Camera, Tag, Users, Coffee, Gamepad2 } from 'lucide-react';
import { FaRupeeSign } from "react-icons/fa";

const Sell = () => {
  const router = useRouter();
  const [newProduct, setNewProduct] = useState<{
    title: string;
    description: string;
    price: string;
    negotiable: boolean;
    image: File | null;
    category: string;
    is_sold: boolean;
  }>({
    title: '',
    description: '',
    price: '',
    negotiable: false,
    image: null,
    category: '',
    is_sold: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked ?? false;
    setNewProduct((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setNewProduct((prev) => ({
        ...prev,
        image: file,
      }));
      
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setImagePreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: { preventDefault: () => void; stopPropagation: () => void; type: string; }) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: {
    dataTransfer: any; preventDefault: () => void; stopPropagation: () => void; type: string; 
  }) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setNewProduct((prev) => ({
        ...prev,
        image: file,
      }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          setImagePreview(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = async () => {
    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append('title', newProduct.title);
    formData.append('description', newProduct.description);
    formData.append('price', newProduct.price);
    formData.append('negotiable', String(newProduct.negotiable));
    formData.append('category_id', newProduct.category);
    if (newProduct.image) {
      formData.append('image', newProduct.image);
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/products/', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer <token>',
        },
        body: formData,
      });
      
      if (response.ok) {
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      } else {
        console.error('Error adding product:', await response.json());
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setIsSubmitting(false);
    }
  };

  const categories = [
    { value: 'textbooks', label: 'Books & Notes', icon: BookOpen, color: 'from-blue-500 to-blue-600' },
    { value: 'electronics', label: 'Electronics & Tech', icon: Laptop, color: 'from-purple-500 to-purple-600' },
    { value: 'furniture', label: 'Furniture', icon: Coffee, color: 'from-green-500 to-green-600' },
    { value: 'gaming', label: 'Gaming & Entertainment', icon: Gamepad2, color: 'from-red-500 to-red-600' },
  ];
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
             
            }}
          />
        ))}
      </div>
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Floating Accent Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-60 right-20 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-green-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-pink-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-b from-cyan-400 to-emerald-600 rounded-2xl mb-6 shadow-2xl">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-3">
              NITR Mart
            </h1>
            <p className="text-gray-400 text-xl font-medium">Sell your stuff to fellow students</p>
            <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-500">
              
            </div>
          </div>

          {/* Main Container */}
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 p-6 border-b border-gray-700/50">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <ShoppingCart className="w-6 h-6 mr-3 text-cyan-400" />
                List Your Item
              </h2>
              <p className="text-gray-400 mt-1">Fill out the details to list your item on the marketplace</p>
            </div>

            <div className="p-8 space-y-8">
              {/* Title Input */}
              <div className="space-y-2">
                <label className=" text-white font-semibold text-lg flex items-center">
                  <Tag className="w-5 h-5 mr-2 text-sky-400" />
                  Item Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., Calculus book, Cooler, Cupboard..."
                  value={newProduct.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 bg-gray-800 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300 text-lg"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className=" text-white font-semibold text-lg flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-green-400" />
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Describe your item's condition, features..."
                  value={newProduct.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-4 bg-gray-800 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-500/20 transition-all duration-300 resize-none text-lg"
                  required
                />
              </div>

              {/* Price and Negotiable */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-2">
                  <label className=" text-white font-semibold text-lg flex items-center">
                    <FaRupeeSign className="w-5 h-5 mr-2 text-yellow-400" />
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg font-semibold">₹</span>
                    <input
                      type="number"
                      name="price"
                      placeholder="0"
                      value={newProduct.price}
                      onChange={handleInputChange}
                      className="w-full pl-8 pr-4 py-4 bg-gray-800 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-500/20 transition-all duration-300 text-lg"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex items-end">
                  <label className="flex items-center space-x-3 bg-gray-800 px-6 py-4 rounded-xl border-2 border-gray-600 hover:border-gray-500 transition-all duration-300 cursor-pointer w-full">
                    <input
                      type="checkbox"
                      name="negotiable"
                      checked={newProduct.negotiable}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500 focus:ring-2"
                    />
                    <span className="text-white font-semibold">Negotiable</span>
                  </label>
                </div>
              </div>

              {/* Category */}
              <div className="space-y-4">
                <label className="block text-white font-semibold text-lg">Choose Category</label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((cat) => {
                    const IconComponent = cat.icon;
                    return (
                      <label
                        key={cat.value}
                        className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 group ${
                          newProduct.category === cat.value
                            ? 'border-sky-600 bg-blue-500/20 shadow-lg shadow-blue-500/25 transform scale-105'
                            : 'border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-700'
                        }`}
                      >
                        <input
                          type="radio"
                          name="category"
                          value={cat.value}
                          checked={newProduct.category === cat.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className={`flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${cat.color} mr-4 flex-shrink-0`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <span className="text-white font-semibold block">{cat.label}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <label className=" text-white font-semibold text-lg flex items-center">
                  <Camera className="w-5 h-5 mr-2 text-purple-400" />
                  Product Photos
                </label>
                <div
                  className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
                    dragActive
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-700'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                    required
                  />
                  
                  {imagePreview ? (
                    <div className="text-center">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-w-full max-h-64 mx-auto rounded-lg shadow-lg mb-4"
                      />
                      <p className="text-gray-400 text-lg">Click or drag to change photo</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                      <p className="text-white font-semibold text-xl mb-2">Upload Product Photo</p>
                      <p className="text-gray-400 text-lg">Drag & drop or click to browse</p>
                      <p className="text-gray-500 text-sm mt-2">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleAddProduct}
                  disabled={isSubmitting}
                  className={`w-full py-5 px-8 rounded-xl font-bold text-xl transition-all duration-300 transform ${
                    isSubmitting 
                      ? 'bg-gray-600 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-cyan-500 to-emerald-800 hover:from-cyan-600 hover:to-emerald-700 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98] shadow-lg'
                  } text-white`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-white mr-3"></div>
                      Listing Your Item...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 mr-3" />
                      List Item on Marketplace
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sell;