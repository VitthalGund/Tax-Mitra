import React from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Cta = () => {
  return (
    <motion.section
      className="py-20 bg-teal-600 rounded-lg text-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="container">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Tax Experience?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of users who have simplified their taxes and
            maximized their savings with TaxMitra.
          </p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              className="bg-white text-teal-600 hover:bg-gray-100"
            >
              Start from now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-black hover:text-white border-white bg-black/0 hover:bg-white/50"
            >
              Schedule a Demo
            </Button>
          </motion.div>

          <motion.p
            className="mt-6 text-sm opacity-80"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            viewport={{ once: true }}
          >
            No credit card required. Free trial includes all features for 14
            days.
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Cta;
