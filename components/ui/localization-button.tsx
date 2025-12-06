"use client"

import { useLocalization } from "@/contexts/LocalizationContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { USFlag, DEFlag } from "@/components/ui/icons"

import { Globe } from "lucide-react"

export function LocalizationButton() {
  const { setLanguage, language } = useLocalization()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-9 px-0">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[10000]">
        <DropdownMenuItem onClick={() => setLanguage("en")}>
          <USFlag className="mr-2 h-4 w-4 rounded-sm object-cover" />
          <span>ENG</span>
          {language === "en" && <span className="ml-auto text-xs opacity-50">Active</span>}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("de")}>
          <DEFlag className="mr-2 h-4 w-4 rounded-sm object-cover" />
          <span>DE</span>
          {language === "de" && <span className="ml-auto text-xs opacity-50">Active</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
