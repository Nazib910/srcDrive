"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { geist } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { useLocalization } from "@/contexts/LocalizationContext"

export const About = () => {
  const { t } = useLocalization()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const [displayValues, setDisplayValues] = useState([0, 0, 0, 0])

  const stats = [
    { value: 250, label: "Projects Completed", suffix: "+" },
    { value: 50, label: "Team Members", suffix: "+" },
    { value: 15, label: "Years Experience", suffix: "+" },
    { value: 98, label: "Client Satisfaction", suffix: "%" },
  ]

  useEffect(() => {
    if (!isInView) return

    const intervals = displayValues.map((_, index) => {
      const duration = 2000
      const steps = 60
      const increment = stats[index].value / steps
      let current = 0

      return setInterval(() => {
        current += increment
        if (current >= stats[index].value) {
          current = stats[index].value
          clearInterval(intervals[index])
        }
        setDisplayValues((prev) => {
          const newValues = [...prev]
          newValues[index] = Math.floor(current)
          return newValues
        })
      }, duration / steps)
    })

    return () => intervals.forEach(clearInterval)
  }, [isInView])

  return (
    <section id="about" className="relative overflow-hidden py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6">
      <div className="bg-primary absolute -top-10 right-1/4 h-16 w-44 rounded-full opacity-20 blur-3xl select-none"></div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto max-w-5xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2
              className={cn(
                "mb-6 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-transparent",
                geist.className,
              )}
            >
              {t('about.title')}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">
              {t('about.desc1')}
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
              {t('about.desc2')}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="p-4 rounded-lg backdrop-blur-sm bg-background/50 border border-border/30 hover:border-border/60 transition-colors"
                >
                  <div className="text-2xl font-bold text-primary mb-1">
                    {displayValues[index]}{stat.suffix}
                  </div>
                  <div className="text-sm text-muted-foreground">{t(`about.stats.${index}.label`)}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-96 md:h-full min-h-96 rounded-xl overflow-hidden border border-border/30"
          >
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop"
              alt={t('about.alt')}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
