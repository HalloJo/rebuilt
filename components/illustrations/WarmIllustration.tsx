'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface Props {
  className?: string
}

export function WarmIllustration({ className }: Props) {
  const reduce = useReducedMotion()

  return (
    <svg viewBox="0 0 44 44" fill="none" aria-hidden="true" className={className}>
      {/* Outer ring — slow pulse */}
      <motion.circle
        cx="22"
        cy="22"
        r="19"
        stroke="currentColor"
        strokeWidth="1"
        animate={reduce ? { opacity: 0.08 } : { opacity: [0.04, 0.18, 0.04] }}
        transition={reduce ? {} : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Middle ring */}
      <motion.circle
        cx="22"
        cy="22"
        r="13"
        stroke="currentColor"
        strokeWidth="1"
        animate={reduce ? { opacity: 0.18 } : { opacity: [0.12, 0.32, 0.12] }}
        transition={
          reduce ? {} : { duration: 3.5, delay: 0.4, repeat: Infinity, ease: 'easeInOut' }
        }
      />
      {/* Inner filled circle */}
      <motion.circle
        cx="22"
        cy="22"
        r="6"
        fill="currentColor"
        animate={reduce ? { opacity: 0.7 } : { opacity: [0.55, 0.85, 0.55] }}
        transition={
          reduce ? {} : { duration: 3.5, delay: 0.8, repeat: Infinity, ease: 'easeInOut' }
        }
      />
    </svg>
  )
}
