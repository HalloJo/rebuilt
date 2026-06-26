'use client'

import { motion, useReducedMotion } from 'framer-motion'

const POINTS = [
  { cx: 12, cy: 32, delay: 0.6 },
  { cx: 22, cy: 22, delay: 0.9 },
  { cx: 34, cy: 12, delay: 1.2 },
]

interface Props {
  className?: string
}

export function TrendIllustration({ className }: Props) {
  const reduce = useReducedMotion()

  return (
    <svg viewBox="0 0 44 44" fill="none" aria-hidden="true" className={className}>
      {/* Axes */}
      <line
        x1="8"
        y1="38"
        x2="8"
        y2="8"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity={0.2}
      />
      <line
        x1="8"
        y1="38"
        x2="40"
        y2="38"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity={0.2}
      />
      {/* Rising trend line */}
      <motion.path
        d="M12,32 L22,22 L34,12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: { duration: reduce ? 0 : 0.9, ease: 'easeOut' },
          opacity: { duration: 0.01 },
        }}
      />
      {/* Data point dots */}
      {POINTS.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.cx}
          cy={p.cy}
          r="2.5"
          fill="currentColor"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ duration: reduce ? 0 : 0.2, delay: reduce ? 0 : p.delay }}
        />
      ))}
      {/* End point pulses to suggest ongoing growth */}
      <motion.circle
        cx={34}
        cy={12}
        r="5"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        animate={reduce ? { opacity: 0 } : { opacity: [0, 0.3, 0], scale: [1, 1.6, 1] }}
        transition={{ duration: 2, delay: 1.5, repeat: Infinity, ease: 'easeOut' }}
      />
    </svg>
  )
}
