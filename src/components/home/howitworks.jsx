import React from "react";
import { CheckIcon } from "lucide-react";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Connect Your Data",
      description:
        "Securely link your financial accounts or upload documents. TaxMitra's AI will analyze your information with bank-level security.",
    },
    {
      number: "02",
      title: "AI Analysis & Recommendations",
      description:
        "Our advanced AI examines your financial data, identifies opportunities, and creates a personalized tax strategy.",
    },
    {
      number: "03",
      title: "Optimize & File",
      description:
        "Review AI-generated recommendations, approve your optimized tax plan, and file with confidence through our automated system.",
    },
  ];

  return (
    <motion.section
      id="how-it-works"
      className="py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How{" "}
            <span className="bg-gradient-to-r from-taxmitra-blue to-taxmitra-teal bg-clip-text text-transparent">
              TaxMitra
            </span>{" "}
            Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our streamlined process makes tax management effortless and
            intelligent, from data gathering to filing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative w-full max-w-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 h-full">
                <div className="w-12 h-12 bg-gradient-to-r from-taxmitra-blue to-taxmitra-teal rounded-full flex items-center justify-center text-white font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold pt-5 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <div className="w-6 h-6 bg-taxmitra-teal text-white rounded-full flex items-center justify-center">
                    <CheckIcon size={14} />
                  </div>
                  <div className="w-16 h-0.5 bg-taxmitra-teal absolute top-1/2 left-6"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default HowItWorks;
