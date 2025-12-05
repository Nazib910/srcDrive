"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface NavItem {
    label: string
    isNew?: boolean
}

export default function MobileNav() {
    const [activeTab, setActiveTab] = useState("Homes")
    const [isHovering, setIsHovering] = useState<string | null>(null)
    const [isInitialLoad, setIsInitialLoad] = useState(true)
    const [underlineOpacity, setUnderlineOpacity] = useState(0)
    const [isIOS, setIsIOS] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [hasPlayedOnce, setHasPlayedOnce] = useState<Record<string, boolean>>({
        Homes: false,
        Experiences: false,
        Services: false,
    })
    const [isPermanentlyZoomed, setIsPermanentlyZoomed] = useState<Record<string, boolean>>({
        Homes: false,
        Experiences: false,
        Services: false,
    })

    const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({
        Homes: null,
        Experiences: null,
        Services: null,
    })

    const [underlineStyle, setUnderlineStyle] = useState({
        left: 0,
        width: 0,
    })

    const navRefs = useRef<Record<string, HTMLButtonElement | null>>({})

    const navItems: NavItem[] = [{ label: "Homes" }, { label: "Experiences" }, { label: "Services" }]

    // Detect scroll position
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop
            setIsScrolled(scrollTop > 20)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Detect iOS
    useEffect(() => {
        const userAgent = window.navigator.userAgent.toLowerCase()
        const isIOSDevice = /iphone|ipad|ipod/.test(userAgent) || (userAgent.includes("mac") && "ontouchend" in document)
        setIsIOS(isIOSDevice)
    }, [])

    // Fix iOS initial frame rendering
    useEffect(() => {
        if (isIOS) {
            // For each video, handle iOS-specific initialization
            Object.keys(videoRefs.current).forEach((key) => {
                const video = videoRefs.current[key]
                if (video) {
                    // Set a very low volume during this process
                    video.volume = 0.01

                    // Play the video
                    const playPromise = video.play()

                    if (playPromise !== undefined) {
                        playPromise
                            .then(() => {
                                // If this is not the active tab, pause after a short delay
                                if (key !== activeTab) {
                                    setTimeout(() => {
                                        video.pause()
                                        video.currentTime = 0
                                        // Reset volume
                                        video.volume = 1
                                    }, 50)
                                } else {
                                    // For the active tab, let it play through and mark as played
                                    video.volume = 1
                                    setHasPlayedOnce((prev) => ({ ...prev, [key]: true }))
                                    setIsPermanentlyZoomed((prev) => ({ ...prev, [key]: true }))
                                }
                            })
                            .catch((error) => {
                                console.log("Auto-play prevented:", error)
                            })
                    }
                }
            })
        }
    }, [isIOS, activeTab])

    // Handle initial load fade-in
    useEffect(() => {
        // Set initial position without animation
        const activeElement = navRefs.current["Homes"]
        if (activeElement) {
            const { offsetLeft, offsetWidth } = activeElement
            setUnderlineStyle({
                left: offsetLeft,
                width: offsetWidth,
            })
        }

        // Fade in the underline
        setTimeout(() => {
            setUnderlineOpacity(1)
        }, 100)

        // After initial animation, switch to slide mode
        setTimeout(() => {
            setIsInitialLoad(false)
        }, 500)
    }, [])

    useEffect(() => {
        // Skip position updates during initial load
        if (isInitialLoad) return

        // Update the underline position based on the active tab
        const activeElement = navRefs.current[activeTab]
        if (activeElement) {
            const { offsetLeft, offsetWidth } = activeElement
            setUnderlineStyle({
                left: offsetLeft,
                width: offsetWidth,
            })
        }
        // Handle videos for tabs with videos
        ;["Homes", "Experiences", "Services"].forEach((tabName) => {
            const videoRef = videoRefs.current[tabName]

            // Skip if we're on iOS and this is the initial load (handled by iOS-specific effect)
            if (isIOS && isInitialLoad && tabName === activeTab) return

            // Play video once when switching to tab
            if (activeTab === tabName && !hasPlayedOnce[tabName] && videoRef) {
                videoRef.currentTime = 0
                videoRef.play()
                setHasPlayedOnce((prev) => ({ ...prev, [tabName]: true }))
                setIsPermanentlyZoomed((prev) => ({ ...prev, [tabName]: true }))
            }

            // Reset video when switching away from tab
            if (activeTab !== tabName && videoRef) {
                setIsPermanentlyZoomed((prev) => ({ ...prev, [tabName]: false }))
                videoRef.pause()
                videoRef.currentTime = 0 // Reset to first frame
            }
        })
    }, [activeTab, hasPlayedOnce, isInitialLoad, isIOS])

    const handleTabClick = (label: string) => {
        setActiveTab(label)
        if (["Homes", "Experiences", "Services"].includes(label)) {
            setHasPlayedOnce((prev) => ({ ...prev, [label]: false })) // Reset so it plays again when switching back
        }
    }

    const handleVideoClick = (label: string) => {
        const videoRef = videoRefs.current[label]
        if (videoRef) {
            videoRef.currentTime = 0
            videoRef.play()
        }
        setIsPermanentlyZoomed((prev) => ({ ...prev, [label]: true }))
        handleTabClick(label)
    }

    return (
        <div
            className={cn(
                "w-full transition-all duration-500 ease-in-out",
                isScrolled && "max-w-md mx-auto rounded-2xl mt-4"
            )}
            style={{
                boxShadow: isScrolled
                    ? "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    : "none",
            }}
        >
            <div className="w-full">
                <nav className="flex justify-center items-end px-4 py-1.5 relative">
                    <div className="flex gap-16">
                        {navItems.map((item) => (
                            <button
                                key={item.label}
                                ref={(el) => (navRefs.current[item.label] = el)}
                                onClick={() => handleTabClick(item.label)}
                                className={cn(
                                    "relative flex flex-col items-center transition-all",
                                    activeTab === item.label ? "font-semibold" : "font-normal",
                                )}
                            >
                                <div className="h-16 flex items-center justify-center">
                                    {item.label === "Homes" && (
                                        <div
                                            className="w-12 h-12 flex items-center justify-center"
                                            onMouseEnter={() => setIsHovering("Homes")}
                                            onMouseLeave={() => setIsHovering(null)}
                                            onClick={() => handleVideoClick("Homes")}
                                            style={{
                                                position: "relative",
                                                overflow: "visible",
                                            }}
                                        >
                                            <video
                                                ref={(el) => (videoRefs.current.Homes = el)}
                                                src="/videos/homes.mp4"
                                                className={cn(
                                                    "absolute w-12 h-12 object-contain transition-transform duration-300 scale-90",
                                                    (isHovering === "Homes" || (isPermanentlyZoomed.Homes && activeTab === "Homes")) &&
                                                    "scale-110",
                                                )}
                                                style={{
                                                    transformOrigin: "center center",
                                                }}
                                                muted
                                                playsInline
                                                onEnded={() => {
                                                    const videoRef = videoRefs.current.Homes
                                                    if (videoRef) {
                                                        videoRef.pause()
                                                    }
                                                }}
                                            />
                                        </div>
                                    )}

                                    {item.label === "Experiences" && (
                                        <div
                                            className="w-12 h-12 flex items-center justify-center"
                                            onMouseEnter={() => setIsHovering("Experiences")}
                                            onMouseLeave={() => setIsHovering(null)}
                                            onClick={() => handleVideoClick("Experiences")}
                                            style={{
                                                position: "relative",
                                                overflow: "visible",
                                            }}
                                        >
                                            <video
                                                ref={(el) => (videoRefs.current.Experiences = el)}
                                                src="/videos/experiences.mp4"
                                                className={cn(
                                                    "absolute w-12 h-12 object-contain transition-transform duration-300 scale-90",
                                                    (isHovering === "Experiences" ||
                                                        (isPermanentlyZoomed.Experiences && activeTab === "Experiences")) &&
                                                    "scale-110",
                                                )}
                                                style={{
                                                    transformOrigin: "center center",
                                                }}
                                                muted
                                                playsInline
                                                onEnded={() => {
                                                    const videoRef = videoRefs.current.Experiences
                                                    if (videoRef) {
                                                        videoRef.pause()
                                                    }
                                                }}
                                            />
                                        </div>
                                    )}

                                    {item.label === "Services" && (
                                        <div
                                            className="w-12 h-12 flex items-center justify-center"
                                            onMouseEnter={() => setIsHovering("Services")}
                                            onMouseLeave={() => setIsHovering(null)}
                                            onClick={() => handleVideoClick("Services")}
                                            style={{
                                                position: "relative",
                                                overflow: "visible",
                                            }}
                                        >
                                            <video
                                                ref={(el) => (videoRefs.current.Services = el)}
                                                src="/videos/services.mp4"
                                                className={cn(
                                                    "absolute w-12 h-12 object-contain transition-transform duration-300 scale-90",
                                                    (isHovering === "Services" || (isPermanentlyZoomed.Services && activeTab === "Services")) &&
                                                    "scale-110",
                                                )}
                                                style={{
                                                    transformOrigin: "center center",
                                                }}
                                                muted
                                                playsInline
                                                onEnded={() => {
                                                    const videoRef = videoRefs.current.Services
                                                    if (videoRef) {
                                                        videoRef.pause()
                                                    }
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center">
                                    <span className="text-xs">{item.label}</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Animated underline */}
                    <div
                        className={cn(
                            "absolute bottom-0 h-1 bg-black",
                            isInitialLoad ? "transition-opacity duration-500" : "transition-all duration-300 ease-in-out",
                        )}
                        style={{
                            left: `${Math.max(0, underlineStyle.left - 3)}px`,
                            width: `${underlineStyle.width + 6}px`,
                            borderTopLeftRadius: "2px",
                            borderTopRightRadius: "2px",
                            opacity: isInitialLoad ? underlineOpacity : 1,
                        }}
                    />
                </nav>
            </div>
        </div>
    )
}
