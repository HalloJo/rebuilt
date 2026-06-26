'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface Props {
  className?: string
}

export function LaunchIllustration({ className }: Props) {
  const reduce = useReducedMotion()

  return (
    <svg viewBox="0 0 44 44" fill="none" aria-hidden="true" className={className}>
      <motion.g
        animate={reduce ? {} : { y: [-2, 2, -2] }}
        transition={reduce ? {} : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Rocket body */}
        <path
          d="M22,5 L30,26 L22,32 L14,26 Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Left fin */}
        <path
          d="M14,26 L8,34 L16,29"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Right fin */}
        <path
          d="M30,26 L36,34 L28,29"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Porthole */}
        <circle cx="22" cy="19" r="3" stroke="currentColor" strokeWidth="1" opacity={0.45} />
        {/* Flame — flickers inside the floating group so it moves with the rocket */}
        <motion.path
          d="M18,32 L22,39 L26,32"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={reduce ? { opacity: 0.4 } : { opacity: [0.15, 0.65, 0.15] }}
          transition={reduce ? {} : { duration: 0.85, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.g>
    </svg>
  )
}
