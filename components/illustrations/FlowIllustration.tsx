'use client'

import { motion, useReducedMotion } from 'framer-motion'

const NODES = [
  { cy: 18, label: 'I' },
  { cy: 54, label: 'P' },
  { cy: 90, label: 'P' },
]

// Each node is active for 1/3 of the 3s cycle
const activeOpacity = (index: number) => {
  const base = [0.25, 0.25, 0.25]
  const active = [...base]
  active[index] = 0.9
  return active
}

interface Props {
  className?: string
}

export function FlowIllustration({ className }: Props) {
  const reduce = useReducedMotion()

  return (
    <svg viewBox="0 0 44 108" fill="none" aria-hidden="true" className={className}>
      {/* Connecting lines */}
      <line x1="22" y1="28" x2="22" y2="44" stroke="currentColor" strokeWidth="1" opacity={0.25} />
      <line x1="22" y1="64" x2="22" y2="80" stroke="currentColor" strokeWidth="1" opacity={0.25} />

      {/* Arrowheads */}
      <polyline
        points="18,40 22,46 26,40"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity={0.25}
        strokeLinejoin="round"
      />
      <polyline
        points="18,76 22,82 26,76"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity={0.25}
        strokeLinejoin="round"
      />

      {/* Nodes */}
      {NODES.map((node, i) => (
        <motion.g key={i}>
          <motion.circle
            cx="22"
            cy={node.cy}
            r="9"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            animate={reduce ? { opacity: 0.5 } : { opacity: activeOpacity(i) }}
            transition={
              reduce
                ? {}
                : {
                    duration: 3,
                    repeat: Infinity,
                    times: [0, 0.33, 0.66],
                    ease: 'easeInOut',
                    delay: i * 0.0,
                  }
            }
          />
          <text
            x="22"
            y={node.cy + 4}
            textAnchor="middle"
            fontSize="8"
            fontFamily="ui-monospace, monospace"
            fill="currentColor"
            opacity={0.5}
          >
            {node.label}
          </text>
        </motion.g>
      ))}
    </svg>
  )
}
