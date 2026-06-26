'use client'

import { motion, useReducedMotion } from 'framer-motion'

// Isometric cube — 9 visible edges + 3 hidden back edges
// Vertices: A(60,15) B(90,33) C(30,33) D(60,50) F(90,68) G(30,68) H(60,85)
// Hidden center E(60,50) coincides with D in isometric projection
const VISIBLE: string[] = [
  'M60,15 L90,33', // A→B
  'M60,15 L30,33', // A→C
  'M90,33 L60,50', // B→D
  'M30,33 L60,50', // C→D
  'M90,33 L90,68', // B→F
  'M30,33 L30,68', // C→G
  'M60,50 L60,85', // D→H
  'M90,68 L60,85', // F→H
  'M30,68 L60,85', // G→H
]

const HIDDEN: string[] = [
  'M60,50 L90,68', // E→F
  'M60,50 L30,68', // E→G
  'M60,50 L60,15', // E→A
]

interface Props {
  className?: string
}

export function CubeIllustration({ className }: Props) {
  const reduce = useReducedMotion()

  return (
    <svg viewBox="0 0 120 100" fill="none" aria-hidden="true" className={className}>
      {HIDDEN.map((d, i) => (
        <motion.path
          key={`h${i}`}
          d={d}
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: reduce ? 0 : 0.3, delay: reduce ? 0 : 1.1 + i * 0.05 }}
        />
      ))}
      {VISIBLE.map((d, i) => (
        <motion.path
          key={`v${i}`}
          d={d}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: {
              duration: reduce ? 0 : 0.3,
              delay: reduce ? 0 : i * 0.09,
              ease: 'easeOut',
            },
            opacity: { duration: 0.01, delay: reduce ? 0 : i * 0.09 },
          }}
        />
      ))}
    </svg>
  )
}
