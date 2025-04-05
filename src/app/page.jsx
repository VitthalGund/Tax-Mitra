"use client";
import HowItWorks from "@/components/Home/howitworks";
import Herosection from "@/components/Home/Herosection";
import Fetures from "@/components/Home/Fetures";
import Testimonial from "@/components/Home/Testimonial";
import UserSpecificBenifit from "@/components/Home/UserSpecificBenifit";
import Cta from "@/components/Home/CTA";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col ">
      <main className="flex-1 p-20 md:p-32 bg-gradient-to-b  from-white to-teal-50">
        {/* Hero Section */}
       <Herosection/>
        {/* Features Section */}
       <Fetures/>

        {/* How It Works */}
        <HowItWorks />

        {/* Testimonials */}
       <Testimonial />

        {/* User-specific Benefits */}
        <UserSpecificBenifit />

        {/* CTA Section */}
        <Cta/>
      </main>

      {/* Footer */}
    </div>
  );
}
