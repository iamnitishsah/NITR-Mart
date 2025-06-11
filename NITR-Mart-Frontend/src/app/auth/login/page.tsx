"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        // Redirect to the dashboard page
        router.push("/pages/dashboard");
      } else {
        const data = await response.json();
        setError(data.error || "Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-cyan-900 font-serif">
          Welcome Back
        </h2>
        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-800 text-white py-2 rounded-lg hover:bg-cyan-900 transition duration-200 cursor-pointer"
          >
            Login
          </button>
        </form>
        {error && (
          <p className="text-red-600 text-center mt-2" role="alert">
            {error}
          </p>
        )}
        <p className="text-sm text-center text-gray-600 mt-4">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => router.push("/auth/signup")}
            className="text-cyan-600 hover:underline cursor-pointer"
          >
            Sign up
          </button>
        </p>
        <div className="mt-6 text-center">
          <button
            className="inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;