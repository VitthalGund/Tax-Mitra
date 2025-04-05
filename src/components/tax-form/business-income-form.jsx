"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function BusinessIncomeForm({ onSave, onComplete }) {
  const [formData, setFormData] = useState({
    grossTurnover: "",
    cogs: "",
    operatingExpenses: {
      rentSalaries: "",
      marketing: "",
      adminExpenses: "",
      otherBusinessExpenses: "",
    },
    depreciationAmortization: "",
    otherAdjustments: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id.replace("-", "")]: value }));
  };

  const handleExpenseChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      operatingExpenses: {
        ...prev.operatingExpenses,
        [id]: value,
      },
    }));
  };

  const handleSaveAndContinue = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleComplete = (e) => {
    e.preventDefault();
    onComplete(formData);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSaveAndContinue}>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="gross-turnover">Gross Turnover/Receipts</Label>
              <Input
                id="gross-turnover"
                type="number"
                placeholder="Enter total business income before deductions"
                value={formData.grossTurnover}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cogs">Cost of Goods Sold (COGS)</Label>
              <Input
                id="cogs"
                type="number"
                placeholder="Enter direct costs related to production"
                value={formData.cogs}
                onChange={handleChange}
              />
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="operating-expenses">
                <AccordionTrigger className="text-lg font-medium">
                  Operating Expenses
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="rentSalaries">
                        Rent, Salaries, and Utilities
                      </Label>
                      <Input
                        id="rentSalaries"
                        type="number"
                        placeholder="Enter amount"
                        value={formData.operatingExpenses.rentSalaries}
                        onChange={handleExpenseChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="marketing">Marketing/Advertising</Label>
                      <Input
                        id="marketing"
                        type="number"
                        placeholder="Enter amount"
                        value={formData.operatingExpenses.marketing}
                        onChange={handleExpenseChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="adminExpenses">
                        Administrative Expenses
                      </Label>
                      <Input
                        id="adminExpenses"
                        type="number"
                        placeholder="Enter amount"
                        value={formData.operatingExpenses.adminExpenses}
                        onChange={handleExpenseChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="otherBusinessExpenses">
                        Other Business-related Expenses
                      </Label>
                      <Input
                        id="otherBusinessExpenses"
                        type="number"
                        placeholder="Enter amount"
                        value={formData.operatingExpenses.otherBusinessExpenses}
                        onChange={handleExpenseChange}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="space-y-2">
              <Label htmlFor="depreciation-amortization">
                Depreciation/Amortization
              </Label>
              <Input
                id="depreciation-amortization"
                type="number"
                placeholder="Enter amount based on assets used in business"
                value={formData.depreciationAmortization}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="other-adjustments">
                Other Adjustments/Allowances
              </Label>
              <Input
                id="other-adjustments"
                type="number"
                placeholder="Enter incentives, subsidies, or specific tax adjustments"
                value={formData.otherAdjustments}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <Button
              type="button"
              variant="outline"
              className="border-[#0f6e6e] text-[#0f6e6e]"
            >
              Save as Draft
            </Button>
            <div className="space-x-4">
              <Button
                type="submit"
                variant="outline"
                className="border-[#0f6e6e] text-[#0f6e6e]"
              >
                Save and Continue to Next Section
              </Button>
              <Button
                type="button"
                className="bg-[#0f6e6e] hover:bg-[#0c5c5c]"
                onClick={handleComplete}
              >
                Submit All Income Details
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
