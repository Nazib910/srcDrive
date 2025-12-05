"use client"

import type React from "react"

import { useTheme } from "next-themes"
import { motion, useInView } from "framer-motion"
import { Suspense, useEffect, useRef, useState } from "react"
import { geist } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { useLocalization } from "@/contexts/LocalizationContext"

export default function Features() {
  const { t } = useLocalization()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const { theme } = useTheme()

  const [dark, setDark] = useState<number>(theme === "dark" ? 1 : 0)

  useEffect(() => {
    setDark(theme === "dark" ? 1 : 0)
  }, [theme])

  return (
    <section id="features" className="text-foreground relative overflow-visible py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6">
      <div className="bg-primary absolute -top-10 left-1/2 h-16 w-44 -translate-x-1/2 rounded-full opacity-20 blur-3xl select-none"></div>
      <div className="via-primary/50 absolute top-0 left-1/2 h-px w-3/5 -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent transition-all ease-in-out"></div>
      <motion.div
        ref={ref}
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0 }}
        className="container mx-auto flex flex-col items-center gap-6 sm:gap-8 md:gap-12"
      >
        <h2
          className={cn(
            "via-foreground mb-6 sm:mb-8 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-center text-3xl sm:text-4xl md:text-[54px] font-semibold tracking-tighter text-transparent md:leading-[60px]",
            geist.className,
          )}
        >
          {t('features.title')}
        </h2>

        <div className="w-full cursor-none">
          <div className="grid grid-cols-12 gap-4 justify-center">
            {/* Web Development */}
            <motion.div
              className="group border-border/50 text-card-foreground relative col-span-12 flex flex-col overflow-hidden rounded-xl border-2 p-4 sm:p-6 shadow-lg transition-all ease-in-out md:col-span-6 xl:col-span-5 xl:col-start-2"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{
                scale: 1.02,
                borderColor: "var(--primary)",
                boxShadow: "0 0 30px var(--primary)",
              }}
            >
              <div className="flex flex-col gap-3 sm:gap-4">
                <h3 className="text-xl sm:text-2xl leading-tight font-semibold tracking-tight">{t('features.web.title')}</h3>
                <div className="text-sm md:text-base text-muted-foreground flex flex-col gap-2">
                  <p className="max-w-[460px]">
                    {t('features.web.desc')}
                  </p>
                </div>
              </div>
              <div className="pointer-events-none flex grow items-center justify-center select-none relative mt-4 sm:mt-6">
                <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop"
                    alt={t('features.web.alt')}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
            </motion.div>

            {/* Mobile App Development */}
            <motion.div
              className="group border-border/50 text-card-foreground relative col-span-12 flex flex-col overflow-hidden rounded-xl border-2 p-4 sm:p-6 shadow-lg transition-all ease-in-out md:col-span-6 xl:col-span-5 xl:col-start-8"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{
                scale: 1.02,
                borderColor: "var(--primary)",
                boxShadow: "0 0 30px var(--primary)",
              }}
            >
              <div className="flex flex-col gap-3 sm:gap-4">
                <h3 className="text-xl sm:text-2xl leading-tight font-semibold tracking-tight">{t('features.mobile.title')}</h3>
                <div className="text-sm md:text-base text-muted-foreground flex flex-col gap-2">
                  <p className="max-w-[460px]">
                    {t('features.mobile.desc')}
                  </p>
                </div>
              </div>
              <div className="flex min-h-64 sm:min-h-80 md:min-h-96 grow items-center justify-center select-none relative mt-4 sm:mt-6">
                <img
                  src="https://images.unsplash.com/photo-1512941691920-25bda36dc643?w=600&h=400&fit=crop"
                  alt={t('features.mobile.alt')}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </motion.div>

            {/* UI/UX Design */}
            <motion.div
              className="group border-border/50 text-card-foreground relative col-span-12 flex flex-col overflow-hidden rounded-xl border-2 p-4 sm:p-6 shadow-lg transition-all ease-in-out md:col-span-6 xl:col-span-5 xl:col-start-2"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{
                scale: 1.02,
                borderColor: "var(--primary)",
                boxShadow: "0 0 30px var(--primary)",
              }}
            >
              <div className="flex flex-col gap-3 sm:gap-4">
                <h3 className="text-xl sm:text-2xl leading-tight font-semibold tracking-tight">{t('features.uiux.title')}</h3>
                <div className="text-sm md:text-base text-muted-foreground flex flex-col gap-2">
                  <p className="max-w-[460px]">
                    {t('features.uiux.desc')}
                  </p>
                </div>
              </div>
              <div className="flex grow items-center justify-center select-none relative min-h-64 sm:min-h-80 md:min-h-96 p-4 mt-4 sm:mt-6">
                <img
                  src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop"
                  alt={t('features.uiux.alt')}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </motion.div>

            {/* Cloud Solutions */}
            <motion.div
              className="group border-border/50 text-card-foreground relative col-span-12 flex flex-col overflow-hidden rounded-xl border-2 p-4 sm:p-6 shadow-lg transition-all ease-in-out md:col-span-6 xl:col-span-5 xl:col-start-8"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{
                scale: 1.02,
                borderColor: "var(--primary)",
                boxShadow: "0 0 30px var(--primary)",
              }}
            >
              <div className="flex flex-col gap-3 sm:gap-4">
                <h3 className="text-xl sm:text-2xl leading-tight font-semibold tracking-tight">{t('features.cloud.title')}</h3>
                <div className="text-sm md:text-base text-muted-foreground flex flex-col gap-2">
                  <p className="max-w-[460px]">
                    {t('features.cloud.desc')}
                  </p>
                </div>
              </div>
              <div className="flex grow items-center justify-center select-none relative min-h-64 sm:min-h-80 md:min-h-96 p-4 mt-4 sm:mt-6">
                <img
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop"
                  alt={t('features.cloud.alt')}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </motion.div>

            {/* Custom Software Development */}
            <motion.div
              className="group border-border/50 text-card-foreground relative col-span-12 flex flex-col overflow-hidden rounded-xl border-2 p-4 sm:p-6 shadow-lg transition-all ease-in-out md:col-span-12 xl:col-span-10 xl:col-start-2"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{
                scale: 1.01,
                borderColor: "var(--primary)",
                boxShadow: "0 0 30px var(--primary)",
              }}
            >
              <div className="flex flex-col gap-3 sm:gap-4">
                <h3 className="text-xl sm:text-2xl leading-tight font-semibold tracking-tight">{t('features.custom.title')}</h3>
                <div className="text-sm md:text-base text-muted-foreground flex flex-col gap-2">
                  <p className="max-w-[460px]">
                    {t('features.custom.desc')}
                  </p>
                </div>
              </div>
              <div className="flex grow items-center justify-center select-none relative min-h-48 sm:min-h-64 md:min-h-72 p-4 mt-4 sm:mt-6">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop"
                  alt={t('features.custom.alt')}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
