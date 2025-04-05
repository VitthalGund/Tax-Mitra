import { CheckCircle } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

export default function UserSpecificBenifit() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Tailored for Your Needs</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're an individual or a business, TaxMitra has solutions
            designed specifically for you.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Individual Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Card className="overflow-hidden">
              <div className="bg-teal-600 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">For Individuals</h3>
                <p>Simplify personal taxes and maximize your refund</p>
              </div>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {[
                    "Personal income tax optimization",
                    "Investment tax planning",
                    "Retirement account optimization",
                    "Life event tax guidance (marriage, home purchase)",
                    "Simple, guided tax filing",
                  ].map((text, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6 bg-teal-600 py-5 hover:bg-teal-700">
                  Get Started as Individual
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Business Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <Card className="overflow-hidden">
              <div className="bg-teal-800 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">For Businesses</h3>
                <p>Comprehensive tax solutions for companies of all sizes</p>
              </div>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {[
                    "Business expense categorization",
                    "GST/HST compliance and filing",
                    "Payroll tax management",
                    "Corporate tax structure optimization",
                    "Year-round tax planning and forecasting",
                  ].map((text, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6 bg-teal-800 py-5 hover:bg-teal-900">
                  Get Started as Business
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
