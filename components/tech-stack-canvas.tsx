"use client"

import { useEffect, useRef } from "react"
import Script from "next/script"

export default function TechStackCanvas() {
    const containerRef = useRef<HTMLDivElement>(null)
    const scriptLoaded = useRef(false)
    const engineRef = useRef<any>(null)
    const renderRef = useRef<any>(null)

    useEffect(() => {
        // Only run once the script is loaded and the component is mounted
        if (scriptLoaded.current && containerRef.current) {
            initSimulation(containerRef.current)
        }

        // Cleanup function
        return () => {
            if (engineRef.current && renderRef.current) {
                const Matter = window.Matter
                Matter.Render.stop(renderRef.current)
                Matter.Engine.clear(engineRef.current)

                // Remove event listeners
                window.removeEventListener("resize", handleResize)
            }
        }
    }, [])

    const handleScriptLoad = () => {
        scriptLoaded.current = true
        if (containerRef.current) {
            initSimulation(containerRef.current)
        }
    }

    // Resize handler function (defined outside to be able to remove it)
    const handleResize = () => {
        if (!containerRef.current || !renderRef.current) return

        const containerWidth = containerRef.current.clientWidth
        const containerHeight = containerRef.current.clientHeight

        // Update canvas dimensions
        renderRef.current.canvas.width = containerWidth
        renderRef.current.canvas.height = containerHeight
        renderRef.current.options.width = containerWidth
        renderRef.current.options.height = containerHeight

        // Update boundaries
        updateBoundaries(containerWidth, containerHeight)
    }

    // Update boundaries function
    const updateBoundaries = (width: number, height: number) => {
        if (!engineRef.current) return

        const Matter = window.Matter
        const world = engineRef.current.world

        // Remove old boundaries
        const bodies = Matter.Composite.allBodies(world)
        bodies.forEach((body: any) => {
            if (body.isStatic && body.label !== "MouseConstraint") {
                Matter.World.remove(world, body)
            }
        })

        // Create new boundaries with increased thickness for better containment
        const thickness = 100

        const ground = Matter.Bodies.rectangle(width / 2, height + thickness / 2, width + thickness * 2, thickness, {
            isStatic: true,
            render: { fillStyle: "transparent" },
            label: "ground",
        })

        const wallLeft = Matter.Bodies.rectangle(-thickness / 2, height / 2, thickness, height + thickness * 2, {
            isStatic: true,
            render: { fillStyle: "transparent" },
            label: "wallLeft",
        })

        const wallRight = Matter.Bodies.rectangle(width + thickness / 2, height / 2, thickness, height + thickness * 2, {
            isStatic: true,
            render: { fillStyle: "transparent" },
            label: "wallRight",
        })

        const roof = Matter.Bodies.rectangle(width / 2, -thickness / 2, width + thickness * 2, thickness, {
            isStatic: true,
            render: { fillStyle: "transparent" },
            label: "roof",
        })

        Matter.World.add(world, [ground, wallLeft, wallRight, roof])
    }

    // Simulation initialization
    function initSimulation(containerElement: HTMLDivElement) {
        // Ensure Matter is available
        if (typeof window === "undefined" || !window.Matter) return

        const Matter = window.Matter
        const Engine = Matter.Engine,
            Render = Matter.Render,
            World = Matter.World,
            Bodies = Matter.Bodies,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse,
            Events = Matter.Events

        const engine = Engine.create()
        const world = engine.world

        // Adjust engine settings for more stability
        engine.world.gravity.y = 0.6
        engine.constraintIterations = 3
        engine.positionIterations = 8
        engine.velocityIterations = 6

        // Store engine reference for cleanup
        engineRef.current = engine

        const containerWidth = containerElement.clientWidth
        const containerHeight = containerElement.clientHeight

        // Set up Matter.js renderer
        const render = Render.create({
            element: containerElement,
            engine: engine,
            options: {
                width: containerWidth,
                height: containerHeight,
                background: "transparent",
                wireframes: false,
                showBounds: false,
                showVelocity: false,
                showAngleIndicator: false,
                showDebug: false,
            },
        })

        // Store render reference for cleanup and resize
        renderRef.current = render

        // Remove canvas border
        if (render.canvas) {
            render.canvas.style.border = "none"
            render.canvas.style.outline = "none"
            render.canvas.style.position = "absolute"
            render.canvas.style.top = "0"
            render.canvas.style.left = "0"
            render.canvas.style.width = "100%"
            render.canvas.style.height = "100%"
        }

        Render.run(render)
        Engine.run(engine)

        // Create boundaries with increased thickness
        const thickness = 100

        const ground = Bodies.rectangle(
            containerWidth / 2,
            containerHeight + thickness / 2,
            containerWidth + thickness * 2,
            thickness,
            {
                isStatic: true,
                render: { fillStyle: "transparent" },
                label: "ground",
            },
        )

        const wallLeft = Bodies.rectangle(-thickness / 2, containerHeight / 2, thickness, containerHeight + thickness * 2, {
            isStatic: true,
            render: { fillStyle: "transparent" },
            label: "wallLeft",
        })

        const wallRight = Bodies.rectangle(
            containerWidth + thickness / 2,
            containerHeight / 2,
            thickness,
            containerHeight + thickness * 2,
            {
                isStatic: true,
                render: { fillStyle: "transparent" },
                label: "wallRight",
            },
        )

        const roof = Bodies.rectangle(containerWidth / 2, -thickness / 2, containerWidth + thickness * 2, thickness, {
            isStatic: true,
            render: { fillStyle: "transparent" },
            label: "roof",
        })

        World.add(world, [ground, wallLeft, wallRight, roof])

        // Sync Matter.js bodies with HTML elements
        const tags = containerElement.querySelectorAll(".tag")
        const tagBodies = Array.from(tags).map((tag) => {
            const htmlTag = tag as HTMLElement
            const width = htmlTag.offsetWidth
            const height = htmlTag.offsetHeight

            // Position tags based on container size with safe margins
            const margin = 60
            const x = Math.random() * (containerWidth - width - margin * 2) + width / 2 + margin
            const y = Math.random() * (containerHeight - height - margin * 2) + height / 2 + margin

            const body = Bodies.rectangle(x, y, width, height, {
                chamfer: { radius: height / 2 },
                density: 0.008,
                friction: 0.3,
                frictionAir: 0.02,
                restitution: 0.4,
                render: {
                    fillStyle: "transparent",
                },
            })

            World.add(world, body)
            return { body, element: tag }
        })

        // Function to check and reposition tags that go out of bounds
        const checkBounds = () => {
            tagBodies.forEach(({ body }) => {
                const { x, y } = body.position
                const margin = 50

                // If the tag goes too far out of bounds, reposition
                if (x < -margin || x > containerWidth + margin || y < -margin || y > containerHeight + margin) {
                    // Reposition to center with zero velocity
                    Matter.Body.setPosition(body, {
                        x: containerWidth / 2 + (Math.random() - 0.5) * 100,
                        y: containerHeight / 4 + Math.random() * 100,
                    })
                    Matter.Body.setVelocity(body, { x: 0, y: 0 })
                    Matter.Body.setAngularVelocity(body, 0)
                }

                // Limit maximum velocity to avoid too abrupt movements
                const maxVelocity = 15
                if (body.velocity.x > maxVelocity) Matter.Body.setVelocity(body, { x: maxVelocity, y: body.velocity.y })
                if (body.velocity.x < -maxVelocity) Matter.Body.setVelocity(body, { x: -maxVelocity, y: body.velocity.y })
                if (body.velocity.y > maxVelocity) Matter.Body.setVelocity(body, { x: body.velocity.x, y: maxVelocity })
                if (body.velocity.y < -maxVelocity) Matter.Body.setVelocity(body, { x: body.velocity.x, y: -maxVelocity })

                // Limit angular velocity
                const maxAngularVelocity = 0.3
                if (body.angularVelocity > maxAngularVelocity) Matter.Body.setAngularVelocity(body, maxAngularVelocity)
                if (body.angularVelocity < -maxAngularVelocity) Matter.Body.setAngularVelocity(body, -maxAngularVelocity)
            })
        }

        // Sync positions and rotation with Matter.js
        Events.on(engine, "afterUpdate", () => {
            checkBounds()

            tagBodies.forEach(({ body, element }) => {
                const { x, y } = body.position
                const angle = body.angle

                // TypeScript cast
                const htmlElement = element as HTMLElement

                // Apply only transformation
                htmlElement.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle}rad)`
            })
        })

        // Add mouse interactivity with limited force
        const mouse = Mouse.create(render.canvas)
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.15,
                render: {
                    visible: false,
                },
            },
        })

        World.add(world, mouseConstraint)

        // Add resize event listener
        window.addEventListener("resize", handleResize)
    }

    return (
        <>
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js"
                onLoad={handleScriptLoad}
                strategy="afterInteractive"
            />

            <div className="tech-stack-canvas-wrapper w-full">
                <div className="outer-frame">
                    <div className="inner-frame">
                        <div ref={containerRef} className="tech-stack-canvas relative w-full h-[600px] overflow-hidden">
                            <h2 className="absolute top-8 left-1/2 -translate-x-1/2 text-4xl font-bold text-foreground z-10 pointer-events-none">
                                Our Tech Stack
                            </h2>

                            {/* Frontend Technologies */}
                            <div className="tag bg-gradient-to-br from-sky-300 via-blue-400 to-indigo-400 text-white shadow-lg shadow-blue-300/50">React</div>
                            <div className="tag bg-gradient-to-br from-slate-300 via-gray-400 to-zinc-500 text-white shadow-lg shadow-gray-300/50">Next.js</div>
                            <div className="tag bg-gradient-to-br from-cyan-300 via-blue-300 to-blue-400 text-white shadow-lg shadow-cyan-300/50">TypeScript</div>
                            <div className="tag bg-gradient-to-br from-teal-300 via-cyan-400 to-sky-400 text-white shadow-lg shadow-teal-300/50">Tailwind CSS</div>

                            {/* Animation & UI */}
                            <div className="tag bg-gradient-to-br from-purple-300 via-violet-400 to-fuchsia-400 text-white shadow-lg shadow-purple-300/50">Framer Motion</div>
                            <div className="tag bg-gradient-to-br from-orange-300 via-amber-400 to-yellow-400 text-white shadow-lg shadow-orange-300/50">Lottie</div>
                            <div className="tag bg-gradient-to-br from-indigo-300 via-purple-400 to-violet-400 text-white shadow-lg shadow-indigo-300/50">Radix UI</div>

                            {/* Backend & Cloud */}
                            <div className="tag bg-gradient-to-br from-amber-300 via-orange-400 to-red-400 text-white shadow-lg shadow-amber-300/50">AWS</div>
                            <div className="tag bg-gradient-to-br from-lime-300 via-green-400 to-emerald-400 text-white shadow-lg shadow-lime-300/50">Node.js</div>
                            <div className="tag bg-gradient-to-br from-blue-300 via-indigo-400 to-violet-400 text-white shadow-lg shadow-blue-300/50">PostgreSQL</div>
                            <div className="tag bg-gradient-to-br from-green-300 via-emerald-400 to-teal-400 text-white shadow-lg shadow-green-300/50">MongoDB</div>

                            {/* Tools & Libraries */}
                            <div className="tag bg-gradient-to-br from-pink-300 via-rose-400 to-red-400 text-white shadow-lg shadow-pink-300/50">Zod</div>
                            <div className="tag bg-gradient-to-br from-violet-300 via-purple-400 to-indigo-400 text-white shadow-lg shadow-violet-300/50">React Hook Form</div>
                            <div className="tag bg-gradient-to-br from-emerald-300 via-teal-400 to-cyan-400 text-white shadow-lg shadow-emerald-300/50">Zustand</div>
                            <div className="tag bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-400 text-white shadow-lg shadow-yellow-300/50">D3.js</div>

                            {/* DevOps */}
                            <div className="tag bg-gradient-to-br from-slate-400 via-gray-500 to-zinc-500 text-white shadow-lg shadow-slate-300/50">Docker</div>
                            <div className="tag bg-gradient-to-br from-red-300 via-rose-400 to-pink-400 text-white shadow-lg shadow-red-300/50">Git</div>
                            <div className="tag bg-gradient-to-br from-purple-400 via-violet-500 to-indigo-500 text-white shadow-lg shadow-purple-300/50">GitHub Actions</div>

                            {/* Additional */}
                            <div className="tag bg-gradient-to-br from-cyan-300 via-teal-400 to-emerald-400 text-white shadow-lg shadow-cyan-300/50">Vercel</div>
                            <div className="tag bg-gradient-to-br from-sky-300 via-blue-400 to-cyan-400 text-white shadow-lg shadow-sky-300/50">Netlify</div>
                            <div className="tag bg-gradient-to-br from-fuchsia-300 via-pink-400 to-rose-400 text-white shadow-lg shadow-fuchsia-300/50">GraphQL</div>
                            <div className="tag bg-gradient-to-br from-lime-300 via-yellow-400 to-amber-400 text-white shadow-lg shadow-lime-300/50">REST API</div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .tech-stack-canvas-wrapper {
          padding: 2rem 1rem;
        }

        .outer-frame {
          max-width: 900px;
          margin: 0 auto;
        }

        .inner-frame {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          background: transparent;
          border: none;
        }

        .tech-stack-canvas {
          position: relative;
        }

        .tag {
          position: absolute;
          padding: 0.75rem 1.5rem;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: grab;
          user-select: none;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: box-shadow 0.2s ease;
          white-space: nowrap;
        }

        .tag:active {
          cursor: grabbing;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
        }

        @media (max-width: 768px) {
          .tech-stack-canvas {
            height: 500px !important;
          }

          .tag {
            padding: 0.5rem 1rem;
            font-size: 0.75rem;
          }

          .tech-stack-canvas h2 {
            font-size: 1.5rem;
            top: 1rem;
          }
        }
      `}</style>
        </>
    )
}

// Add types for Matter.js
declare global {
    interface Window {
        Matter: any
    }
}
