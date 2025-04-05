import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-taxmitra-blue to-taxmitra-teal rounded-2xl p-8 md:p-12 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Tax Experience?
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Join thousands of satisfied users who have simplified their tax
              management and saved money with TaxMitra's AI-powered solutions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-white text-taxmitra-blue hover:bg-white/90 text-lg px-8 py-6">
                Get Started Free
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
              >
                Schedule a Demo <ArrowRight size={20} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
