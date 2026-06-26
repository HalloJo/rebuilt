'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface Props {
  className?: string
}

const LAYERS = [
  { x: 6, y: 33, w: 32 },
  { x: 9, y: 25, w: 26 },
  { x: 12, y: 17, w: 20 },
  { x: 15, y: 9, w: 14 },
]

export function StackIllustration({ className }: Props) {
  const reduce = useReducedMotion()

  return (
    <svg viewBox="0 0 44 44" fill="none" aria-hidden="true" className={className}>
      {LAYERS.map((l, i) => (
        <motion.rect
          key={i}
          x={l.x}
          y={l.y}
          width={l.w}
          height={5}
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: reduce ? 0.7 : [0.5, 0.8, 0.5],
          }}
          transition={{
            pathLength: {
              duration: reduce ? 0 : 0.4,
              delay: reduce ? 0 : i * 0.13,
              ease: 'easeOut',
            },
            opacity: {
              duration: 2.8,
              delay: reduce ? 0 : i * 0.13 + 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        />
      ))}
    </svg>
  )
}
