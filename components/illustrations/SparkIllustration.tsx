'use client'

import { motion, useReducedMotion } from 'framer-motion'

// 4 cardinal + 4 diagonal rays from center (22,22)
const RAYS = [
  { d: 'M22,22 L22,8', weight: '1.5', baseOpacity: 0.8 }, // up
  { d: 'M22,22 L36,22', weight: '1.5', baseOpacity: 0.8 }, // right
  { d: 'M22,22 L22,36', weight: '1.5', baseOpacity: 0.8 }, // down
  { d: 'M22,22 L8,22', weight: '1.5', baseOpacity: 0.8 }, // left
  { d: 'M22,22 L32,12', weight: '1', baseOpacity: 0.45 }, // up-right
  { d: 'M22,22 L32,32', weight: '1', baseOpacity: 0.45 }, // down-right
  { d: 'M22,22 L12,32', weight: '1', baseOpacity: 0.45 }, // down-left
  { d: 'M22,22 L12,12', weight: '1', baseOpacity: 0.45 }, // up-left
]

interface Props {
  className?: string
}

export function SparkIllustration({ className }: Props) {
  const reduce = useReducedMotion()

  return (
    <svg viewBox="0 0 44 44" fill="none" aria-hidden="true" className={className}>
      {RAYS.map((ray, i) => (
        <motion.path
          key={i}
          d={ray.d}
          stroke="currentColor"
          strokeWidth={ray.weight}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: ray.baseOpacity }}
          transition={{
            pathLength: {
              duration: reduce ? 0 : 0.3,
              delay: reduce ? 0 : i * 0.06,
              ease: 'easeOut',
            },
            opacity: { duration: 0.01, delay: reduce ? 0 : i * 0.06 },
          }}
        />
      ))}
      {/* Center — pulses after rays are drawn */}
      <motion.circle
        cx="22"
        cy="22"
        r="3.5"
        fill="currentColor"
        animate={reduce ? { opacity: 0.8 } : { opacity: [0.5, 1, 0.5], scale: [1, 1.25, 1] }}
        transition={{ duration: 2.5, delay: 0.8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  )
}
