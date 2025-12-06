"use client"
import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import Lottie from "lottie-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Hero from "@/components/home/hero"
import Features from "@/components/features"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { TestimonialsSection } from "@/components/testimonials"
import { NewReleasePromo } from "@/components/new-release-promo"
import { FAQSection } from "@/components/faq-section"
import { PricingSection } from "@/components/pricing-section"
import { StickyFooter } from "@/components/sticky-footer"
import { ContactSection } from "@/components/contact-section"
import { LocalizationButton } from "@/components/ui/localization-button"
import { SearchModal } from "@/components/search-modal"
import { useLocalization } from "@/contexts/LocalizationContext"
import TechStackCanvas from "@/components/tech-stack-canvas"
import magnifierAnimation from "@/public/wired-outline-19-magnifier-zoom-search-hover-spin.json"

interface NavItem {
  label: string
  id: string
  gradient: string
  iconColor: string
}

const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
}

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
}

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: { opacity: 1, scale: 2 },
}

const sharedTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  duration: 0.5,
}

export default function Home() {
  const { t, language } = useLocalization()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { theme } = useTheme()
  const lottieRef = useRef<any>(null)

  const navItems: NavItem[] = [
    {
      label: t('nav.services'),
      id: "services",
      gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
      iconColor: "text-blue-500",
    },
    {
      label: t('nav.about'),
      id: "about",
      gradient: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)",
      iconColor: "text-orange-500",
    },
    {
      label: t('nav.projects'),
      id: "projects",
      gradient: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
      iconColor: "text-green-500",
    }

  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Search modal keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsSearchOpen(true)
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleMobileNavClick = (elementId: string) => {
    setIsMobileMenuOpen(false)
    setTimeout(() => {
      const element = document.getElementById(elementId)
      if (element) {
        const headerOffset = 120
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    }, 100)
  }

  return (
    <div className="min-h-screen w-full relative bg-background">
      <div
        className="absolute inset-0 z-0 hidden sm:block"
        style={{
          background: theme === "dark"
            ? "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(226, 232, 240, 0.12), transparent 60%), #000000"
            : "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(226, 232, 240, 0.08), transparent 60%)"
        }}
      />



      {/* Desktop Header */}
      <header
        className={`sticky z-[9999] mx-auto hidden w-full flex-row items-center justify-between self-start bg-background/80 md:flex backdrop-blur-sm transition-all duration-500 ease-in-out ${isScrolled
          ? "top-4 max-w-3xl px-2 rounded-full border border-border/50 shadow-lg py-2"
          : "top-0 max-w-full px-8 border-b border-border/30 py-4"
          }`}
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          perspective: "1000px",
        }}
      >
        <a
          className={`z-50 flex items-center justify-center gap-2 transition-all duration-300 ${isScrolled ? "ml-4" : ""
            }`}
          href="/"
        >
          <span className="text-foreground font-bold text-xl">{t('site.brand')}</span>
        </a>

        <div className={`absolute inset-0 hidden flex-1 flex-row items-center justify-center font-medium transition duration-200 md:flex`}>
          {navItems.map((item, index) => (
            <motion.div key={item.id} className="relative">
              <motion.div
                className="block rounded-xl overflow-visible group relative"
                style={{ perspective: "600px" }}
                whileHover="hover"
                initial="initial"
              >
                <motion.div
                  className="absolute inset-0 z-0 pointer-events-none"
                  variants={glowVariants}
                  transition={{ duration: 0.5, type: "spring" as const, stiffness: 300, damping: 25 }}
                  style={{
                    background: item.gradient,
                    opacity: 0,
                    borderRadius: "16px",
                  }}
                />
                <motion.a
                  onClick={(e) => {
                    e.preventDefault()
                    handleMobileNavClick(item.id)
                  }}
                  className={`flex items-center cursor-pointer relative z-10 bg-transparent text-muted-foreground transition-colors rounded-xl ${isScrolled ? "px-2 py-1.5" : "px-4 py-2"} text-sm`}
                  variants={itemVariants}
                  transition={sharedTransition}
                  style={{ transformStyle: "preserve-3d", transformOrigin: "center bottom" }}
                >
                  <span>{item.label}</span>
                </motion.a>
                <motion.a
                  onClick={(e) => {
                    e.preventDefault()
                    handleMobileNavClick(item.id)
                  }}
                  className={`flex items-center cursor-pointer absolute inset-0 z-10 bg-transparent text-foreground transition-colors rounded-xl ${isScrolled ? "px-2 py-1.5" : "px-4 py-2"} text-sm`}
                  variants={backVariants}
                  transition={sharedTransition}
                  style={{ transformStyle: "preserve-3d", transformOrigin: "center top", rotateX: 90 }}
                >
                  <span>{item.label}</span>
                </motion.a>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center flex-shrink-0 gap-3 relative z-50">
          {!isScrolled ? (
            // At top: Theme, Localization, Contact Us
            <>
              <ThemeToggle />
              <LocalizationButton />
              <a
                href="#contact"
                className="rounded-full font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center bg-gradient-to-b from-primary to-primary/80 text-primary-foreground shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset] whitespace-nowrap flex-shrink-0 px-4 py-2 text-sm"
              >
                {t('nav.contactUs')}
              </a>
            </>
          ) : (
            // When scrolled: Search magnifier, Contact Us
            <>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-accent transition-colors"
                onMouseEnter={() => {
                  if (lottieRef.current) {
                    lottieRef.current.setSpeed(1)
                    lottieRef.current.play()
                  }
                }}
                onMouseLeave={() => {
                  if (lottieRef.current) {
                    lottieRef.current.setSpeed(1)
                    lottieRef.current.stop()
                  }
                }}
                aria-label="Search"
              >
                <Lottie
                  lottieRef={lottieRef}
                  animationData={magnifierAnimation}
                  loop={false}
                  autoplay={false}
                  style={{ width: 24, height: 24 }}
                />
              </button>

              <a
                href="#contact"
                className="rounded-full font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center bg-gradient-to-b from-primary to-primary/80 text-primary-foreground shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset] whitespace-nowrap flex-shrink-0 px-4 py-2 text-sm"
              >
                {t('nav.contactUs')}
              </a>
            </>
          )}
        </div>
      </header>

      {/* Mobile Header */}
      <header className="sticky top-4 z-[9999] mx-4 flex w-auto flex-row items-center justify-between rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg md:hidden px-4 py-3">
        <a
          className="flex items-center justify-center gap-2"
          href="/"
        >
          <span className="text-foreground font-bold text-lg">SRCDrive</span>
        </a>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LocalizationButton />

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-background/50 border border-border/50 transition-colors hover:bg-background/80"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col items-center justify-center w-5 h-5 space-y-1">
              <span
                className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
              ></span>
              <span
                className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
              ></span>
              <span
                className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
              ></span>
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm md:hidden">
          <div className="absolute top-20 left-4 right-4 bg-background/95 backdrop-blur-md border border-border/50 rounded-2xl shadow-2xl p-6">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => handleMobileNavClick("services")}
                className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
              >
                Services
              </button>
              <button
                onClick={() => handleMobileNavClick("about")}
                className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
              >
                About
              </button>
              <button
                onClick={() => handleMobileNavClick("projects")}
                className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
              >
                Projects
              </button>

              <div className="border-t border-border/50 pt-4 mt-4 flex flex-col space-y-3">
                <a
                  href="#contact"
                  className="px-4 py-3 text-lg font-bold text-center bg-gradient-to-b from-primary to-primary/80 text-primary-foreground rounded-lg shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  Contact Us
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <div id="services">
        <Features />
      </div>

      {/* About Section */}
      <div id="about">
        <About />
      </div>

      {/* Projects Section */}
      <div id="projects">
        <Projects />
      </div>

      {/* Testimonials Section */}
      <div id="testimonials">
        <TestimonialsSection />
      </div>

      <NewReleasePromo />

      {/* Tech Stack Section */}
      <div id="tech-stack" className="py-16">
        <TechStackCanvas />
      </div>

      {/* FAQ Section */}
      <div id="faq">
        <FAQSection />
      </div>



      {/* Contact Section */}
      <div id="contact">
        <ContactSection />
      </div>

      {/* Sticky Footer */}
      <StickyFooter />
    </div>
  )
}
