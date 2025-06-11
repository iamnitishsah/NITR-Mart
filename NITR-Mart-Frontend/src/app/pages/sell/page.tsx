'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setNewProduct((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewProduct((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

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
          Authorization: 'Bearer <token>', // Replace <token> with the actual token
        },
        body: formData,
      });

      if (response.ok) {
        // Redirect to the dashboard after successfully adding the product
        router.push('/dashboard');
      } else {
        console.error('Error adding product:', await response.json());
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Add a New Product</h2>
      <form onSubmit={handleAddProduct} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newProduct.title}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="negotiable"
            checked={newProduct.negotiable}
            onChange={handleInputChange}
          />
          <span>Negotiable</span>
        </label>
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          className="w-full"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={newProduct.category}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          type="submit"
          className="bg-cyan-800 text-white py-2 px-4 rounded-lg hover:bg-cyan-900 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Sell;