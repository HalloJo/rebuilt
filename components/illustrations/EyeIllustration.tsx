'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface Props {
  className?: string
}

export function EyeIllustration({ className }: Props) {
  const reduce = useReducedMotion()

  return (
    <svg viewBox="0 0 44 44" fill="none" aria-hidden="true" className={className}>
      {/* Eye outline — two cubic arcs forming a lens shape */}
      <path
        d="M6,22 C10,12 34,12 38,22 C34,32 10,32 6,22 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Iris */}
      <motion.circle
        cx="22"
        cy="22"
        r="7"
        stroke="currentColor"
        strokeWidth="1.5"
        animate={reduce ? { opacity: 1 } : { opacity: [0.55, 0.9, 0.55] }}
        transition={reduce ? {} : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Pupil — drifts slowly, suggesting careful attention */}
      <motion.circle
        cx="22"
        cy="22"
        r="3"
        fill="currentColor"
        animate={reduce ? { x: 0, y: 0 } : { x: [-1.5, 1.5, 0, -1.5], y: [0, 0, -1, 0] }}
        transition={reduce ? {} : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle glint */}
      <circle cx="24.5" cy="19.5" r="1" fill="currentColor" opacity={0.2} />
    </svg>
  )
}
