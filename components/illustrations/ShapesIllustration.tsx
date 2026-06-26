'use client'

import { motion, useReducedMotion, type Target, type Transition } from 'framer-motion'

interface Props {
  className?: string
}

export function ShapesIllustration({ className }: Props) {
  const reduce = useReducedMotion()

  const float = (
    yVals: number[],
    duration: number,
    delay = 0
  ): { animate: Target; transition: Transition } => ({
    animate: reduce ? {} : { y: yVals },
    transition: reduce ? {} : { duration, delay, repeat: Infinity, ease: 'easeInOut' },
  })

  return (
    <svg viewBox="0 0 108 80" fill="none" aria-hidden="true" className={className}>
      {/* Circle */}
      <motion.circle
        cx="18"
        cy="40"
        r="13"
        stroke="currentColor"
        strokeWidth="1.5"
        {...float([-5, 5, -5], 3)}
      />
      {/* Square */}
      <motion.rect
        x="44"
        y="27"
        width="22"
        height="22"
        stroke="currentColor"
        strokeWidth="1.5"
        rx="2"
        {...float([5, -5, 5], 3.6, 0.3)}
      />
      {/* Triangle */}
      <motion.polygon
        points="90,26 76,64 104,64"
        stroke="currentColor"
        strokeWidth="1.5"
        {...float([-4, 6, -4], 4.2, 0.7)}
      />
    </svg>
  )
}
