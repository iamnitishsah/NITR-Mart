// // filepath: /Users/sanchita/Connection/frontend/src/app/pages/dashboard/page.tsx
// "use client";

// import { useState, useEffect } from "react";

// const Dashboard = () => {
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     title: "",
//     description: "",
//     price: "",
//     negotiable: false,
//     image: null,
//     category: "",
//     is_sold: false,
//   });

//   const fetchProducts = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/products/");
//       const data = await response.json();
//       setProducts(data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setNewProduct((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     setNewProduct((prev) => ({
//       ...prev,
//       image: e.target.files[0],
//     }));
//   };

//   const handleAddProduct = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     Object.keys(newProduct).forEach((key) => {
//       formData.append(key, newProduct[key]);
//     });

//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/products/", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         fetchProducts(); // Refresh the product list
//         setNewProduct({
//           title: "",
//           description: "",
//           price: "",
//           negotiable: false,
//           image: null,
//           category: "",
//           is_sold: false,
//         });
//       } else {
//         console.error("Error adding product:", await response.json());
//       }
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       {/* Header */}
//       <header className="bg-cyan-800 text-white py-6">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h1 className="text-3xl font-bold">Dashboard</h1>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <h2 className="text-2xl font-bold mb-6">Products</h2>

//         {/* Product List */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {products.map((product) => (
//             <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
//               <img
//                 src={`http://127.0.0.1:8000/media/${product.image}`}
//                 alt={product.title}
//                 className="w-full h-40 object-cover rounded-md mb-4"
//               />
//               <h3 className="text-lg font-bold">{product.title}</h3>
//               <p className="text-gray-600">{product.description}</p>
//               <p className="text-cyan-800 font-semibold">${product.price}</p>
//               <p className="text-sm text-gray-500">
//                 {product.negotiable ? "Negotiable" : "Fixed Price"}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Add Product Form */}
//         <div className="mt-12">
//           <h2 className="text-2xl font-bold mb-4">Add a New Product</h2>
//           <form onSubmit={handleAddProduct} className="space-y-4">
//             <input
//               type="text"
//               name="title"
//               placeholder="Title"
//               value={newProduct.title}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border rounded-lg"
//               required
//             />
//             <textarea
//               name="description"
//               placeholder="Description"
//               value={newProduct.description}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border rounded-lg"
//               required
//             />
//             <input
//               type="number"
//               name="price"
//               placeholder="Price"
//               value={newProduct.price}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border rounded-lg"
//               required
//             />
//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 name="negotiable"
//                 checked={newProduct.negotiable}
//                 onChange={handleInputChange}
//               />
//               <span>Negotiable</span>
//             </label>
//             <input
//               type="file"
//               name="image"
//               onChange={handleImageChange}
//               className="w-full"
//               required
//             />
//             <input
//               type="text"
//               name="category"
//               placeholder="Category"
//               value={newProduct.category}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border rounded-lg"
//             />
//             <button
//               type="submit"
//               className="bg-cyan-800 text-white py-2 px-4 rounded-lg hover:bg-cyan-900 transition"
//             >
//               Add Product
//             </button>
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;
"use client";

import { useState, useEffect } from 'react';
import  Link from 'next/link';

const Dashboard = () => {
  interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    negotiable: boolean;
    image: string;
  }

  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/products/', {
        headers: {
          Authorization: 'Bearer <token>', // Replace <token> with the actual token
        },
      });
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-cyan-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Link href="/pages/sell"><button type="button">Upload your product</button></Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold mb-6">Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
              <img
                src={`http://127.0.0.1:8000/media/${product.image}`}
                alt={product.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-bold">{product.title}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-cyan-800 font-semibold">${product.price}</p>
              <p className="text-sm text-gray-500">
                {product.negotiable ? 'Negotiable' : 'Fixed Price'}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;