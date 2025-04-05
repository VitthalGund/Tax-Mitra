"use client";

import { Check } from "lucide-react";

export default function StepIndicator({
  steps,
  currentStep,
  goToStep,
}) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center relative"
            style={{ width: `${100 / steps.length}%` }}
          >
            <button
              onClick={() => index < currentStep && goToStep(index)}
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${index < currentStep
                ? "bg-green-500 border-green-500 text-white cursor-pointer"
                : index === currentStep
                  ? "border-primary bg-primary text-white"
                  : "border-gray-300 bg-white text-gray-500"
                } transition-all duration-200 z-10`}
              disabled={index > currentStep}
            >
              {index < currentStep ? (
                <Check className="h-5 w-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </button>
            <span
              className={`text-xs mt-2 font-medium ${index <= currentStep ? "text-primary" : "text-gray-500"
                } text-center hidden sm:block`}
            >
              {step}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`absolute top-5 w-full h-[2px] left-1/2 ${index < currentStep ? "bg-green-500" : "bg-gray-300"
                  }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
