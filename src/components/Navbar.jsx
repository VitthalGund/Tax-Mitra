"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser, useClerk, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import useGoogleTranslate from "@/hooks/useGoogleTranslate";

export default function Navbar() {
  useGoogleTranslate();
  const { user } = useUser();
  const { signOut } = useClerk();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const lang = document.querySelector(".goog-te-combo")?.value;
     
    });
    const el = document.getElementById("google_translate_element");
    if (el) observer.observe(el, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  const openLangDropdown = () => {
    const combo = document.querySelector(".goog-te-combo");
    if (combo instanceof HTMLSelectElement) {
      combo.focus();
    }
    combo?.focus();
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-taxmitra-blue to-taxmitra-teal bg-clip-text text-transparent">
             <Link href={'/'}>TaxMitra</Link> 
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {["#features", "#how-it-works", "#testimonials", "#faq"].map((href, i) => (
              <a
                key={i}
                href={href}
                className="text-gray-600 hover:text-taxmitra-blue transition-colors"
              >
                {href.replace("#", "").replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
              </a>
            ))}
          </nav>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedOut>
              <Button variant="outline" className="border-taxmitra-blue text-taxmitra-blue hover:bg-taxmitra-blue/10">
                <Link href="/sign-in">Log In</Link>
              </Button>
              <Button className="bg-gradient-to-r from-taxmitra-blue to-taxmitra-teal text-white hover:opacity-90">
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            {/* Language dropdown */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={openLangDropdown}>
              <span className="text-xl">🌐</span>
              <div id="google_translate_element" className="hidden md:block" />
              
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              {["#features", "#how-it-works", "#testimonials", "#faq"].map((href, i) => (
                <a
                  key={i}
                  href={href}
                  className="text-gray-600 hover:text-taxmitra-blue transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {href.replace("#", "").replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                </a>
              ))}
            </nav>
            <div className="flex flex-col space-y-2 mt-4">
              <SignedOut>
                <Button variant="outline" className="border-taxmitra-blue text-taxmitra-blue hover:bg-taxmitra-blue/10 w-full">
                  <Link href="/sign-in">Log In</Link>
                </Button>
                <Button className="bg-gradient-to-r from-taxmitra-blue to-taxmitra-teal text-white hover:opacity-90 w-full">
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>

              {/* Language dropdown in mobile */}
              <div className="flex items-center gap-2 mt-2 cursor-pointer" onClick={openLangDropdown}>
                <span className="text-xl">🌐</span>
                <div id="google_translate_element" />
               
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
