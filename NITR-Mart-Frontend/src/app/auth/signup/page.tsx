'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    role: "student",
    phone_number: "",
    year: "",
    branch: "",
    roll_no: "",
    department: "",
    employee_id: "",
    bio: ""
  });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    if (formData.role === "student" && (!formData.year || !formData.branch)) {
      setError("Year and branch are required for students");
      return;
    }

    if ((formData.role === "faculty" || formData.role === "staff") && !formData.department) {
      setError("Department is required for faculty/staff");
      return;
    }

    try {
      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value) formDataToSend.append(key, value);
      });

      if (profilePicture) {
        formDataToSend.append('profile_picture', profilePicture);
      }

      const response = await fetch("http://localhost:8000/users/register/", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/auth/login");
      } else {
        if (typeof data === 'object' && data !== null) {
          const errors = Object.entries(data).reduce((acc, [key, value]) => {
            if (Array.isArray(value)) {
              acc[key] = value[0];
            } else if (typeof value === 'string') {
              acc[key] = value;
            }
            return acc;
          }, {} as Record<string, string>);

          if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            setError("Please fix the errors below");
          } else {
            setError("Registration failed. Please try again.");
          }
        } else {
          setError("Registration failed. Please try again.");
        }
      }
    } catch (err) {
      setError("An error occurred during registration");
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-cyan-900 font-serif">Create an Account</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name" className="block mb-1 text-sm font-medium text-gray-700">
                  First Name*
                </label>
                <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    required
                    value={formData.first_name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${fieldErrors.first_name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {fieldErrors.first_name && <p className="text-red-500 text-xs mt-1">{fieldErrors.first_name}</p>}
              </div>
              <div>
                <label htmlFor="last_name" className="block mb-1 text-sm font-medium text-gray-700">
                  Last Name*
                </label>
                <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    required
                    value={formData.last_name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${fieldErrors.last_name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {fieldErrors.last_name && <p className="text-red-500 text-xs mt-1">{fieldErrors.last_name}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="phone_number" className="block mb-1 text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${fieldErrors.phone_number ? 'border-red-500' : 'border-gray-300'}`}
              />
              {fieldErrors.phone_number && <p className="text-red-500 text-xs mt-1">{fieldErrors.phone_number}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                NITR Email*
              </label>
              <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="user@nitrkl.ac.in"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${fieldErrors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                  Password*
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${fieldErrors.password ? 'border-red-500' : 'border-gray-300'}`}
                />
                {fieldErrors.password && <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>}
              </div>
              <div>
                <label htmlFor="confirm_password" className="block mb-1 text-sm font-medium text-gray-700">
                  Confirm Password*
                </label>
                <input
                    type="password"
                    id="confirm_password"
                    name="confirm_password"
                    required
                    value={formData.confirm_password}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${fieldErrors.confirm_password ? 'border-red-500' : 'border-gray-300'}`}
                />
                {fieldErrors.confirm_password && <p className="text-red-500 text-xs mt-1">{fieldErrors.confirm_password}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block mb-1 text-sm font-medium text-gray-700">
                Role*
              </label>
              <select
                  id="role"
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${fieldErrors.role ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="staff">Staff</option>
              </select>
              {fieldErrors.role && <p className="text-red-500 text-xs mt-1">{fieldErrors.role}</p>}
            </div>

            {formData.role === "student" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="year" className="block mb-1 text-sm font-medium text-gray-700">
                        Year*
                      </label>
                      <input
                          type="text"
                          id="year"
                          name="year"
                          required
                          value={formData.year}
                          onChange={handleChange}
                          placeholder="e.g., 2023"
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${fieldErrors.year ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {fieldErrors.year && <p className="text-red-500 text-xs mt-1">{fieldErrors.year}</p>}
                    </div>
                    <div>
                      <label htmlFor="branch" className="block mb-1 text-sm font-medium text-gray-700">
                        Branch*
                      </label>
                      <input
                          type="text"
                          id="branch"
                          name="branch"
                          required
                          value={formData.branch}
                          onChange={handleChange}
                          placeholder="e.g., CSE"
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${fieldErrors.branch ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {fieldErrors.branch && <p className="text-red-500 text-xs mt-1">{fieldErrors.branch}</p>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="roll_no" className="block mb-1 text-sm font-medium text-gray-700">
                      Roll Number
                    </label>
                    <input
                        type="text"
                        id="roll_no"
                        name="roll_no"
                        value={formData.roll_no}
                        onChange={handleChange}
                        placeholder="Optional"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${fieldErrors.roll_no ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {fieldErrors.roll_no && <p className="text-red-500 text-xs mt-1">{fieldErrors.roll_no}</p>}
                  </div>
                </>
            )}

            {(formData.role === "faculty" || formData.role === "staff") && (
                <>
                  <div>
                    <label htmlFor="department" className="block mb-1 text-sm font-medium text-gray-700">
                      Department*
                    </label>
                    <input
                        type="text"
                        id="department"
                        name="department"
                        required
                        value={formData.department}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${fieldErrors.department ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {fieldErrors.department && <p className="text-red-500 text-xs mt-1">{fieldErrors.department}</p>}
                  </div>
                  <div>
                    <label htmlFor="employee_id" className="block mb-1 text-sm font-medium text-gray-700">
                      Employee ID
                    </label>
                    <input
                        type="text"
                        id="employee_id"
                        name="employee_id"
                        value={formData.employee_id}
                        onChange={handleChange}
                        placeholder="Optional"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${fieldErrors.employee_id ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {fieldErrors.employee_id && <p className="text-red-500 text-xs mt-1">{fieldErrors.employee_id}</p>}
                  </div>
                </>
            )}

            <button
                type="submit"
                className="w-full bg-cyan-800 text-white py-2 rounded-lg hover:bg-cyan-900 transition duration-200 cursor-pointer mt-4"
            >
              Sign Up
            </button>
          </form>
          {error && (
              <p className="text-red-600 text-center mt-2" role="alert">
                {error}
              </p>
          )}
          <p className="text-sm text-center text-gray-600 mt-4 flex justify-center items-center">
            Already have an account?{" "}
            <button onClick={() => router.push('/auth/login')} className="text-cyan-600 hover:underline cursor-pointer ml-1">
              Login
            </button>
          </p>
        </div>
      </div>
  );
};

export default Signup;