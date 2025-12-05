"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useLocalization } from "@/contexts/LocalizationContext"

export function StickyFooter() {
  const { t } = useLocalization()
  const [isAtBottom, setIsAtBottom] = useState(false)
  const [footerHeight, setFooterHeight] = useState(240)
  const [maxTranslateY, setMaxTranslateY] = useState(240) // Start hidden

  useEffect(() => {
    // Calculate footer height based on screen size
    const calculateFooterHeight = () => {
      if (window.innerWidth >= 768) return 320 // md:h-80
      if (window.innerWidth >= 640) return 288 // sm:h-72
      return 240 // h-60
    }
    
    setFooterHeight(calculateFooterHeight())
    
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY
          const windowHeight = window.innerHeight
          const documentHeight = document.documentElement.scrollHeight
          const isNearBottom = scrollTop + windowHeight >= documentHeight - 100

          // Calculate how much the footer can move up without overlapping contact section
          const contactSection = document.getElementById("contact")
          const currentFooterHeight = calculateFooterHeight()
          
          if (isNearBottom) {
            // Always show footer when at bottom, but limit if contact section is visible
            if (contactSection) {
              const contactRect = contactSection.getBoundingClientRect()
              const contactBottom = contactRect.bottom // Bottom of contact section relative to viewport
              const viewportBottom = windowHeight
              
              // Calculate available space from viewport bottom to contact section bottom
              // This is how much space the footer can occupy without overlapping
              const availableSpace = viewportBottom - contactBottom
              
              // Only allow footer to move up as much as the available space allows
              // If available space is less than footer height, limit the movement
              // maxTranslateY represents how much we should keep the footer down (in pixels)
              // 0 = fully visible, currentFooterHeight = completely hidden
              if (availableSpace < currentFooterHeight && availableSpace > 0) {
                // Keep footer down by the difference so it doesn't overlap contact section
                const keepDown = currentFooterHeight - availableSpace
                setMaxTranslateY(keepDown)
              } else {
                // Enough space or contact section is above viewport, footer can fully show
                setMaxTranslateY(0)
              }
            } else {
              // No contact section found, show footer fully
              setMaxTranslateY(0)
            }
          } else {
            // Not at bottom, keep footer hidden
            setMaxTranslateY(currentFooterHeight)
          }

          setIsAtBottom(isNearBottom)
          ticking = false
        })
        ticking = true
      }
    }

    const handleResize = () => {
      setFooterHeight(calculateFooterHeight())
      handleScroll()
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize, { passive: true })
    handleScroll() // Check initial state
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <AnimatePresence>
      {isAtBottom && (
        <motion.div
          className="fixed z-50 bottom-0 left-0 w-full h-60 sm:h-72 md:h-80 flex justify-center items-center bg-primary"
          initial={{ y: footerHeight }}
          animate={{ y: maxTranslateY }}
          exit={{ y: footerHeight }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="relative overflow-hidden w-full h-full flex justify-end px-4 sm:px-8 md:px-12 text-right items-start py-6 sm:py-8 md:py-12 text-primary-foreground">
            <motion.div
              className="flex flex-row space-x-6 sm:space-x-12 md:space-x-16 lg:space-x-24 text-xs sm:text-sm md:text-base lg:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <ul className="space-y-1 sm:space-y-2">
                <li className="hover:underline cursor-pointer transition-colors">{t('footer.about')}</li>
                <li className="hover:underline cursor-pointer transition-colors">{t('footer.services')}</li>
                <li className="hover:underline cursor-pointer transition-colors">{t('footer.contact')}</li>
              </ul>
              <ul className="space-y-1 sm:space-y-2">
                <li className="hover:underline cursor-pointer transition-colors">{t('footer.github')}</li>
                <li className="hover:underline cursor-pointer transition-colors">{t('footer.twitter')}</li>
                <li className="hover:underline cursor-pointer transition-colors">{t('footer.linkedin')}</li>
              </ul>
            </motion.div>
            <motion.h2
              className="absolute bottom-0 left-0 translate-y-1/3 text-4xl sm:text-[96px] md:text-[128px] lg:text-[192px] font-bold select-none text-primary-foreground"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              SRCDrive
            </motion.h2>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
