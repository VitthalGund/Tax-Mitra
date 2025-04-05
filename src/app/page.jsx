"use client";
import HowItWorks from "../components/home/howitworks";
import Herosection from "../components/home/Herosection";
import Fetures from "../components/home/Fetures";
import Testimonial from "../components/home/Testimonial";
import UserSpecificBenifit from "../components/home/UserSpecificBenifit";
import Cta from "../components/home/Cta";
import ChatBot from "./bot";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col ">
      <main className="flex-1 p-20 md:p-32 bg-gradient-to-b  from-white to-teal-50">
        <ChatBot />
        {/* Hero Section */}
        <Herosection />
        {/* Features Section */}
        <Fetures />

        {/* How It Works */}
        <HowItWorks />

        {/* Testimonials */}
        <Testimonial />

        {/* User-specific Benefits */}
        <UserSpecificBenifit />

        {/* CTA Section */}
        <Cta />
      </main>

      {/* Footer */}
    </div>
  );
}
