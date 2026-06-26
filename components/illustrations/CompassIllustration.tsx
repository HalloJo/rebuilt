'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface Props {
  className?: string
}

export function CompassIllustration({ className }: Props) {
  const reduce = useReducedMotion()

  return (
    <svg viewBox="0 0 44 44" fill="none" aria-hidden="true" className={className}>
      {/* Outer ring */}
      <circle cx="22" cy="22" r="17" stroke="currentColor" strokeWidth="1.5" />
      {/* Cardinal tick marks */}
      <line
        x1="22"
        y1="7"
        x2="22"
        y2="11"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity={0.5}
      />
      <line
        x1="22"
        y1="33"
        x2="22"
        y2="37"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity={0.3}
      />
      <line
        x1="7"
        y1="22"
        x2="11"
        y2="22"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity={0.3}
      />
      <line
        x1="33"
        y1="22"
        x2="37"
        y2="22"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity={0.3}
      />
      {/* Needle — rocks ±22° around center */}
      <motion.g
        style={{ transformOrigin: '22px 22px' }}
        animate={reduce ? {} : { rotate: [-22, 22, -22] }}
        transition={reduce ? {} : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* North point (longer, solid) */}
        <path d="M22,22 L22,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {/* South counterweight (shorter, faint) */}
        <path
          d="M22,22 L22,30"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity={0.3}
        />
        {/* Pivot dot */}
        <circle cx="22" cy="22" r="2" fill="currentColor" />
      </motion.g>
    </svg>
  )
}
