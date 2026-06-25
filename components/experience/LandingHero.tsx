'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { StoryLine } from '@/types'

const LINES: StoryLine[] = [
  { text: 'Hi LeadLogic 👋', variant: 'heading' },
  { text: 'Your feedback was clear.', variant: 'body' },
  { text: 'And honestly...', variant: 'body' },
  { text: 'you were right.', variant: 'body' },
  { text: 'I had used AI.', variant: 'body' },
  { text: 'But I forgot to show myself.', variant: 'body' },
  { text: 'So instead of rewriting my motivation...', variant: 'body' },
  { text: 'I rebuilt it.', variant: 'emphasis' },
]

// Staggered delays that give each line room to land
const LINE_DELAYS = [0.3, 0.9, 1.5, 2.1, 2.9, 3.5, 4.1, 4.9]
const BUTTON_DELAY = 5.7

const EASE = [0.25, 0.46, 0.45, 0.94] as const

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, ease: EASE, delay },
  }
}

const LINE_STYLES: Record<StoryLine['variant'], string> = {
  heading: 'text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl',
  body: 'text-lg text-zinc-400 sm:text-xl',
  emphasis: 'text-2xl font-semibold text-white sm:text-3xl',
}

export function LandingHero() {
  const handleStart = () => {
    document.getElementById('next-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main
      className="relative z-10 flex min-h-svh flex-col items-center justify-center px-6 py-24"
      aria-label="Introduction"
    >
      <div className="w-full max-w-2xl space-y-6 text-center">
        {LINES.map((line, i) => {
          const Tag = line.variant === 'heading' ? motion.h1 : motion.p
          return (
            <Tag key={line.text} {...fadeUp(LINE_DELAYS[i])} className={LINE_STYLES[line.variant]}>
              {line.text}
            </Tag>
          )
        })}

        <motion.div {...fadeUp(BUTTON_DELAY)} className="pt-8">
          <button
            onClick={handleStart}
            className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-zinc-100 hover:shadow-lg hover:shadow-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
          >
            Start Experience
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </button>
        </motion.div>
      </div>
    </main>
  )
}
