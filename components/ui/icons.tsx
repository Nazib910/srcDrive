import React from "react"

export function USFlag({ className, ...props }: React.ComponentProps<"svg">) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 480"
            className={className}
            {...props}
        >
            <path fill="#bd3d44" d="M0 0h640v480H0" />
            <path stroke="#fff" strokeWidth="37" d="M0 55.3h640M0 129h640M0 202.8h640M0 276.5h640M0 350.2h640M0 423.9h640" />
            <path fill="#192f5d" d="M0 0h296.4v258.5H0" />
            <path
                fill="#fff"
                d="M24.7 27.1h15.8v15.8H24.7M24.7 89h15.8v15.8H24.7M24.7 150.9h15.8v15.8H24.7M24.7 212.7h15.8v15.8H24.7M86.6 27.1h15.8v15.8H86.6M86.6 89h15.8v15.8H86.6M86.6 150.9h15.8v15.8H86.6M86.6 212.7h15.8v15.8H86.6M148.5 27.1h15.8v15.8h-15.8M148.5 89h15.8v15.8h-15.8M148.5 150.9h15.8v15.8h-15.8M148.5 212.7h15.8v15.8h-15.8M210.4 27.1h15.8v15.8h-15.8M210.4 89h15.8v15.8h-15.8M210.4 150.9h15.8v15.8h-15.8M210.4 212.7h15.8v15.8h-15.8M272.3 27.1h15.8v15.8h-15.8M272.3 89h15.8v15.8h-15.8M272.3 150.9h15.8v15.8h-15.8M272.3 212.7h15.8v15.8h-15.8M55.7 58h15.8v15.8H55.7M55.7 119.9h15.8v15.8H55.7M55.7 181.8h15.8v15.8H55.7M117.6 58h15.8v15.8h-15.8M117.6 119.9h15.8v15.8h-15.8M117.6 181.8h15.8v15.8h-15.8M179.5 58h15.8v15.8h-15.8M179.5 119.9h15.8v15.8h-15.8M179.5 181.8h15.8v15.8h-15.8M241.4 58h15.8v15.8h-15.8M241.4 119.9h15.8v15.8h-15.8M241.4 181.8h15.8v15.8h-15.8"
            />
        </svg>
    )
}

export function DEFlag({ className, ...props }: React.ComponentProps<"svg">) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 5 3"
            className={className}
            {...props}
        >
            <rect width="5" height="3" y="0" x="0" fill="#000" />
            <rect width="5" height="2" y="1" x="0" fill="#D00" />
            <rect width="5" height="1" y="2" x="0" fill="#FFCE00" />
        </svg>
    )
}
