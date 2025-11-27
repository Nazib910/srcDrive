"use client"

import { motion } from "framer-motion"
import { Check, Sparkles } from 'lucide-react'
import { useState } from "react"

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for small projects and MVPs",
    monthlyPrice: 999,
    annualPrice: 9990,
    features: ["Up to 3 pages", "Responsive design", "Basic SEO", "1 month support"],
    popular: false,
    cta: "Get Started",
  },
  {
    name: "Professional",
    monthlyPrice: 2999,
    annualPrice: 29990,
    description: "For growing businesses and complex applications",
    features: [
      "Full website or app",
      "Advanced features",
      "API integration",
      "Custom design",
      "3 months support",
      "Performance optimization",
    ],
    popular: true,
    cta: "Start Project",
  },
  {
    name: "Enterprise",
    monthlyPrice: 4999,
    annualPrice: 49990,
    description: "For large-scale solutions and teams",
    features: [
      "Everything in Professional",
      "Dedicated team",
      "24/7 support",
      "Advanced analytics",
      "Custom infrastructure",
      "6 months maintenance",
    ],
    popular: false,
    cta: "Contact Sales",
  },
]

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/30 border border-border/50 backdrop-blur-sm mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Pricing</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent mb-4">
            Simple, Transparent Pricing
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your project. Scale up as your business grows.
          </p>

          {/* Monthly/Annual Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center gap-3 sm:gap-4 p-1 bg-secondary/20 rounded-full border border-border/50 backdrop-blur-sm w-fit mx-auto"
          >
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                !isAnnual ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 relative ${
                isAnnual ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Annual
              {isAnnual && (
                <span className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                  Save 17%
                </span>
              )}
            </button>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`relative rounded-2xl p-6 sm:p-8 backdrop-blur-sm border transition-all duration-300 ${
                plan.popular
                  ? "bg-primary/10 border-primary/30 shadow-lg shadow-primary/10 md:scale-105"
                  : "bg-card border-border/50 hover:border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-xs sm:text-sm font-medium px-4 py-1 sm:py-2 rounded-full">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-3xl sm:text-4xl font-bold text-foreground">
                    ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground text-sm sm:text-base">{isAnnual ? "/year" : "/month"}</span>
                </div>
                <p className="text-muted-foreground text-xs sm:text-sm">{plan.description}</p>
              </div>

              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 sm:gap-3">
                    <Check className="w-4 sm:w-5 h-4 sm:h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground/80 text-xs sm:text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 min-h-[44px] sm:min-h-[48px] flex items-center justify-center ${
                  plan.popular
                    ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40"
                    : "bg-secondary/30 text-foreground border border-border/50 hover:bg-secondary/50"
                }`}
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 sm:mt-16"
        >
          <p className="text-muted-foreground mb-4 text-sm sm:text-base">Need a custom solution? We're here to help.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-primary hover:text-primary/80 font-medium transition-colors text-sm sm:text-base"
          >
            Contact our sales team →
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
