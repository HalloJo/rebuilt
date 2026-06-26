'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LandingHero } from './LandingHero'
import { WhyLeadLogic } from './WhyLeadLogic'
import { BuildLog } from './BuildLog'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

const variants = {
  enter: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -40 },
}

function wrap(key: string, children: React.ReactNode) {
  return (
    <motion.div
      key={key}
      variants={variants}
      initial="enter"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.55, ease: EASE }}
      className="h-full"
    >
      {children}
    </motion.div>
  )
}

export function ExperienceController() {
  const [section, setSection] = useState(0)
  const [heroSeen, setHeroSeen] = useState(false)
  const [whyStartAtEnd, setWhyStartAtEnd] = useState(false)

  function toSection(n: number, fromEnd = false) {
    setWhyStartAtEnd(n === 1 && fromEnd)
    setSection(n)
  }

  return (
    <div className="h-full">
      <AnimatePresence mode="wait">
        {section === 0 &&
          wrap(
            'hero',
            <LandingHero
              onNext={() => {
                setHeroSeen(true)
                toSection(1)
              }}
              skipAnimation={heroSeen}
            />
          )}

        {section === 1 &&
          wrap(
            'why',
            <WhyLeadLogic
              onNext={() => toSection(2)}
              onBack={() => toSection(0)}
              startAtEnd={whyStartAtEnd}
            />
          )}

        {section === 2 &&
          wrap(
            'buildlog',
            <BuildLog onNext={() => toSection(3)} onBack={() => toSection(1, true)} />
          )}
      </AnimatePresence>
    </div>
  )
}
