import {
  Sparkles,
  FileText,
  Calendar,
  Shield,
  MessageSquare,
  BarChart3,
} from "lucide-react";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function Fetures() {
  const features = [
    {
      icon: <Sparkles className="h-10 w-10 text-teal-600 mb-2" />,
      title: "AI-Driven Tax Optimization",
      description:
        "Our AI analyzes your financial data to identify all possible deductions and credits, ensuring you never pay more than necessary.",
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-teal-600 mb-2" />,
      title: "Smart Investment Tips",
      description:
        "Receive personalized investment recommendations that align with your financial goals and maximize tax benefits.",
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-teal-400 mb-2" />,
      title: "24/7 Live Support",
      description:
        "Get instant answers to your tax questions anytime, day or night, with our always-available AI assistant.",
    },
    {
      icon: <Shield className="h-10 w-10 text-teal-400 mb-2" />,
      title: "Compliance Alerts",
      description:
        "Stay ahead of changing tax laws with real-time notifications about regulatory updates that affect your tax situation.",
    },
    {
      icon: <FileText className="h-10 w-10 text-teal-400 mb-2" />,
      title: "Automated Filing",
      description:
        "Complete your tax returns with minimal effort through our streamlined, AI-guided filing process.",
    },
    {
      icon: <Calendar className="h-10 w-10 text-teal-400 mb-2" />,
      title: "Personalized Financial Insights",
      description:
        "Gain valuable insights into financial health with custom reports and recommendations tailored to unique situation.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            TaxMitra combines cutting-edge AI with tax expertise to deliver a
            comprehensive solution for all your tax needs.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <Card className="overflow-hidden group  hover:bg-gradient-to-tr hover:from-taxmitra-blue hover:to-taxmitra-teal ease-in-out duration-1000 shadow-lg transition-transform  hover:scale-[1.02]">
                <CardHeader className="pb-2 group-hover:text-white">
                  {feature.icon}
                  <CardTitle className="group-hover:text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base group-hover:text-white">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
