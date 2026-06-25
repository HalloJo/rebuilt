'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, RotateCcw } from 'lucide-react'
import { LandingHero } from './LandingHero'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

const variants = {
  enter: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -40 },
}

export function ExperienceController() {
  const [section, setSection] = useState(0)
  const [heroSeen, setHeroSeen] = useState(false)

  function goNext() {
    setHeroSeen(true)
    setSection(1)
  }

  return (
    <div className="h-full">
      <AnimatePresence mode="wait">
        {section === 0 && (
          <motion.div
            key="hero"
            variants={variants}
            initial="enter"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.6, ease: EASE }}
            className="h-full"
          >
            <LandingHero onNext={goNext} skipAnimation={heroSeen} />
          </motion.div>
        )}

        {section === 1 && (
          <motion.div
            key="next"
            variants={variants}
            initial="enter"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.6, ease: EASE }}
            className="flex h-full flex-col items-center justify-center gap-12 px-6"
          >
            <p className="text-muted font-mono text-sm">More coming soon...</p>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setSection((s) => s - 1)}
                className="group text-foreground hover:border-accent/40 hover:shadow-accent/10 focus-visible:ring-accent focus-visible:ring-offset-background inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <ArrowLeft
                  size={15}
                  className="text-accent transition-transform duration-200 group-hover:-translate-x-0.5"
                />
                Terug
              </button>

              <button
                onClick={() => setSection(0)}
                className="group text-foreground hover:border-accent/40 hover:shadow-accent/10 focus-visible:ring-accent focus-visible:ring-offset-background inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <RotateCcw
                  size={15}
                  className="text-accent transition-transform duration-200 group-hover:-rotate-45"
                />
                Naar begin
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
