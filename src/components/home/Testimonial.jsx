import { CheckCircle } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
    },
  }),
};

export default function Testimonial() {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Small Business Owner",
      feedback:
        "TaxMitra saved my business over ₹75,000 in taxes last year! The AI found deductions my previous accountant missed, and the filing process was incredibly simple.",
    },
    {
      name: "Rajiv Mehta",
      role: "IT Professional",
      feedback:
        "As someone with investments across multiple platforms, tax season used to be a nightmare. TaxMitra consolidated everything and provided clear guidance that maximized my returns.",
    },
    {
      name: "Ananya Patel",
      role: "Freelance Designer",
      feedback:
        "The 24/7 support is a game-changer. I had questions at midnight before a deadline, and TaxMitra's AI gave me accurate answers instantly. No more tax anxiety!",
    },
  ];

  return (
    <motion.section
      id="testimonials"
      className="py-20 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
    >
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied users who have simplified their tax
            management with TaxMitra.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              className="hover:scale-[1.02] transition-transform duration-300"
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                    <div>
                      <h4 className="font-medium">{t.name}</h4>
                      <p className="text-sm text-gray-500">{t.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">"{t.feedback}"</p>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, j) => (
                      <CheckCircle
                        key={j}
                        className="h-5 w-5 text-yellow-500"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
