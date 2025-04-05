import { cn } from "../../lib/utils"

import PropTypes from "prop-types";

export function FormSteps({ currentStep, steps }) {
  return (
    <div className="flex items-center justify-center w-full mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              currentStep >= index ? "bg-[#0f6e6e] text-white" : "bg-gray-200 text-gray-600",
            )}
          >
            {index + 1}
          </div>
          {index < steps.length - 1 && (
            <div className={cn("h-1 w-16 sm:w-24 md:w-32", currentStep > index ? "bg-[#0f6e6e]" : "bg-gray-200")} />
          )}
        </div>
      ))}
    </div>
  )
}

