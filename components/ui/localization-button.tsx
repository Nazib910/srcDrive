"use client"

import { useLocalization } from "@/contexts/LocalizationContext"
import { Switch } from "@/components/ui/switch"

export function LocalizationButton() {
  const { language, toggleLanguage } = useLocalization()

  return (
    <div className="flex items-center space-x-2 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
      <span
        className={`text-sm font-bold transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${language === "de" ? "text-[#A1A1AA] scale-75" : "text-foreground scale-100"
          }`}
      >
        EN
      </span>
      <Switch
        checked={language === "de"}
        onCheckedChange={toggleLanguage}
        aria-label="Toggle language"
        className="transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110"
      />
      <span
        className={`text-sm font-bold transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${language === "en" ? "text-[#A1A1AA] scale-75" : "text-foreground scale-100"
          }`}
      >
        DE
      </span>
    </div>
  )
}
