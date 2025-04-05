"use client";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle,
  FileText,
  MessageSquare,
  Shield,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col ">
      <main className="flex-1 p-20 md:p-32 bg-gradient-to-b  from-white to-teal-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden ">
          <div className="container relative z-10">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
              <div className="flex flex-col gap-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Simplify Your Taxes, Maximize Your Savings
                </h1>
                <p className="text-lg text-gray-600 md:text-xl">
                  TaxMitra is your AI-powered tax assistant that analyzes your
                  financial records, suggests the best tax-saving schemes, and
                  automates tax filing in compliance with local regulations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <Link href={"/onboard"}>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-taxmitra-blue to-taxmitra-teal hover:from-taxmitra-teal hover:to-taxmitra-blue"
                    >
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>{" "}
                  </Link>
                  <Button size="lg" variant="outline">
                    Chat with TaxMitra{" "}
                    <MessageSquare className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-lg bg-white p-6 shadow-xl">
                  <div className="flex items-center gap-4 border-b pb-4">
                    <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">TaxMitra AI</h3>
                      <p className="text-sm text-gray-500">Online now</p>
                    </div>
                  </div>
                  <div className="space-y-4 py-4">
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                        <Sparkles className="h-4 w-4 text-teal-600" />
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">
                          Hello! I'm TaxMitra, your AI tax assistant. How can I
                          help you today?
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 justify-end">
                      <div className="bg-teal-100 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">
                          I need help finding tax deductions for my small
                          business.
                        </p>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                        <span className="text-sm font-medium">You</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                        <Sparkles className="h-4 w-4 text-teal-600" />
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">
                          I can help with that! Based on your business type,
                          here are 5 potential deductions you might qualify
                          for...
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Ask about your taxes..."
                        className="w-full rounded-full border border-gray-300 py-2 pl-4 pr-10 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                      />
                      <Button
                        size="sm"
                        className="absolute right-1 top-1 h-7 w-7 rounded-full p-0 bg-teal-600"
                      >
                        <ArrowRight className="h-4 w-4" />
                        <span className="sr-only">Send</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                TaxMitra combines cutting-edge AI with tax expertise to deliver
                a comprehensive solution for all your tax needs.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <Sparkles className="h-10 w-10 text-teal-600 mb-2" />
                  <CardTitle>AI-Driven Tax Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Our AI analyzes your financial data to identify all possible
                    deductions and credits, ensuring you never pay more than
                    necessary.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <BarChart3 className="h-10 w-10 text-teal-600 mb-2" />
                  <CardTitle>Smart Investment Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Receive personalized investment recommendations that align
                    with your financial goals and maximize tax benefits.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <MessageSquare className="h-10 w-10 text-teal-600 mb-2" />
                  <CardTitle>24/7 Live Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Get instant answers to your tax questions anytime, day or
                    night, with our always-available AI assistant.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <Shield className="h-10 w-10 text-teal-600 mb-2" />
                  <CardTitle>Compliance Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Stay ahead of changing tax laws with real-time notifications
                    about regulatory updates that affect your tax situation.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <FileText className="h-10 w-10 text-teal-600 mb-2" />
                  <CardTitle>Automated Filing</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Complete your tax returns with minimal effort through our
                    streamlined, AI-guided filing process.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <Calendar className="h-10 w-10 text-teal-600 mb-2" />
                  <CardTitle>Personalized Financial Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Gain valuable insights into your financial health with
                    custom reports and recommendations tailored to your unique
                    situation.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 bg-gray-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                TaxMitra makes tax management effortless in just a few simple
                steps.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="bg-white rounded-lg p-8 shadow-sm relative">
                <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-teal-600 text-white flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold mb-4 mt-4">
                  Connect Your Data
                </h3>
                <p className="text-gray-600">
                  Securely link your financial accounts or upload documents.
                  TaxMitra's AI will analyze your information with bank-level
                  security.
                </p>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-sm relative">
                <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-teal-600 text-white flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold mb-4 mt-4">AI Analysis</h3>
                <p className="text-gray-600">
                  Our advanced AI examines your financial data, identifies
                  opportunities, and creates a personalized tax strategy.
                </p>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-sm relative">
                <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-teal-600 text-white flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold mb-4 mt-4">Optimize & File</h3>
                <p className="text-gray-600">
                  Review AI-generated recommendations, approve your optimized
                  tax plan, and file with confidence through our automated
                  system.
                </p>
              </div>
            </div>
            <div className="mt-12 text-center">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                See TaxMitra in Action
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands of satisfied users who have simplified their tax
                management with TaxMitra.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                    <div>
                      <h4 className="font-medium">Priya Sharma</h4>
                      <p className="text-sm text-gray-500">
                        Small Business Owner
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "TaxMitra saved my business over ₹75,000 in taxes last year!
                    The AI found deductions my previous accountant missed, and
                    the filing process was incredibly simple."
                  </p>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <CheckCircle
                        key={i}
                        className="h-5 w-5 text-yellow-500"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                    <div>
                      <h4 className="font-medium">Rajiv Mehta</h4>
                      <p className="text-sm text-gray-500">IT Professional</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "As someone with investments across multiple platforms, tax
                    season used to be a nightmare. TaxMitra consolidated
                    everything and provided clear guidance that maximized my
                    returns."
                  </p>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <CheckCircle
                        key={i}
                        className="h-5 w-5 text-yellow-500"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                    <div>
                      <h4 className="font-medium">Ananya Patel</h4>
                      <p className="text-sm text-gray-500">
                        Freelance Designer
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "The 24/7 support is a game-changer. I had questions at
                    midnight before a deadline, and TaxMitra's AI gave me
                    accurate answers instantly. No more tax anxiety!"
                  </p>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <CheckCircle
                        key={i}
                        className="h-5 w-5 text-yellow-500"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* User-specific Benefits */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Tailored for Your Needs
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Whether you're an individual or a business, TaxMitra has
                solutions designed specifically for you.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="overflow-hidden">
                <div className="bg-teal-600 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">For Individuals</h3>
                  <p>Simplify personal taxes and maximize your refund</p>
                </div>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                      <span>Personal income tax optimization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                      <span>Investment tax planning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                      <span>Retirement account optimization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                      <span>
                        Life event tax guidance (marriage, home purchase)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                      <span>Simple, guided tax filing</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-teal-600 py-5 hover:bg-teal-700">
                    Get Started as Individual
                  </Button>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <div className="bg-teal-800 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">For Businesses</h3>
                  <p>Comprehensive tax solutions for companies of all sizes</p>
                </div>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                      <span>Business expense categorization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                      <span>GST/HST compliance and filing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                      <span>Payroll tax management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                      <span>Corporate tax structure optimization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                      <span>Year-round tax planning and forecasting</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-teal-800 py-5 hover:bg-teal-900">
                    Get Started as Business
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-teal-600 rounded-lg text-white">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your Tax Experience?
              </h2>
              <p className="text-xl mb-8">
                Join thousands of users who have simplified their taxes and
                maximized their savings with TaxMitra.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-teal-600 hover:bg-gray-100"
                >
                  Start Free Trial
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-black hover:text-white border-white hover:bg-teal-700"
                >
                  Schedule a Demo
                </Button>
              </div>
              <p className="mt-6 text-sm opacity-80">
                No credit card required. Free trial includes all features for 14
                days.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
    </div>
  );
}
