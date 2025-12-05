import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ThemeProvider } from "@/components/theme-provider"
import { LocalizationProvider } from "@/contexts/LocalizationContext"
import "./globals.css"

export const metadata: Metadata = {
  title: "SRCDrive - SaaS Agency",
  description: "Professional web development, mobile app development, UI/UX design, cloud solutions, and custom software development services.",
  generator: "SRCDrive",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <meta name="description" content="Professional web development, mobile app development, UI/UX design, cloud solutions, and custom software development services." />
      </head>
      <body className={GeistSans.className}>
        <LocalizationProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
          </ThemeProvider>
        </LocalizationProvider>
      </body>
    </html>
  )
}
