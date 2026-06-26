'use client'

import { motion, useReducedMotion } from 'framer-motion'

// Both paths: M + 7 L + Z — same command count so Framer Motion can morph between them
// Rough: irregular radii at 8 compass points
const ROUGH = 'M88,50 L73,27 L50,10 L25,25 L12,50 L27,73 L50,91 L76,76 Z'
// Smooth: regular octagon (inscribed in same bounding circle)
const SMOOTH = 'M88,50 L77,23 L50,12 L23,23 L12,50 L23,77 L50,88 L77,77 Z'

interface Props {
  className?: string
}

export function MorphIllustration({ className }: Props) {
  const reduce = useReducedMotion()

  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" className={className}>
      <motion.path
        d={ROUGH}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        animate={reduce ? { d: SMOOTH } : { d: [ROUGH, SMOOTH, ROUGH] }}
        transition={
          reduce
            ? { duration: 0 }
            : { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }
        }
      />
    </svg>
  )
}
