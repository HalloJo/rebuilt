'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface Props {
  className?: string
}

export function ZapIllustration({ className }: Props) {
  const reduce = useReducedMotion()

  return (
    <svg viewBox="0 0 44 44" fill="none" aria-hidden="true" className={className}>
      {/* Lightning bolt */}
      <motion.path
        d="M26,4 L14,22 L22,22 L18,40"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: { duration: reduce ? 0 : 0.5, ease: 'easeOut' },
          opacity: { duration: 0.01 },
        }}
      />
      {/* Speed lines that flash periodically */}
      {[
        { x1: 30, y1: 14, x2: 40, y2: 14, delay: 0.7 },
        { x1: 28, y1: 20, x2: 40, y2: 20, delay: 0.9 },
        { x1: 28, y1: 28, x2: 38, y2: 28, delay: 1.1 },
      ].map((l, i) => (
        <motion.line
          key={i}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          animate={reduce ? { opacity: 0.15 } : { opacity: [0, 0.45, 0] }}
          transition={
            reduce
              ? {}
              : {
                  duration: 1.4,
                  delay: l.delay,
                  repeat: Infinity,
                  repeatDelay: 2.2,
                  ease: 'easeInOut',
                }
          }
        />
      ))}
    </svg>
  )
}
