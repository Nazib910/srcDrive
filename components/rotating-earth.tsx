"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

interface RotatingEarthProps {
    width?: number
    height?: number
    className?: string
    language?: string
    theme?: string
}

export default function RotatingEarth({ width = 800, height = 600, className = "", language = "en", theme = "light" }: RotatingEarthProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const context = canvas.getContext("2d")
        if (!context) return

        // Set up responsive dimensions
        const containerWidth = Math.min(width, window.innerWidth - 40)
        const containerHeight = Math.min(height, window.innerHeight - 100)
        const radius = Math.min(containerWidth, containerHeight) / 2.5

        const dpr = window.devicePixelRatio || 1
        canvas.width = containerWidth * dpr
        canvas.height = containerHeight * dpr
        context.scale(dpr, dpr)

        // Define location coordinates (Longitude, Latitude)
        const locations = [
            { coords: [90.3563, 23.6850], name: "Bangladesh" },
            { coords: [10.4515, 51.1657], name: "Germany" },
            { coords: [-95.7129, 37.0902], name: "USA" },
            { coords: [-106.3468, 56.1304], name: "Canada" },
            { coords: [133.7751, -25.2744], name: "Australia" },
            { coords: [-3.4360, 55.3781], name: "UK" },
        ]

        // Create projection and path generator for Canvas
        const projection = d3
            .geoOrthographic()
            .scale(radius)
            .translate([containerWidth / 2, containerHeight / 2])
            .clipAngle(90)

        const path = d3.geoPath().projection(projection).context(context)

        const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
            const [x, y] = point
            let inside = false

            for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
                const [xi, yi] = polygon[i]
                const [xj, yj] = polygon[j]

                if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
                    inside = !inside
                }
            }

            return inside
        }

        const pointInFeature = (point: [number, number], feature: any): boolean => {
            const geometry = feature.geometry

            if (geometry.type === "Polygon") {
                const coordinates = geometry.coordinates
                // Check if point is in outer ring
                if (!pointInPolygon(point, coordinates[0])) {
                    return false
                }
                // Check if point is in any hole (inner rings)
                for (let i = 1; i < coordinates.length; i++) {
                    if (pointInPolygon(point, coordinates[i])) {
                        return false // Point is in a hole
                    }
                }
                return true
            } else if (geometry.type === "MultiPolygon") {
                // Check each polygon in the MultiPolygon
                for (const polygon of geometry.coordinates) {
                    // Check if point is in outer ring
                    if (pointInPolygon(point, polygon[0])) {
                        // Check if point is in any hole
                        let inHole = false
                        for (let i = 1; i < polygon.length; i++) {
                            if (pointInPolygon(point, polygon[i])) {
                                inHole = true
                                break
                            }
                        }
                        if (!inHole) {
                            return true
                        }
                    }
                }
                return false
            }

            return false
        }

        const generateDotsInPolygon = (feature: any, dotSpacing = 16) => {
            const dots: [number, number][] = []
            const bounds = d3.geoBounds(feature)
            const [[minLng, minLat], [maxLng, maxLat]] = bounds

            const stepSize = dotSpacing * 0.08
            let pointsGenerated = 0

            for (let lng = minLng; lng <= maxLng; lng += stepSize) {
                for (let lat = minLat; lat <= maxLat; lat += stepSize) {
                    const point: [number, number] = [lng, lat]
                    if (pointInFeature(point, feature)) {
                        dots.push(point)
                        pointsGenerated++
                    }
                }
            }

            return dots
        }

        interface DotData {
            lng: number
            lat: number
            visible: boolean
        }

        const allDots: DotData[] = []
        let landFeatures: any

        const render = () => {
            // Clear canvas
            context.clearRect(0, 0, containerWidth, containerHeight)

            const currentScale = projection.scale()
            const scaleFactor = currentScale / radius
            const isLight = theme !== "dark"

            // Colors based on theme
            const outlineColor = isLight ? "#4a4a4a" : "#ffffff"
            const graticuleColor = isLight ? "#9ca3af" : "#ffffff"
            const landColor = isLight ? "#4a4a4a" : "#ffffff"
            const dotColor = isLight ? "#4b5563" : "#999999"
            const markerColor = "#ff3b3b"
            const textColor = isLight ? "#000000" : "#ffffff"

            // Draw globe outline only (transparent background)
            context.beginPath()
            context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI)
            context.strokeStyle = outlineColor
            context.lineWidth = 2 * scaleFactor
            context.stroke()

            if (landFeatures) {
                // Draw graticule
                const graticule = d3.geoGraticule()
                context.beginPath()
                path(graticule())
                context.strokeStyle = graticuleColor
                context.lineWidth = 1 * scaleFactor
                context.globalAlpha = 0.25
                context.stroke()
                context.globalAlpha = 1

                // Draw land outlines
                context.beginPath()
                landFeatures.features.forEach((feature: any) => {
                    path(feature)
                })
                context.strokeStyle = landColor
                context.lineWidth = 1 * scaleFactor
                context.stroke()

                // Draw halftone dots
                allDots.forEach((dot) => {
                    const projected = projection([dot.lng, dot.lat])
                    if (
                        projected &&
                        projected[0] >= 0 &&
                        projected[0] <= containerWidth &&
                        projected[1] >= 0 &&
                        projected[1] <= containerHeight
                    ) {
                        context.beginPath()
                        context.arc(projected[0], projected[1], 1.2 * scaleFactor, 0, 2 * Math.PI)
                        context.fillStyle = dotColor
                        context.fill()
                    }
                })

                // Draw location pointers
                locations.forEach(location => {
                    const locationProjected = projection(location.coords as [number, number])
                    // Only draw if visible (on the front side of the globe)
                    // We can check this by calculating the distance from the center or checking if it's clipped
                    // But d3.geoOrthographic clips automatically, so if projection returns null it's hidden?
                    // Actually projection returns coordinates even if behind, but we need to check visibility.
                    // A simple way with d3 geo is to check if it's in the clip angle.

                    // Better way: check if the point is visible
                    const center = projection.invert!([containerWidth / 2, containerHeight / 2])
                    const distance = d3.geoDistance(location.coords as [number, number], center!)

                    if (distance < Math.PI / 2 && locationProjected) {
                        const [x, y] = locationProjected

                        // Draw pulsing circle
                        const time = Date.now() / 1000
                        const pulseScale = 1 + Math.sin(time * 2) * 0.3

                        // Outer glow
                        context.beginPath()
                        context.arc(x, y, 12 * scaleFactor * pulseScale, 0, 2 * Math.PI)
                        context.fillStyle = "rgba(255, 59, 59, 0.2)"
                        context.fill()

                        // Middle circle
                        context.beginPath()
                        context.arc(x, y, 8 * scaleFactor, 0, 2 * Math.PI)
                        context.fillStyle = "rgba(255, 59, 59, 0.5)"
                        context.fill()

                        // Inner dot
                        context.beginPath()
                        context.arc(x, y, 4 * scaleFactor, 0, 2 * Math.PI)
                        context.fillStyle = markerColor
                        context.fill()

                        // Draw pointer pin
                        context.beginPath()
                        context.moveTo(x, y)
                        context.lineTo(x, y - 20 * scaleFactor)
                        context.strokeStyle = markerColor
                        context.lineWidth = 2 * scaleFactor
                        context.stroke()

                        // Draw label
                        context.font = `bold ${12 * scaleFactor}px sans-serif`
                        context.fillStyle = textColor
                        context.textAlign = "center"
                        context.fillText(location.name, x, y - 25 * scaleFactor)
                    }
                })
            }
        }

        const loadWorldData = async () => {
            try {
                setIsLoading(true)

                const response = await fetch(
                    "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json",
                )
                if (!response.ok) throw new Error("Failed to load land data")

                landFeatures = await response.json()

                // Generate dots for all land features
                let totalDots = 0
                landFeatures.features.forEach((feature: any) => {
                    const dots = generateDotsInPolygon(feature, 16)
                    dots.forEach(([lng, lat]) => {
                        allDots.push({ lng, lat, visible: true })
                        totalDots++
                    })
                })

                render()
                setIsLoading(false)
            } catch (err) {
                setError("Failed to load land map data")
                setIsLoading(false)
            }
        }

        // Set up rotation and interaction
        const rotation: [number, number] = [0, 0]
        let autoRotate = true
        const rotationSpeed = 0.5

        const rotate = () => {
            if (autoRotate) {
                rotation[0] += rotationSpeed
                projection.rotate(rotation)
                render()
            }
        }

        // Auto-rotation timer
        const rotationTimer = d3.timer(rotate)

        const handleMouseDown = (event: MouseEvent) => {
            autoRotate = false
            const startX = event.clientX
            const startY = event.clientY
            const startRotation = [...rotation]

            const handleMouseMove = (moveEvent: MouseEvent) => {
                const sensitivity = 0.5
                const dx = moveEvent.clientX - startX
                const dy = moveEvent.clientY - startY

                rotation[0] = startRotation[0] + dx * sensitivity
                rotation[1] = startRotation[1] - dy * sensitivity
                rotation[1] = Math.max(-90, Math.min(90, rotation[1]))

                projection.rotate(rotation)
                render()
            }

            const handleMouseUp = () => {
                document.removeEventListener("mousemove", handleMouseMove)
                document.removeEventListener("mouseup", handleMouseUp)

                setTimeout(() => {
                    autoRotate = true
                }, 10)
            }

            document.addEventListener("mousemove", handleMouseMove)
            document.addEventListener("mouseup", handleMouseUp)
        }

        const handleWheel = (event: WheelEvent) => {
            event.preventDefault()
            const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1
            const newRadius = Math.max(radius * 0.8, Math.min(radius * 2, projection.scale() * scaleFactor))
            projection.scale(newRadius)
            render()
        }

        canvas.addEventListener("mousedown", handleMouseDown)
        canvas.addEventListener("wheel", handleWheel)

        // Load the world data
        loadWorldData()

        // Cleanup
        return () => {
            rotationTimer.stop()
            canvas.removeEventListener("mousedown", handleMouseDown)
            canvas.removeEventListener("wheel", handleWheel)
        }
    }, [width, height, language, theme])

    if (error) {
        return (
            <div className={`flex items-center justify-center bg-card rounded-2xl p-8 ${className}`}>
                <div className="text-center">
                    <p className="text-destructive font-semibold mb-2">Error loading Earth visualization</p>
                    <p className="text-muted-foreground text-sm">{error}</p>
                </div>
            </div>
        )
    }

    return (
        <div className={`relative ${className}`}>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-xl">
                    <div className="text-muted-foreground">Loading...</div>
                </div>
            )}
            <canvas
                ref={canvasRef}
                className="w-full h-auto rounded-xl bg-background"
                style={{ maxWidth: "100%", height: "auto" }}
            />

        </div>
    )
}
