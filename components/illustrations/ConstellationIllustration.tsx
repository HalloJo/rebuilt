'use client'

import { motion, useReducedMotion } from 'framer-motion'

const NODES = [
  { cx: 54, cy: 46 }, // 0 — center (pulses)
  { cx: 54, cy: 10 }, // 1 — top
  { cx: 86, cy: 28 }, // 2 — top-right
  { cx: 88, cy: 64 }, // 3 — bottom-right
  { cx: 54, cy: 82 }, // 4 — bottom
  { cx: 20, cy: 64 }, // 5 — bottom-left
  { cx: 22, cy: 28 }, // 6 — top-left
]

// Spokes from center + outer ring
const EDGES = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [0, 6],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 1],
]

interface Props {
  className?: string
}

export function ConstellationIllustration({ className }: Props) {
  const reduce = useReducedMotion()

  return (
    <svg viewBox="0 0 108 92" fill="none" aria-hidden="true" className={className}>
      {EDGES.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={NODES[a].cx}
          y1={NODES[a].cy}
          x2={NODES[b].cx}
          y2={NODES[b].cy}
          stroke="currentColor"
          strokeWidth="0.75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ duration: reduce ? 0 : 0.3, delay: reduce ? 0 : 0.4 + i * 0.05 }}
        />
      ))}
      {NODES.slice(1).map((n, i) => (
        <motion.circle
          key={i}
          cx={n.cx}
          cy={n.cy}
          r="3"
          fill="currentColor"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: reduce ? 0 : 0.25, delay: reduce ? 0 : 0.3 + i * 0.07 }}
        />
      ))}
      {/* Center — pulses */}
      <motion.circle
        cx={NODES[0].cx}
        cy={NODES[0].cy}
        r="5"
        fill="currentColor"
        initial={{ opacity: 0 }}
        animate={reduce ? { opacity: 0.8 } : { opacity: [0.5, 1, 0.5], scale: [1, 1.35, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      />
    </svg>
  )
}
