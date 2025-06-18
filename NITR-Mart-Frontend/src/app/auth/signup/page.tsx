"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Building,
  Calendar,
  Eye,
  EyeOff,
  GraduationCap,
  Hash,
  Lock,
  Mail,
  User,
  UserPlus,
  Users,
  ArrowLeft,
  Phone,
} from "lucide-react";

const Signup = () => {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "otp" | "form">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirm: "",
    first_name: "",
    last_name: "",
    role: "student",
    year: "",
    branch: "",
    department: "",
    roll_no: "",
    wp_number: "", // Added WhatsApp number field
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [stars, setStars] = useState<
      { id: number; x: number; y: number; size: number; opacity: number; animationDelay: number }[]
  >([]);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Generate random stars
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

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("https://nitr-mart.onrender.com/users/send-otp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setFormData({ ...formData, email });
        setCountdown(60);
        setStep("otp");
      } else {
        const data = await response.json();
        setError(data.detail || "Failed to send OTP");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("https://nitr-mart.onrender.com/users/verify-otp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        setStep("form");
      } else {
        const data = await response.json();
        setError(data.detail || "Invalid OTP");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("https://nitr-mart.onrender.com/users/send-otp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setCountdown(60);
        setError("");
      } else {
        const data = await response.json();
        setError(data.detail || "Failed to resend OTP");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validate password match
    if (formData.password !== formData.password_confirm) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // Validate WhatsApp number format (basic validation)
    const wpNumberRegex = /^\+?\d{10,15}$/;
    if (formData.wp_number && !wpNumberRegex.test(formData.wp_number)) {
      setError("Invalid WhatsApp number format");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("https://nitr-mart.onrender.com/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, otp }),
      });

      if (response.ok) {
        router.push("/auth/login");
      } else {
        const data = await response.json();
        setError(JSON.stringify(data));
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Render the email input step
  if (step === "email") {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="font-serif text-3xl font-black bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-2">
                Verify Your Email
              </h2>
              <p className="text-gray-400">Enter your NITR email to receive an OTP</p>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-purple-400" />
                  Email (@nitrkl.ac.in)
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-sm"
                    placeholder="your.email@nitrkl.ac.in"
                />
              </div>

              {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm text-center">
                    {error}
                  </div>
              )}

              <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-cyan-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center group"
              >
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                    <>
                      Send OTP
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                )}
              </button>
            </form>
          </div>
        </div>
    );
  }

  // Render the OTP verification step
  if (step === "otp") {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-8">
            <button
                onClick={() => setStep("email")}
                className="flex items-center text-gray-400 hover:text-gray-200 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </button>

            <div className="text-center mb-8">
              <h2 className="font-serif text-3xl font-black bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-2">
                Enter OTP
              </h2>
              <p className="text-gray-400">
                We sent a 6-digit code to <span className="text-cyan-400">{email}</span>
              </p>
            </div>

            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="otp" className="text-sm font-medium text-gray-300 flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-pink-400" />
                  One-Time Password
                </label>
                <input
                    type="text"
                    id="otp"
                    name="otp"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-500/20 transition-all duration-300 backdrop-blur-sm text-center tracking-widest text-xl"
                    placeholder="------"
                />
              </div>

              <div className="text-center">
                {countdown > 0 ? (
                    <p className="text-gray-500 text-sm">
                      Resend OTP in {countdown} seconds
                    </p>
                ) : (
                    <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={isLoading}
                        className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                    >
                      Resend OTP
                    </button>
                )}
              </div>

              {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm text-center">
                    {error}
                  </div>
              )}

              <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-cyan-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center group"
              >
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                    <>
                      Verify OTP
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                )}
              </button>
            </form>
          </div>
        </div>
    );
  }

  // Render the registration form step
  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4 relative overflow-hidden">
        {/* Stars Background */}
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

        {/* Background Pattern */}
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
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div
              className="absolute top-1/3 right-1/4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl animate-pulse"
              style={{ animationDelay: "1s" }}
          ></div>
          <div
              className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "2s" }}
          ></div>
          <div
              className="absolute top-1/2 right-1/3 w-28 h-28 bg-orange-500/10 rounded-full blur-2xl animate-pulse"
              style={{ animationDelay: "3s" }}
          ></div>
        </div>

        {/* Signup Card */}
        <div className="relative z-10 w-full max-w-4xl">
          <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-8">
            <button
                onClick={() => setStep("otp")}
                className="flex items-center text-gray-400 hover:text-gray-200 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </button>

            <div className="text-center mb-8">
              <h2 className="font-serif text-3xl font-black bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-2">
                Complete Registration
              </h2>
              <p className="text-gray-400">
                Verified email: <span className="text-emerald-400">{email}</span>
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleFormSubmit}>
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="space-y-2">
                  <label
                      htmlFor="first_name"
                      className="text-sm font-medium text-gray-300 flex items-center"
                  >
                    <User className="w-4 h-4 mr-2 text-emerald-400" />
                    First Name
                  </label>
                  <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      required
                      value={formData.first_name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300 backdrop-blur-sm"
                      placeholder="Enter your first name"
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label
                      htmlFor="last_name"
                      className="text-sm font-medium text-gray-300 flex items-center"
                  >
                    <User className="w-4 h-4 mr-2 text-emerald-400" />
                    Last Name
                  </label>
                  <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      required
                      value={formData.last_name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 backdrop-blur-sm"
                      placeholder="Enter your last name"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-300 flex items-center"
                  >
                    <Lock className="w-4 h-4 mr-2 text-pink-400" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-500/20 transition-all duration-300 backdrop-blur-sm pr-12"
                        placeholder="Create a password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                    >
                      {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                      ) : (
                          <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label
                      htmlFor="password_confirm"
                      className="text-sm font-medium text-gray-300 flex items-center"
                  >
                    <Lock className="w-4 h-4 mr-2 text-red-400" />
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="password_confirm"
                        name="password_confirm"
                        required
                        value={formData.password_confirm}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/20 transition-all duration-300 backdrop-blur-sm pr-12"
                        placeholder="Confirm your password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                    >
                      {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                      ) : (
                          <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* WhatsApp Number */}
                <div className="space-y-2">
                  <label
                      htmlFor="wp_number"
                      className="text-sm font-medium text-gray-300 flex items-center"
                  >
                    <Phone className="w-4 h-4 mr-2 text-teal-400" />
                    WhatsApp Number
                  </label>
                  <input
                      type="tel"
                      id="wp_number"
                      name="wp_number"
                      value={formData.wp_number}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/20 transition-all duration-300 backdrop-blur-sm"
                      placeholder="10 digits WhatsApp number"
                  />
                </div>
              </div>

              {/* Role-specific Fields */}
              {formData.role === "student" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                          htmlFor="year"
                          className="text-sm font-medium text-gray-300 flex items-center"
                      >
                        <Calendar className="w-4 h-4 mr-2 text-cyan-400" />
                        Passing Year
                      </label>
                      <select
                          id="year"
                          name="year"
                          required
                          value={formData.year}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300 backdrop-blur-sm"
                      >
                        <option value="">Select Year</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label
                          htmlFor="branch"
                          className="text-sm font-medium text-gray-300 flex items-center"
                      >
                        <GraduationCap className="w-4 h-4 mr-2 text-green-400" />
                        Branch
                      </label>
                      <select
                          id="branch"
                          name="branch"
                          required
                          value={formData.branch}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-500/20 transition-all duration-300 backdrop-blur-sm"
                      >
                        <option value="">Select Branch</option>
                        <option value="Biotechnology">Biotechnology</option>
                        <option value="Biomedical Engineering">Biomedical Engineering</option>
                        <option value="Ceramic Engineering">Ceramic Engineering</option>
                        <option value="Chemical Engineering">Chemical Engineering</option>
                        <option value="Civil Engineering">Civil Engineering</option>
                        <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                        <option value="Electrical Engineering">Electrical Engineering</option>
                        <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
                        <option value="Electronics and Instrumentation Engineering">Electronics and Instrumentation Engineering</option>
                        <option value="Food Process Engineering">Food Process Engineering</option>
                        <option value="Industrial Design">Industrial Design</option>
                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                        <option value="Metallurgical and Materials Engineering">Metallurgical and Materials Engineering</option>
                        <option value="Mining Engineering">Mining Engineering</option>
                        <option value="Production Engineering">Production Engineering</option>
                        <option value="Architecture">Architecture</option>
                        <option value="Physics">Physics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Life Science">Life Science</option>
                        <option value="Earth and Atmospheric Sciences">Earth and Atmospheric Sciences</option>
                        <option value="Humanities and Social Sciences">Humanities and Social Sciences</option>
                        <option value="Management (MBA)">Management (MBA)</option>
                      </select>
                    </div>
                  </div>
              )}

              {(formData.role === "faculty" || formData.role === "staff") && (
                  <div className="space-y-2">
                    <label
                        htmlFor="department"
                        className="text-sm font-medium text-gray-300 flex items-center"
                    >
                      <Building className="w-4 h-4 mr-2 text-indigo-400" />
                      Department
                    </label>
                    <input
                        type="text"
                        id="department"
                        name="department"
                        required
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 backdrop-blur-sm"
                        placeholder="Enter your department"
                    />
                  </div>
              )}

              {/* Roll Number */}
              <div className="space-y-2">
                <label
                    htmlFor="roll_no"
                    className="text-sm font-medium text-gray-300 flex items-center"
                >
                  <Hash className="w-4 h-4 mr-2 text-yellow-400" />
                  Roll Number
                </label>
                <input
                    type="text"
                    id="roll_no"
                    name="roll_no"
                    value={formData.roll_no}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-500/20 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your roll number"
                />
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <label
                    htmlFor="role"
                    className="text-sm font-medium text-gray-300 flex items-center"
                >
                  <Users className="w-4 h-4 mr-2 text-orange-400" />
                  Role
                </label>
                <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-600 rounded-xl text-white focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all duration-300 backdrop-blur-sm"
                >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="staff">Staff</option>
                </select>
              </div>

              {/* Hidden OTP field */}
              <input type="hidden" name="otp" value={otp} />

              {/* Error Message */}
              {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm text-center">
                    {error}
                  </div>
              )}

              {/* Submit Button */}
              <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-cyan-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center group"
              >
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                    <>
                      Create Account
                      <UserPlus className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-900/40 px-2 text-yellow-400">
                Already have an account?
              </span>
              </div>
            </div>

            {/* Login Link */}
            <button
                onClick={() => router.push("/auth/login")}
                className="w-full bg-gray-800/50 border-2 border-gray-600 text-gray-300 font-semibold py-3 px-6 rounded-xl hover:bg-gray-700/50 hover:border-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-500/20 transition-all duration-300 flex items-center justify-center"
            >
              Sign In
              <ArrowRight className="w-4 h-4 ml-2 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <div className="mt-20 text-center">
              <p className="text-gray-500/80 text-sm">
                Join thousands of NITR students in our trusted marketplace
              </p>
            </div>
          </div>
        </div>
      </div>
        );
        };

        export default Signup;