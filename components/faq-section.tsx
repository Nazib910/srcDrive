"use client"

import { useState } from "react"
import { useLocalization } from "@/contexts/LocalizationContext"
import { Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

export function FAQSection() {
  const { t } = useLocalization()
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const faqs = [
    {
      question: "What services does SRCDrive offer?",
      answer:
        "We provide comprehensive web development, mobile app development, UI/UX design, cloud solutions, and custom software development services tailored to your business needs.",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Project timelines vary based on scope and complexity. We provide detailed estimates upfront and maintain regular communication throughout development to ensure on-time delivery.",
    },
    {
      question: "Do you work with startups and enterprises?",
      answer:
        "Yes! We work with businesses of all sizes, from early-stage startups to established enterprises. We scale our approach based on your specific needs and budget.",
    },
    {
      question: "What is your process for understanding project requirements?",
      answer:
        "We start with an in-depth discovery phase where we understand your goals, target audience, and technical requirements. We collaborate closely with you to ensure we deliver exactly what you need.",
    },
    {
      question: "Do you provide ongoing support and maintenance?",
      answer:
        "Absolutely. We offer comprehensive support and maintenance packages to keep your solutions running smoothly, secure, and up-to-date with the latest technologies.",
    },
  ]

  return (
    <section id="faq" className="relative overflow-hidden pb-32 sm:pb-40 md:pb-48 pt-12 sm:pt-16 md:pt-24 px-4 sm:px-6 md:px-8">
      {/* Background blur effects */}
      <div className="bg-primary/10 absolute top-1/2 -right-20 z-[-1] h-64 w-64 rounded-full opacity-40 blur-3xl hidden md:block"></div>
      <div className="bg-primary/10 absolute top-1/2 -left-20 z-[-1] h-64 w-64 rounded-full opacity-40 blur-3xl hidden md:block"></div>

      <div className="z-10 container mx-auto px-0 sm:px-4">
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="border-primary/40 text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs sm:text-sm uppercase">
            <span>✶</span>
            <span>{t('faq.badge')}</span>
          </div>
        </motion.div>

        <motion.h2
          className="mx-auto mt-4 sm:mt-6 max-w-2xl text-center text-2xl sm:text-3xl md:text-4xl lg:text-[54px] font-medium md:leading-[60px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {t('faq.title')}
        </motion.h2>

        <div className="mx-auto mt-8 sm:mt-12 flex max-w-2xl flex-col gap-4 sm:gap-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="from-secondary/40 to-secondary/10 rounded-xl sm:rounded-2xl border border-border/50 bg-card p-4 sm:p-6 shadow-sm transition-all duration-300 hover:border-border cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => toggleItem(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  toggleItem(index)
                }
              }}
            >
              <div className="flex items-start justify-between gap-2 sm:gap-4">
                <h3 className="m-0 font-medium text-sm sm:text-base text-foreground flex-1">{t(`faq.${index}.question`)}</h3>
                <motion.div
                  animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex-shrink-0"
                >
                  {openItems.includes(index) ? (
                    <Minus className="text-primary flex-shrink-0 transition duration-300" size={20} />
                  ) : (
                    <Plus className="text-primary flex-shrink-0 transition duration-300" size={20} />
                  )}
                </motion.div>
              </div>
              <AnimatePresence>
                {openItems.includes(index) && (
                  <motion.div
                    className="mt-3 sm:mt-4 text-muted-foreground leading-relaxed overflow-hidden text-sm sm:text-base"
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                      opacity: { duration: 0.2 },
                    }}
                  >
                    {t(`faq.${index}.answer`)}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
