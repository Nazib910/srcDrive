"use client"

import { motion } from "framer-motion"
import { useLocalization } from "@/contexts/LocalizationContext"

export function StickyFooter() {
  const { t } = useLocalization()

  return (
    <motion.footer
      className="relative w-full h-60 sm:h-72 md:h-80 bg-primary overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="relative w-full h-full flex justify-end px-4 sm:px-8 md:px-12 text-right items-start py-6 sm:py-8 md:py-12 text-primary-foreground">
        {/* Links Section - Slides in from right */}
        <motion.div
          className="flex flex-row space-x-6 sm:space-x-12 md:space-x-16 lg:space-x-24 text-xs sm:text-sm md:text-base lg:text-lg z-10"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <ul className="space-y-1 sm:space-y-2">
            <motion.li
              className="hover:underline cursor-pointer transition-colors"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ x: -5 }}
            >
              {t('footer.about')}
            </motion.li>
            <motion.li
              className="hover:underline cursor-pointer transition-colors"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ x: -5 }}
            >
              {t('footer.services')}
            </motion.li>
            <motion.li
              className="hover:underline cursor-pointer transition-colors"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ x: -5 }}
            >
              {t('footer.contact')}
            </motion.li>
          </ul>

          <ul className="space-y-1 sm:space-y-2">
            <motion.li
              className="hover:underline cursor-pointer transition-colors"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ x: -5 }}
            >
              {t('footer.github')}
            </motion.li>
            <motion.li
              className="hover:underline cursor-pointer transition-colors"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ x: -5 }}
            >
              {t('footer.twitter')}
            </motion.li>
            <motion.li
              className="hover:underline cursor-pointer transition-colors"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ x: -5 }}
            >
              {t('footer.linkedin')}
            </motion.li>
          </ul>
        </motion.div>

        {/* Large Brand Text - Slides in from left */}
        <motion.h2
          className="absolute bottom-0 left-0 translate-y-1/3 text-4xl sm:text-[96px] md:text-[128px] lg:text-[192px] font-bold select-none text-primary-foreground"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1] // Custom easing for smooth effect
          }}
        >
          SRCDrive
        </motion.h2>
      </div>
    </motion.footer>
  )
}
