"use client"

import { useLocalization } from "@/contexts/LocalizationContext"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function LocalizationButton() {
  const [mounted, setMounted] = useState(false)
  const { language, toggleLanguage } = useLocalization()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <motion.button
      onClick={toggleLanguage}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary/50 border border-border/50 transition-all hover:bg-secondary/80 hover:border-border active:scale-95"
      aria-label={`Switch to ${language === "en" ? "German" : "English"} language`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: language === "de" ? 180 : 0,
          scale: language === "de" ? 0 : 1,
          opacity: language === "de" ? 0 : 1
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <span className="h-5 w-5 text-sm font-bold text-foreground">EN</span>
      </motion.div>
      <motion.div
        className="absolute"
        initial={false}
        animate={{
          rotate: language === "de" ? 0 : -180,
          scale: language === "de" ? 1 : 0,
          opacity: language === "de" ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <span className="h-5 w-5 text-sm font-bold text-foreground">DE</span>
      </motion.div>
    </motion.button>
  )
}
