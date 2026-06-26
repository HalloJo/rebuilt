'use client'

import { motion, useReducedMotion } from 'framer-motion'

const BUBBLES = [
  { cx: 19, cy: 30, delay: 0 },
  { cx: 25, cy: 24, delay: 0.7 },
  { cx: 21, cy: 19, delay: 1.4 },
]

interface Props {
  className?: string
}

export function FlaskIllustration({ className }: Props) {
  const reduce = useReducedMotion()

  return (
    <svg viewBox="0 0 44 44" fill="none" aria-hidden="true" className={className}>
      {/* Flask body (Erlenmeyer) */}
      <path
        d="M17,8 L17,21 L8,38 L36,38 L27,21 L27,8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Neck cap */}
      <line
        x1="15"
        y1="8"
        x2="29"
        y2="8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Liquid surface line */}
      <line
        x1="11"
        y1="30"
        x2="33"
        y2="30"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity={0.25}
      />
      {/* Bubbles floating upward */}
      {BUBBLES.map((b, i) => (
        <motion.circle
          key={i}
          cx={b.cx}
          cy={b.cy}
          r="1.8"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          animate={reduce ? { opacity: 0.25 } : { opacity: [0, 0.55, 0], y: [0, -5, -10] }}
          transition={
            reduce
              ? {}
              : {
                  duration: 2.2,
                  delay: b.delay,
                  repeat: Infinity,
                  repeatDelay: 0.8,
                  ease: 'easeOut',
                }
          }
        />
      ))}
    </svg>
  )
}
