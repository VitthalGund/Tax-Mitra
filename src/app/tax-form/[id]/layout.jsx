import  React from "react"
import Link from "next/link"
import  { Metadata } from "next"

export const metadata = {
  title: "TaxMitra - Tax Filing",
  description: "File your taxes easily with TaxMitra",
}

export default function TaxFormLayout({
  children,
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="container mx-auto py-4 px-4 flex justify-between items-center border-b">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-[#0f3d4c]">
            TaxMitra
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Help
          </Link>
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Contact
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">{children}</main>

      {/* Footer */}
      <footer className="container mx-auto py-6 px-4 border-t mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600">© 2025 TaxMitra. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Privacy Policy
            </Link>
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

