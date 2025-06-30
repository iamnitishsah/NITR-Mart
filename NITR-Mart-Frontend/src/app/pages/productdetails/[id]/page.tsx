"use client";
import { ArrowLeft, RotateCcw, Share2, Tag, ZoomIn } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
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
  images?: string[]; // Multiple images array
  category: string;
  seller: Seller;
  is_sold: boolean;
  posted_at: string;
}

const ProductDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [is360Mode, setIs360Mode] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to view product details.");
        router.push("/pages/welcome");
        return;
      }

      try {
        const res = await fetch(
          `https://nitr-mart-production.up.railway.app/products/${params.id}/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        } else {
          alert("Failed to fetch product details.");
          router.push("/pages/dashboard");
        }
      } catch (err) {
        console.error("Failed to fetch product", err);
        router.push("/pages/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id, router]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const handle360Start = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!is360Mode) return;
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handle360Move = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !is360Mode) return;
    const deltaX = e.clientX - startX;
    setRotation((prev) => prev + deltaX * 0.5);
    setStartX(e.clientX);
  };

  const handle360End = () => {
    setIsDragging(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-500/20 border-t-cyan-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>Product not found or you do not have permission to view it.</p>
        <button
          onClick={() => router.push("/pages/dashboard")}
          className="mt-4 px-4 py-2 bg-cyan-600 rounded hover:bg-cyan-700"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const currentImages = product.images || [product.image].filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-cyan-600/30">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors">
              <ArrowLeft className="mr-2 w-5 h-5" />
              Back to Dashboard
            </button>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-cyan-400 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Image Gallery - Left Column */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Image Display */}
            <div className="relative bg-gray-800 rounded-2xl overflow-hidden group">
              <div
                ref={imageRef}
                className="relative h-96 md:h-[600px] cursor-crosshair overflow-hidden"
                onMouseMove={(e) => {
                  handleMouseMove(e);
                  handle360Move(e);
                }}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseDown={handle360Start}
                onMouseUp={handle360End}
              >
                {currentImages[selectedImageIndex] ? (
                  <img
                    src={currentImages[selectedImageIndex]}
                    alt={product.title}
                    className={`w-full h-full object-cover transition-transform duration-300 ${
                      isZoomed ? "scale-150" : "scale-100"
                    } ${is360Mode ? "cursor-grab" : "cursor-zoom-in"} ${
                      isDragging ? "cursor-grabbing" : ""
                    }`}
                    style={{
                      transformOrigin: isZoomed
                        ? `${zoomPosition.x}% ${zoomPosition.y}%`
                        : "center",
                      transform: is360Mode
                        ? `scale(${isZoomed ? 1.5 : 1}) rotateY(${rotation}deg)`
                        : undefined,
                    }}
                    draggable={false}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    No Image Available
                  </div>
                )}

                {/* Overlay Controls */}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setIs360Mode(!is360Mode);
                      setRotation(0);
                    }}
                    className={`p-2 rounded-full text-white transition-colors ${
                      is360Mode
                        ? "bg-cyan-600 hover:bg-cyan-700"
                        : "bg-black/50 hover:bg-black/70"
                    }`}
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>

                {is360Mode && (
                  <div className="absolute bottom-4 left-4 bg-black/70 rounded-lg px-3 py-1 text-white text-sm">
                    360° View - Drag to rotate
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Product Info Card */}
      <div className="bg-gray-900/70 rounded-2xl p-6 border border-cyan-600/30 backdrop-blur-sm">
       <div className="flex flex-col space-y-4">
    {/* Title */}
    <h1 className="text-2xl md:text-3xl font-bold text-white leading-snug">
      {product.title}
    </h1>

    {/* Category & Tags */}
    <div className="flex items-center space-x-3 text-sm text-cyan-400">
      <Tag className="w-4 h-4" />
      <span className="font-medium">{product.category}</span>
      <span className="text-gray-500">•</span>
      
    </div>

    {/* Description */}
    <p className="text-gray-300 text-sm leading-relaxed">
      {product.description}
    </p>
  </div>

        {/* Price Section */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-3xl md:text-4xl font-bold text-white">
              ₹{product.price.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {product.negotiable && (
              <span className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">
                Negotiable
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
