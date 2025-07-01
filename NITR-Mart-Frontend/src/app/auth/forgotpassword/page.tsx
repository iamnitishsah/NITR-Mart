"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, Mail } from "lucide-react";

const API_BASE = "http://127.0.0.1:8000";

const ForgotPassword = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [step, setStep] = useState<"email" | "reset">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Change password for logged-in user (no current password)
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsLoading(true);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/users/me/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password,
        }),
      });
      if (res.ok) {
        setSuccess(true);
        setPassword("");
        setConfirmPassword("");
      } else {
        const data = await res.json();
        setError(data.password || data.detail || "Failed to change password.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Forgot password flow for not logged-in user
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE}/users/check-email/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStep("reset");
      } else {
        const data = await res.json();
        setError(data.detail || "User is not registered.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/users/password-reset/confirm/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, new_password: password }),
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        setError(data.detail || "Failed to reset password.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="w-full max-w-md bg-gray-900/80 rounded-2xl shadow-2xl p-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center text-gray-400 hover:text-gray-200 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          {isLoggedIn ? "Change Password" : "Forgot Password"}
        </h1>

        {/* Change Password (Logged In) */}
        {isLoggedIn && (
          <form onSubmit={handleChangePassword} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300 flex items-center"
              >
                <Lock className="w-4 h-4 mr-2 text-cyan-400" />
                New Password
              </label>
              <input
                type="password"
                id="password"
                required
                minLength={8}
                placeholder="New password"
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:border-cyan-500 focus:outline-none mt-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300 flex items-center"
              >
                <Lock className="w-4 h-4 mr-2 text-cyan-400" />
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                required
                minLength={8}
                placeholder="Confirm new password"
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:border-cyan-500 focus:outline-none mt-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {isLoading ? "Saving..." : "Change Password"}
            </button>
            {success && (
              <div className="mt-4 text-green-400 text-center">
                Password changed successfully!
              </div>
            )}
            {error && (
              <div className="mt-4 text-red-400 text-center">{error}</div>
            )}
          </form>
        )}

        {/* Forgot Password (Not Logged In) */}
        {!isLoggedIn && (
          <>
            {step === "email" && (
              <>
                <p className="text-gray-400 mb-6 text-center">
                  Enter your registered email address to reset your password.
                </p>
                <form onSubmit={handleEmailSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 flex items-center"
                    >
                      <Mail className="w-4 h-4 mr-2 text-cyan-400" />
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="your.email@nitrkl.ac.in"
                      className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:border-cyan-500 focus:outline-none mt-2"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? "Checking..." : "Next"}
                  </button>
                </form>
              </>
            )}

            {step === "reset" && (
              <>
                <p className="text-gray-400 mb-6 text-center">
                  Enter your new password below.
                </p>
                <form onSubmit={handleResetSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-300 flex items-center"
                    >
                      <Lock className="w-4 h-4 mr-2 text-cyan-400" />
                      New Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      required
                      minLength={8}
                      placeholder="New password"
                      className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:border-cyan-500 focus:outline-none mt-2"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-300 flex items-center"
                    >
                      <Lock className="w-4 h-4 mr-2 text-cyan-400" />
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      required
                      minLength={8}
                      placeholder="Confirm password"
                      className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:border-cyan-500 focus:outline-none mt-2"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      autoComplete="new-password"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? "Resetting..." : "Reset Password"}
                  </button>
                </form>
              </>
            )}
            {success && (
              <div className="mt-6 text-green-400 text-center">
                Password reset successfully! You can now{" "}
                <button
                  className="underline text-cyan-400"
                  onClick={() => router.push("/auth/login")}
                >
                  login
                </button>
                .
              </div>
            )}
            {error && (
              <div className="mt-4 text-red-400 text-center">{error}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;