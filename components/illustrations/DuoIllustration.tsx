'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface Props {
  className?: string
}

export function DuoIllustration({ className }: Props) {
  const reduce = useReducedMotion()

  return (
    <svg viewBox="0 0 44 44" fill="none" aria-hidden="true" className={className}>
      {/* Connecting dashed bridge */}
      <line
        x1="20"
        y1="22"
        x2="24"
        y2="22"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeDasharray="1.5 1.5"
        opacity={0.25}
      />

      {/* Left circle — pulses first */}
      <motion.circle
        cx="11"
        cy="22"
        r="9"
        stroke="currentColor"
        strokeWidth="1.5"
        animate={reduce ? { opacity: 0.7 } : { opacity: [0.35, 0.85, 0.35] }}
        transition={reduce ? {} : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Left inner dot */}
      <motion.circle
        cx="11"
        cy="22"
        r="2.5"
        fill="currentColor"
        animate={reduce ? { opacity: 0.5 } : { opacity: [0.3, 0.7, 0.3] }}
        transition={reduce ? {} : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Right circle — pulses offset (anti-phase) */}
      <motion.circle
        cx="33"
        cy="22"
        r="9"
        stroke="currentColor"
        strokeWidth="1.5"
        animate={reduce ? { opacity: 0.7 } : { opacity: [0.85, 0.35, 0.85] }}
        transition={reduce ? {} : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Right inner dot */}
      <motion.circle
        cx="33"
        cy="22"
        r="2.5"
        fill="currentColor"
        animate={reduce ? { opacity: 0.5 } : { opacity: [0.7, 0.3, 0.7] }}
        transition={reduce ? {} : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  )
}
