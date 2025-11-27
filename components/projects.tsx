"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { geist } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { useLocalization } from "@/contexts/LocalizationContext"
import { Badge } from "@/components/ui/badge"

export const Projects = () => {
  const { t } = useLocalization()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with payment integration, inventory management, and analytics dashboard.",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
    },
    {
      title: "Mobile Health App",
      description: "Cross-platform mobile application for health tracking with real-time notifications and cloud sync.",
      tags: ["React Native", "Firebase", "AWS"],
      image: "https://images.unsplash.com/photo-1512941691920-25bda36dc643?w=600&h=400&fit=crop",
    },
    {
      title: "AI Analytics Dashboard",
      description: "Advanced analytics dashboard with AI-powered insights, data visualization, and predictive modeling.",
      tags: ["Next.js", "Python", "TensorFlow", "MongoDB"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    },
    {
      title: "Cloud Management System",
      description: "Enterprise cloud infrastructure management tool with multi-region support and automated scaling.",
      tags: ["Kubernetes", "Go", "React", "AWS"],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    },
    {
      title: "Social Media Platform",
      description: "Real-time social network with messaging, notifications, and content recommendation engine.",
      tags: ["Next.js", "WebSocket", "Redis", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    },
    {
      title: "Video Streaming Service",
      description: "High-performance video streaming platform with adaptive bitrate and distributed CDN.",
      tags: ["Vue.js", "FFmpeg", "HLS", "S3"],
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=400&fit=crop",
    },
  ]

  return (
    <section id="projects" className="relative overflow-hidden py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6">
      <div className="bg-primary absolute -top-10 left-1/2 h-16 w-44 -translate-x-1/2 rounded-full opacity-20 blur-3xl select-none"></div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto max-w-6xl"
      >
        <div className="text-center mb-12 md:mb-16">
          <h2
            className={cn(
              "mb-6 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-transparent",
              geist.className,
            )}
          >
            {t('projects.title')}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of our recent work and the diverse range of solutions we've delivered for clients across various industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-xl border border-border/50 overflow-hidden bg-background/50 backdrop-blur-sm hover:border-border hover:shadow-xl transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-foreground">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Hover Arrow */}
                <div className="mt-6 flex items-center gap-2 text-primary group-hover:gap-3 transition-all duration-300">
                  <span className="text-sm font-medium">View Case Study</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
