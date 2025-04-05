"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PersonalInfoFormProps {
  onNext: (data: any) => void
}

export default function PersonalInfoForm({ onNext }: PersonalInfoFormProps) {
  const [formData, setFormData] = useState({
    pan: "",
    aadhaar: "",
    name: "",
    dob: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    residentialStatus: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext(formData)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="pan">PAN (Permanent Account Number)*</Label>
              <Input id="pan" placeholder="ABCDE1234F" required value={formData.pan} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="aadhaar">Aadhaar Number*</Label>
              <Input
                id="aadhaar"
                placeholder="1234 5678 9012"
                required
                value={formData.aadhaar}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Full Name*</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth*</Label>
              <Input id="dob" type="date" required value={formData.dob} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address*</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number*</Label>
              <Input
                id="mobile"
                placeholder="+91 9876543210"
                required
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address*</Label>
              <Input
                id="address"
                placeholder="Enter your address"
                required
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City*</Label>
              <Input id="city" placeholder="Enter your city" required value={formData.city} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State*</Label>
              <Select onValueChange={(value) => handleSelectChange("state", value)}>
                <SelectTrigger id="state">
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="andhra-pradesh">Andhra Pradesh</SelectItem>
                  <SelectItem value="delhi">Delhi</SelectItem>
                  <SelectItem value="karnataka">Karnataka</SelectItem>
                  <SelectItem value="maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                  <SelectItem value="telangana">Telangana</SelectItem>
                  <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                  <SelectItem value="west-bengal">West Bengal</SelectItem>
                  {/* Add more states as needed */}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pincode">PIN Code*</Label>
              <Input
                id="pincode"
                placeholder="Enter PIN code"
                required
                value={formData.pincode}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="residentialStatus">Residential Status*</Label>
              <Select onValueChange={(value) => handleSelectChange("residentialStatus", value)}>
                <SelectTrigger id="residentialStatus">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="resident">Resident</SelectItem>
                  <SelectItem value="non-resident">Non-Resident</SelectItem>
                  <SelectItem value="resident-not-ordinarily-resident">Resident but Not Ordinarily Resident</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button type="submit" className="bg-[#0f6e6e] hover:bg-[#0c5c5c]">
              Continue to Income Details
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

