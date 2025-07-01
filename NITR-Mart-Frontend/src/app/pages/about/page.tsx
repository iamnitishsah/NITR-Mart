'use client'
import React from 'react';
import { Users, Shield, Heart, BookOpen, Laptop, Bike, Home, Gift,ArrowLeft  } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AboutPage = () => {
    const router = useRouter();

    const stats = [
        { value: "500+", label: "Active Users" },
        { value: "1000+", label: "Listings" },
        { value: "95%", label: "Satisfaction Rate" },
        { value: "24/7", label: "Support" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
                   <button
                onClick={() => router.push("/pages/welcome")}
                className="absolute left-4 top-8 p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            {/* Hero Section */}
            <section className="py-20 px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                        About NITR Mart
                    </h1>
                    <p className="text-xl text-gray-300 mb-8">
                        The trusted marketplace built by NITians, for NITians
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 px-4 bg-gray-900/50">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-bold mb-6 text-white">
                                Our Mission
                            </h2>
                            <p className="text-gray-300 mb-6 text-lg">
                                To create a sustainable, student-friendly marketplace that connects the NIT Rourkela community through safe and convenient trading.
                            </p>
                            <p className="text-gray-400 mb-8">
                                Founded in 2025, NITR Mart was born out of the need for a dedicated platform where students could buy, sell, and exchange items within the campus ecosystem. We believe in reducing waste, fostering connections, and making student life more affordable.
                            </p>
                            <button
                                onClick={() => router.push('/auth/login')}
                                className="bg-gradient-to-r from-cyan-500 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-emerald-700 transition-all duration-300"
                            >
                                Join Our Community
                            </button>
                        </div>
                        <div className="md:w-1/2 bg-gray-800/50 p-8 rounded-xl border border-gray-700">
                            <h3 className="text-xl font-semibold mb-6 text-cyan-400">What Makes Us Different</h3>
                            <div className="space-y-6">
                                {[
                                    {
                                        icon: <Shield className="w-6 h-6 text-emerald-400" />,
                                        title: "Verified Users Only",
                                        description: "All members verified with @nitrkl.ac.in emails for a trusted community"
                                    },
                                    {
                                        icon: <Heart className="w-6 h-6 text-pink-400" />,
                                        title: "Sustainable Campus",
                                        description: "Promoting reuse and reducing waste in our college community"
                                    },
                                    {
                                        icon: <Users className="w-6 h-6 text-cyan-400" />,
                                        title: "Student Focused",
                                        description: "Built specifically for NIT Rourkela student needs and campus life"
                                    }
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <div className="p-2 bg-gray-700/50 rounded-lg">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white">{item.title}</h4>
                                            <p className="text-gray-400">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center text-white">
                        NITR Mart in Numbers
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 text-center">
                                <p className="text-4xl font-bold text-cyan-400 mb-2">{stat.value}</p>
                                <p className="text-gray-300">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            {/* Team Section */}
            <section className="py-16 px-4 bg-gray-900/50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center text-white">
                        Behind NITR Mart
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                name: "Nitish Kumar",
                                role: "Founder / Backend Developer",
                                bio: "Prefinal year student at NIT Rourkela, passionate about backend development and machine learning. Architected the Django REST API for NITR Mart, implementing authentication, item management, and secure user flows.",
                                icon: <i className="fas fa-server text-cyan-400 text-2xl"></i>,
                            },
                            {
                                name: "Sanchita Priyadarshinee",
                                role: "Frontend Developer",
                                bio: "Prefinal year student at NIT Rourkela with a knack for crafting intuitive UIs. Led the development of NITR Mart’s frontend using Next.js, focusing on responsive design, dynamic components, and seamless user experience.",
                                icon: <i className="fas fa-laptop-code text-emerald-400 text-2xl"></i>,
                            },
                        ].map((member, index) => (
                            <div key={index} className="bg-gray-800/30 p-8 rounded-xl border border-gray-700 hover:border-cyan-500/50 transition-all duration-300">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-lg">
                                        {member.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{member.name}</h3>
                                        <p className="text-cyan-400">{member.role}</p>
                                    </div>
                                </div>
                                <p className="text-gray-300">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* Categories Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center text-white">
                        Popular Categories
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: <BookOpen className="w-8 h-8" />, name: "Books & Notes" },
                            { icon: <Laptop className="w-8 h-8" />, name: "Electronics" },
                            { icon: <Bike className="w-8 h-8" />, name: "Vehicles" },
                            { icon: <Home className="w-8 h-8" />, name: "Furniture" },
                            { icon: <Gift className="w-8 h-8" />, name: "Gaming" },
                            { icon: <Users className="w-8 h-8" />, name: "Services" }
                        ].map((category, index) => (
                            <div
                                key={index}
                                className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 text-center cursor-pointer hover:bg-gray-800/50"
                                onClick={() => router.push('/products')}
                            >
                                <div className="flex justify-center mb-3 text-cyan-400">
                                    {category.icon}
                                </div>
                                <p className="text-white">{category.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-r from-cyan-900/30 to-emerald-900/30">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                        Ready to join the NITR Mart community?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Start buying, selling, and connecting with fellow NITians today!
                    </p>
                    <button
                        onClick={() => router.push('/auth/login')}
                        className="bg-gradient-to-r from-cyan-500 to-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-cyan-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        Get Started Now
                    </button>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;