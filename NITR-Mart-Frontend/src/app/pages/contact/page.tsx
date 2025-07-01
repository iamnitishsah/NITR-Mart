"use client";
import ProfessionalFAQ from "@/app/components/faq/page";
import {
  Mail,
  MapPin,
  MessageCircle,
  Shield,
  User,
  ArrowLeft
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  RiGithubLine,
  RiInstagramLine,
  RiLinkedinFill,
  RiTwitterXFill,
  RiWhatsappFill,
} from "react-icons/ri";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    message: "",
  });


  const router = useRouter();
//    const navigation = (path: string) => {
//        router.push(path);
//    }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendViaWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    // Format the message with all form data
    const whatsappMessage =
      `*New Contact Request*%0A%0A` +
      `*Name:* ${formData.name}%0A` +
      `*Subject:* ${formData.subject}%0A` +
      `*Message:*%0A${formData.message}`;

    // Your WhatsApp number in international format (without +)
    const whatsappNumber = "918862887291"; // Replace with your number

    // Open WhatsApp with pre-filled message
    window.open(
      `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section */}
      <section className="pt-20 pb-20 px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-b from-cyan-400 to-emerald-600 rounded-2xl mb-6 shadow-lg">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
            <button
                onClick={() => router.push("/pages/welcome")}
                className="absolute left-4 top-8 p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-emerald-300 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Have questions or feedback? We&#39;d love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Contact Form */}
            <div className="lg:w-1/2">
              <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300">
                <h2 className="text-2xl font-bold mb-8 text-white flex items-center">
                  <RiWhatsappFill className="w-6 h-6 mr-3 text-green-400" />
                  Message Us on WhatsApp
                </h2>

                <form onSubmit={sendViaWhatsApp} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-400 mb-2"
                    >
                      Your Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full pl-10 p-3 placeholder-gray-500"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-400 mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-3 placeholder-gray-500"
                      placeholder="How can we help?"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-400 mb-2"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-3 placeholder-gray-500"
                      placeholder="Write your message here..."
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-500/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center"
                  >
                    Send via WhatsApp
                    <RiWhatsappFill className="w-5 h-5 ml-2" />
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:w-1/2">
              <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 h-full hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
                <h2 className="text-2xl font-bold mb-8 text-white flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-emerald-400" />
                  Contact Information
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl flex items-center justify-center">
                        <RiWhatsappFill className="w-5 h-5 text-green-400" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-white">
                        WhatsApp
                      </h3>
                      <p className="text-gray-400 mt-1">+91 8862887291</p>
                      <p className="text-gray-400 mt-1">+91 9437160801</p>
                      <p className="text-gray-500 text-sm mt-2">
                        Fastest response time
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-xl flex items-center justify-center">
                        <Mail className="w-5 h-5 text-cyan-400" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-white">
                        Email Us
                      </h3>
                      <p className="text-gray-400 mt-1">
                        nitrmart2027@gmail.com
                      </p>
                      <p className="text-gray-500 text-sm mt-2">
                        Typically replies within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-emerald-400" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-white">
                        Visit Us
                      </h3>
                      <p className="text-gray-400 mt-1">NIT Rourkela</p>
                      <p className="text-gray-400">Rourkela, Odisha 769008</p>
                      <p className="text-gray-500 text-sm mt-2">
                        Student Activity Center
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-700/50 mt-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Connect With Us
                    </h3>
                    <div className="flex space-x-4">
                      {[
                        {
                          name: "Github",
                          href: "https://github.com/Sanchita-nitr",
                          icon: <RiGithubLine className="w-5 h-5" />,
                          color: "hover:text-gray-300",
                        },
                        {
                          name: "Twitter",
                          href: "https://x.com/123NITR",
                          icon: <RiTwitterXFill className="w-5 h-5" />,
                          color: "hover:text-black",
                        },
                        {
                          name: "Instagram",
                          href: "https://www.instagram.com/nitishadow_/",
                          icon: <RiInstagramLine className="w-5 h-5" />,
                          color: "hover:text-pink-400",
                        },
                        {
                          name: "LinkedIn",
                          href: "https://www.linkedin.com/in/iamnitishsah",
                          icon: <RiLinkedinFill className="w-5 h-5" />,
                          color: "hover:text-sky-500",
                        },
                      ].map((social, index) => (
                        <a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300`}
                          aria-label={social.name}
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ProfessionalFAQ/>
    </div>
  );
};

export default ContactPage;
