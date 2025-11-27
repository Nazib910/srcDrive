"use client"

import { Marquee } from "@/components/magicui/marquee"
import { useLocalization } from "@/contexts/LocalizationContext"

const testimonials = [
  {
    name: "Alex Johnson",
    username: "@alexdev",
    body: "SRCDrive delivered our entire web app in half the expected time. Their team's expertise was invaluable.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Sarah Chen",
    username: "@sarahtech",
    body: "The UI/UX design they created for us was stunning. Our users loved the interface immediately.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Michael Rodriguez",
    username: "@mikebuilds",
    body: "From mobile app development to cloud solutions, SRCDrive handles everything with professionalism.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Emily Watson",
    username: "@emilycode",
    body: "Their custom software development perfectly matched our complex business requirements.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "David Kim",
    username: "@davidtech",
    body: "Best decision to partner with SRCDrive. Professional, responsive, and results-driven.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Jessica Lopez",
    username: "@jessicadev",
    body: "Our cloud solutions are now scalable and secure thanks to SRCDrive's architecture.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "James Thompson",
    username: "@jamestech",
    body: "SRCDrive transformed our vision into a market-ready product. Highly recommended.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Rachel Green",
    username: "@rachelcode",
    body: "Working with SRCDrive was seamless. Great communication and exceptional delivery.",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Thomas Brown",
    username: "@tomdev",
    body: "SRCDrive's expertise in web development helped us launch faster than anticipated.",
    img: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
  },
]

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

const TestimonialCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string
  name: string
  username: string
  body: string
}) => {
  return (
    <div className="relative w-full max-w-xs overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-8 md:p-10 shadow-lg">
      <div className="absolute -top-5 -left-5 -z-10 h-40 w-40 rounded-full bg-primary/10 blur-md"></div>

      <div className="text-foreground leading-relaxed text-sm sm:text-base">{body}</div>

      <div className="mt-4 sm:mt-5 flex items-center gap-2 sm:gap-3">
        <img src={img || "/placeholder.svg"} alt={name} height="40" width="40" className="h-8 sm:h-10 w-8 sm:w-10 rounded-full" />
        <div className="flex flex-col">
          <div className="leading-4 sm:leading-5 font-medium tracking-tight text-foreground text-sm sm:text-base">{name}</div>
          <div className="leading-4 sm:leading-5 tracking-tight text-muted-foreground text-xs sm:text-sm">{username}</div>
        </div>
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  const { t } = useLocalization()
  return (
    <section id="testimonials" className="mb-16 sm:mb-20 md:mb-24 px-4 sm:px-0">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-[540px]">
          <div className="flex justify-center">
            <button
              type="button"
              className="group relative z-[60] mx-auto rounded-full border border-border/60 bg-secondary/30 px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm backdrop-blur transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-100"
            >
              <div className="absolute inset-x-0 -top-px mx-auto h-0.5 w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent shadow-2xl transition-all duration-500 group-hover:w-3/4"></div>
              <div className="absolute inset-x-0 -bottom-px mx-auto h-0.5 w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent shadow-2xl transition-all duration-500 group-hover:h-px"></div>
              <span className="relative text-foreground">{t('testimonials.badge')}</span>
            </button>
          </div>
          <h2 className="mt-4 sm:mt-5 bg-gradient-to-r from-foreground/60 via-foreground to-foreground/60 bg-clip-text text-center text-2xl sm:text-3xl md:text-4xl lg:text-[54px] font-semibold tracking-tighter text-transparent lg:leading-[60px]">
            {t('testimonials.title')}
          </h2>

          <p className="mt-4 sm:mt-5 text-center text-base sm:text-lg text-muted-foreground px-2 sm:px-0">
            {t('testimonials.description')}
          </p>
        </div>

        <div className="my-12 sm:my-16 flex max-h-[400px] sm:max-h-[600px] md:max-h-[738px] justify-center gap-3 sm:gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
          <div>
            <Marquee pauseOnHover vertical className="[--duration:20s]">
              {firstColumn.map((testimonial) => (
                <TestimonialCard key={testimonial.username} {...testimonial} />
              ))}
            </Marquee>
          </div>

          <div className="hidden md:block">
            <Marquee reverse pauseOnHover vertical className="[--duration:25s]">
              {secondColumn.map((testimonial) => (
                <TestimonialCard key={testimonial.username} {...testimonial} />
              ))}
            </Marquee>
          </div>

          <div className="hidden lg:block">
            <Marquee pauseOnHover vertical className="[--duration:30s]">
              {thirdColumn.map((testimonial) => (
                <TestimonialCard key={testimonial.username} {...testimonial} />
              ))}
            </Marquee>
          </div>
        </div>

        <div className="-mt-6 sm:-mt-8 flex justify-center">
          <button className="group relative inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium text-foreground transition-all hover:border-primary/60 hover:bg-primary/10 active:scale-95">
            <div className="absolute inset-x-0 -top-px mx-auto h-px w-3/4 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
            <div className="absolute inset-x-0 -bottom-px mx-auto h-px w-3/4 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
            <svg className="h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417a9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
            </svg>
            {t('testimonials.share')}
          </button>
        </div>
      </div>
    </section>
  )
}
