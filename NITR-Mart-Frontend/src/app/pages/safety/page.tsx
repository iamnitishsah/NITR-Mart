"use client";
import { Shield, Users, CheckCircle2, AlertTriangle, Mail, MapPin, Eye, Lock, HeartHandshake } from "lucide-react";

export default function SafetyGuidelines() {
  const guidelines = [
    {
      icon: Users,
      title: "Meet in Safe, Public Places",
      color: "from-green-500 to-emerald-600",
      tips: [
        "Always meet on campus in well-lit, public areas (hostel lobbies, canteens, library, academic blocks)",
        "Avoid secluded spots and never invite strangers to your hostel room",
        "Inform a friend or roommate about your meeting location and time",
        "Choose busy hours when more people are around"
      ]
    },
    {
      icon: CheckCircle2,
      title: "Verify Items Before Payment",
      color: "from-blue-500 to-cyan-600",
      tips: [
        "Inspect the item thoroughly before making any payment",
        "Test electronics, check for damages, missing parts, or wear",
        "Ask for original receipts, warranty cards, or purchase proof",
        "Never pay in advance for items you haven't personally examined"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Beware of Scams & Fraud",
      color: "from-orange-500 to-red-600",
      tips: [
        "Never share your OTP, bank details, passwords, or personal information",
        "Be extremely cautious of deals that seem too good to be true",
        "Verify seller identity through their NITR email and student ID",
        "Report suspicious users, fake profiles, or fraudulent listings immediately"
      ]
    },
    {
      icon: Lock,
      title: "Secure Communication",
      color: "from-purple-500 to-violet-600",
      tips: [
        "Use only the in-app messaging system for initial communication",
        "Keep all transaction records and conversations",
        "Don't share personal phone numbers until you're comfortable",
        "Screenshot important details and conversations"
      ]
    }
  ];

  const emergencyContacts = [
    {
      icon: Mail,
      title: "NITR Mart Support",
      contact: "nitrmart2027@gmail.com",
      description: "For platform issues and user reports"
    },
    {
      icon: MapPin,
      title: "Safe Meeting Spots",
      contact: "Library, Canteens, Hostels",
      description: "Recommended public locations"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16 px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.1),transparent_50%)] pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-full mb-6 backdrop-blur-xl border border-cyan-500/30">
            <Shield className="w-10 h-10 text-cyan-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent mb-4">
            Safety Guidelines
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            NITR Mart is committed to providing a safe and trusted marketplace for all students. 
            Follow these comprehensive guidelines to ensure your safety and the safety of others while buying or selling on campus.
          </p>
        </div>

        {/* Main Guidelines Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {guidelines.map((guideline, index) => {
            const IconComponent = guideline.icon;
            return (
              <div
                key={index}
                className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${guideline.color} flex items-center justify-center mr-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">
                    {guideline.title}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {guideline.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start text-gray-300">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></div>
                      <span className="leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Emergency Contacts Section */}
        <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 mb-12">
          <div className="flex items-center mb-8">
            <HeartHandshake className="w-8 h-8 text-red-400 mr-3" />
            <h2 className="text-2xl font-bold text-white">Need Help? Contact Us</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {emergencyContacts.map((contact, index) => {
              const IconComponent = contact.icon;
              return (
                <div key={index} className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700/30">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{contact.title}</h3>
                  <p className="text-cyan-400 font-medium mb-2">{contact.contact}</p>
                  <p className="text-gray-400 text-sm">{contact.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 mb-12">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Eye className="w-6 h-6 text-cyan-400 mr-3" />
            Additional Resources
          </h3>
          <div className="">
           
            <div>
              <h4 className="text-lg font-medium text-cyan-400 mb-3">Report Issues</h4>
              <p className="text-gray-300 mb-4">
                If you encounter any safety concerns, suspicious activity, or need assistance:
              </p>
              <a 
                href="mailto:nitrmart2027@gmail.com" 
                className="inline-flex items-center bg-gradient-to-r from-red-500/20 to-orange-600/20 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg hover:border-red-400/50 transition-all duration-200"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Report Immediately
              </a>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-2xl p-8">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Your Safety is Our Priority
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
            Stay safe, be smart, and enjoy your campus marketplace experience! Remember, when in doubt, 
            trust your instincts and prioritize your safety above any transaction.
          </p>
        </div>
      </div>
    </div>
  );
}