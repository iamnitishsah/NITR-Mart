import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ProfessionalFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Simply click on the 'Sign Up' button and use your @nitrkl.ac.in email address to register. You'll receive a verification email to activate your account within minutes."
    },
    {
      question: "Is NITR Mart only for NIT Rourkela students?",
      answer: "Yes, our platform is exclusively designed for current students, alumni, and faculty of NIT Rourkela. This ensures a trusted community environment for all transactions."
    },
    {
      question: "How are payments handled?",
      answer: "We recommend secure cash transactions conducted in person at safe campus locations. Always meet in well-lit, public areas such as the library, cafeteria, or academic buildings during regular hours."
    },
    {
      question: "What items are prohibited?",
      answer: "We maintain strict guidelines prohibiting illegal items, alcohol, drugs, weapons, or any materials violating campus policies. Academic materials, electronics, books, and personal items are welcome."
    },
    {
      question: "How do I report suspicious activity?",
      answer: "Use our built-in reporting system or contact our support team immediately. We take all reports seriously and investigate within 24 hours to maintain platform safety."
    },
    {
      question: "Can I edit or delete my listings?",
      answer: "Yes, you have full control over your listings. You can edit details, update prices, mark items as sold, or delete listings entirely from your dashboard at any time."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-blue-900/20 to-cyan-900/20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.1),transparent_50%)] pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Find answers to common questions about NITR Mart. Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10"
            >
              {/* Question Header */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:ring-inset transition-all duration-200"
              >
                <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors duration-200 pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800/50 flex items-center justify-center group-hover:bg-cyan-500/20 transition-all duration-200">
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-cyan-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-cyan-400" />
                  )}
                </div>
              </button>

              {/* Answer Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-8 pb-6 pt-2 border-t border-gray-700/30">
                  <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Our support team is here to help you with any questions or concerns about NITR Mart.
            </p>
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}