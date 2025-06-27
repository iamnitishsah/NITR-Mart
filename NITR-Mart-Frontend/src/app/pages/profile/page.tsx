'use client';
import React, { useState, useEffect } from 'react';
import {
    User,
    Mail,
    Phone,
    Shield,
    Edit,
    Save,
    X,
    ChevronDown,
    ChevronUp
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface UserProfile {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    year?: string;
    branch?: string;
    roll_no?: string;
    wp_number?: string;
}

interface FormData {
    first_name: string;
    last_name: string;
    year: string;
    branch: string;
    roll_no: string;
    wp_number: string;
    current_password: string;
    new_password: string;
    confirm_password: string;
}

const ProfilePage = () => {
    const router = useRouter();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        first_name: '',
        last_name: '',
        year: '',
        branch: '',
        roll_no: '',
        wp_number: '',
        current_password: '',
        new_password: '',
        confirm_password: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showPasswordFields, setShowPasswordFields] = useState(false);

    // Complete list of branches at NIT Rourkela
    const branches = [
        "Biotechnology",
        "Biomedical Engineering",
        "Ceramic Engineering",
        "Chemical Engineering",
        "Civil Engineering",
        "Computer Science and Engineering",
        "Electrical Engineering",
        "Electronics and Communication Engineering",
        "Electronics and Instrumentation Engineering",
        "Food Process Engineering",
        "Industrial Design",
        "Mechanical Engineering",
        "Metallurgical and Materials Engineering",
        "Mining Engineering",
        "Production Engineering",
        "Architecture",
        "Physics",
        "Chemistry",
        "Mathematics",
        "Life Science",
        "Earth and Atmospheric Sciences",
        "Humanities and Social Sciences",
        "Management (MBA)"
    ];

    // Fetch user profile
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    router.push('/auth/login');
                    return;
                }

                const response = await fetch('http://localhost:8000/api/users/me/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch profile');
                }

                const data: UserProfile = await response.json();
                setProfile(data);
                setFormData({
                    first_name: data.first_name || '',
                    last_name: data.last_name || '',
                    year: data.year || '',
                    branch: data.branch || '',
                    roll_no: data.roll_no || '',
                    wp_number: data.wp_number || '',
                    current_password: '',
                    new_password: '',
                    confirm_password: ''
                });
            } catch (err) {
                setError('Failed to load profile');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Password validation
        if (showPasswordFields) {
            if (formData.new_password !== formData.confirm_password) {
                setError("Passwords don't match");
                return;
            }
            if (formData.new_password.length < 8) {
                setError("Password must be at least 8 characters");
                return;
            }
        }

        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                router.push('/auth/login');
                return;
            }

            // Prepare update data
            const updateData: Partial<UserProfile & {
                password: string;
                current_password: string;
            }> = {
                first_name: formData.first_name,
                last_name: formData.last_name,
                year: formData.year,
                branch: formData.branch,
                roll_no: formData.roll_no,
                wp_number: formData.wp_number
            };

            if (showPasswordFields && formData.new_password) {
                updateData.password = formData.new_password;
                updateData.current_password = formData.current_password;
            }

            const response = await fetch(`http://localhost:8000/api/users/${profile?.id}/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || Object.values(errorData)[0] as string || 'Update failed');
            }

            const updatedProfile: UserProfile = await response.json();
            setProfile(updatedProfile);
            setIsEditing(false);
            toast.success('Profile updated successfully!');
            setShowPasswordFields(false);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message || 'Failed to update profile');
            } else {
                setError('Failed to update profile');
            }
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl mb-4">{error || 'Profile not found'}</p>
                    <button
                        onClick={() => router.push('/auth/login')}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
            {/* Header */}
            <div className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/50 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                        My Profile
                    </h1>
                    <div className="flex space-x-4">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300"
                                >
                                    <X className="w-5 h-5 mr-2" />
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    form="profile-form"
                                    className="flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-600 hover:from-cyan-600 hover:to-emerald-700 rounded-lg text-white"
                                >
                                    <Save className="w-5 h-5 mr-2" />
                                    Save Changes
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-600 hover:from-cyan-600 hover:to-emerald-700 rounded-lg text-white"
                            >
                                <Edit className="w-5 h-5 mr-2" />
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {error && (
                    <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-300">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300">
                            <div className="flex flex-col items-center">
                                <div className="w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-emerald-600/10 rounded-full flex items-center justify-center mb-4 border-2 border-cyan-500/30">
                                    <User className="w-16 h-16 text-cyan-400" />
                                </div>
                                <h2 className="text-xl font-bold text-center">
                                    {profile.first_name} {profile.last_name}
                                </h2>
                                <p className="text-gray-400 text-center mt-1">{profile.role}</p>

                                <div className="w-full mt-6 space-y-4">
                                    <div className="flex items-center">
                                        <Mail className="w-5 h-5 text-gray-400 mr-3" />
                                        <p className="text-gray-300">{profile.email}</p>
                                    </div>
                                    {profile.wp_number && (
                                        <div className="flex items-center">
                                            <Phone className="w-5 h-5 text-gray-400 mr-3" />
                                            <p className="text-gray-300">{profile.wp_number}</p>
                                        </div>
                                    )}
                                    {profile.roll_no && (
                                        <div className="flex items-center">
                                            <Shield className="w-5 h-5 text-gray-400 mr-3" />
                                            <p className="text-gray-300">{profile.roll_no}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Form */}
                    <div className="lg:col-span-2">
                        <form id="profile-form" onSubmit={handleSubmit} className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
                            <h2 className="text-xl font-bold mb-6 flex items-center">
                                {isEditing ? (
                                    <Edit className="w-5 h-5 mr-3 text-cyan-400" />
                                ) : (
                                    <User className="w-5 h-5 mr-3 text-cyan-400" />
                                )}
                                {isEditing ? 'Edit Profile' : 'Profile Information'}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-400 mb-2">
                                        First Name
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            id="first_name"
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                                            required
                                        />
                                    ) : (
                                        <p className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-300">
                                            {profile.first_name || 'Not provided'}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-400 mb-2">
                                        Last Name
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            id="last_name"
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                                        />
                                    ) : (
                                        <p className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-300">
                                            {profile.last_name || 'Not provided'}
                                        </p>
                                    )}
                                </div>

                                {profile.role === 'student' && (
                                    <>
                                        <div>
                                            <label htmlFor="year" className="block text-sm font-medium text-gray-400 mb-2">
                                                Graduation Year
                                            </label>
                                            {isEditing ? (
                                                <select
                                                    id="year"
                                                    name="year"
                                                    value={formData.year}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                                                >
                                                    <option value="">Select Year</option>
                                                    <option value="2026">2026</option>
                                                    <option value="2027">2027</option>
                                                    <option value="2028">2028</option>
                                                    <option value="2029">2029</option>
                                                </select>
                                            ) : (
                                                <p className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-300">
                                                    {profile.year || 'Not provided'}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="branch" className="block text-sm font-medium text-gray-400 mb-2">
                                                Branch
                                            </label>
                                            {isEditing ? (
                                                <select
                                                    id="branch"
                                                    name="branch"
                                                    value={formData.branch}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                                                >
                                                    <option value="">Select Branch</option>
                                                    {branches.map((branch) => (
                                                        <option key={branch} value={branch}>{branch}</option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <p className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-300">
                                                    {profile.branch || 'Not provided'}
                                                </p>
                                            )}
                                        </div>
                                    </>
                                )}

                                <div>
                                    <label htmlFor="roll_no" className="block text-sm font-medium text-gray-400 mb-2">
                                        Roll Number
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            id="roll_no"
                                            name="roll_no"
                                            value={formData.roll_no}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                                        />
                                    ) : (
                                        <p className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-300">
                                            {profile.roll_no || 'Not provided'}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="wp_number" className="block text-sm font-medium text-gray-400 mb-2">
                                        WhatsApp Number
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            id="wp_number"
                                            name="wp_number"
                                            value={formData.wp_number}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                                        />
                                    ) : (
                                        <p className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-300">
                                            {profile.wp_number || 'Not provided'}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Password Change Section */}
                            {isEditing && (
                                <div className="mt-8">
                                    <button
                                        type="button"
                                        onClick={() => setShowPasswordFields(!showPasswordFields)}
                                        className="flex items-center text-cyan-400 hover:text-cyan-300 mb-4"
                                    >
                                        {showPasswordFields ? (
                                            <ChevronUp className="w-5 h-5 mr-2" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 mr-2" />
                                        )}
                                        Change Password
                                    </button>

                                    {showPasswordFields && (
                                        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 space-y-4">
                                            <div>
                                                <label htmlFor="current_password" className="block text-sm font-medium text-gray-400 mb-2">
                                                    Current Password
                                                </label>
                                                <input
                                                    type="password"
                                                    id="current_password"
                                                    name="current_password"
                                                    value={formData.current_password}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                                                    placeholder="Enter current password"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="new_password" className="block text-sm font-medium text-gray-400 mb-2">
                                                    New Password
                                                </label>
                                                <input
                                                    type="password"
                                                    id="new_password"
                                                    name="new_password"
                                                    value={formData.new_password}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                                                    placeholder="Enter new password"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-400 mb-2">
                                                    Confirm New Password
                                                </label>
                                                <input
                                                    type="password"
                                                    id="confirm_password"
                                                    name="confirm_password"
                                                    value={formData.confirm_password}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                                                    placeholder="Confirm new password"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;