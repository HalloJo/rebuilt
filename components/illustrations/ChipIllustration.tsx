'use client'

import { motion, useReducedMotion } from 'framer-motion'

// 3×3 grid of nodes
const DOTS = [
  [10, 10],
  [22, 10],
  [34, 10],
  [10, 22],
  [22, 22],
  [34, 22],
  [10, 34],
  [22, 34],
  [34, 34],
] as const

interface Props {
  className?: string
}

export function ChipIllustration({ className }: Props) {
  const reduce = useReducedMotion()

  return (
    <svg viewBox="0 0 44 44" fill="none" aria-hidden="true" className={className}>
      {/* Grid lines */}
      {[10, 22, 34].map((x) => (
        <line
          key={`v${x}`}
          x1={x}
          y1={10}
          x2={x}
          y2={34}
          stroke="currentColor"
          strokeWidth="0.5"
          opacity={0.15}
        />
      ))}
      {[10, 22, 34].map((y) => (
        <line
          key={`h${y}`}
          x1={10}
          y1={y}
          x2={34}
          y2={y}
          stroke="currentColor"
          strokeWidth="0.5"
          opacity={0.15}
        />
      ))}
      {/* Nodes — pulse sequentially like a scan */}
      {DOTS.map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r="2.5"
          fill="currentColor"
          animate={reduce ? { opacity: 0.35 } : { opacity: [0.15, 0.85, 0.15] }}
          transition={
            reduce ? {} : { duration: 2.7, delay: i * 0.18, repeat: Infinity, ease: 'easeInOut' }
          }
        />
      ))}
    </svg>
  )
}
