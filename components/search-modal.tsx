"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { X, Search } from "lucide-react"

interface Project {
    title: string
    description: string
    tags: string[]
    image: string
}

interface SearchModalProps {
    isOpen: boolean
    onClose: () => void
    searchQuery: string
    onSearchChange: (query: string) => void
}

const projects: Project[] = [
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

export function SearchModal({ isOpen, onClose, searchQuery, onSearchChange }: SearchModalProps) {
    const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects)

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredProjects(projects)
        } else {
            const query = searchQuery.toLowerCase()
            const filtered = projects.filter(
                (project) =>
                    project.title.toLowerCase().includes(query) ||
                    project.description.toLowerCase().includes(query) ||
                    project.tags.some((tag) => tag.toLowerCase().includes(query))
            )
            setFilteredProjects(filtered)
        }
    }, [searchQuery])

    const handleProjectClick = () => {
        // Scroll to projects section
        onClose()
        setTimeout(() => {
            const element = document.getElementById("projects")
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
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10000]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ type: "spring", duration: 0.3 }}
                        className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-[10001] px-4"
                    >
                        <div className="bg-background/95 backdrop-blur-md border border-border/50 rounded-2xl shadow-2xl overflow-hidden">
                            {/* Search Input */}
                            <div className="flex items-center gap-3 p-4 border-b border-border/50">
                                <Search className="w-5 h-5 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search projects by name, description, or tags..."
                                    value={searchQuery}
                                    onChange={(e) => onSearchChange(e.target.value)}
                                    className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-lg"
                                    autoFocus
                                />
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-accent rounded-lg transition-colors"
                                    aria-label="Close search"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Results */}
                            <div className="max-h-[60vh] overflow-y-auto p-4">
                                {filteredProjects.length > 0 ? (
                                    <div className="space-y-3">
                                        {filteredProjects.map((project, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                onClick={handleProjectClick}
                                                className="group flex gap-4 p-4 rounded-xl border border-border/50 hover:border-border hover:bg-accent/50 transition-all cursor-pointer"
                                            >
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                                                        {project.title}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                                                        {project.description}
                                                    </p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {project.tags.slice(0, 3).map((tag, tagIndex) => (
                                                            <Badge key={tagIndex} variant="secondary" className="text-xs">
                                                                {tag}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <Search className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                                        <p className="text-muted-foreground">No projects found matching "{searchQuery}"</p>
                                    </div>
                                )}
                            </div>

                            {/* Footer hint */}
                            <div className="px-4 py-3 border-t border-border/50 bg-accent/20">
                                <p className="text-xs text-muted-foreground text-center">
                                    Press <kbd className="px-2 py-1 bg-background rounded border border-border text-xs">ESC</kbd> to
                                    close
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
