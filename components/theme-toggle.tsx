"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <motion.button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary/50 border border-border/50 transition-all hover:bg-secondary/80 hover:border-border active:scale-95"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: theme === "dark" ? 180 : 0,
          scale: theme === "dark" ? 0 : 1,
          opacity: theme === "dark" ? 0 : 1
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Sun className="h-5 w-5 text-foreground" />
      </motion.div>
      <motion.div
        className="absolute"
        initial={false}
        animate={{ 
          rotate: theme === "dark" ? 0 : -180,
          scale: theme === "dark" ? 1 : 0,
          opacity: theme === "dark" ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Moon className="h-5 w-5 text-foreground" />
      </motion.div>
    </motion.button>
  )
}
