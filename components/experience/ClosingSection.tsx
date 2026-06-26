'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Mail, ExternalLink, GitBranch } from 'lucide-react'
import Image from 'next/image'
import { SparkIllustration } from '@/components/illustrations/SparkIllustration'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: EASE, delay },
  }
}

// Drop your photo at public/images/avatar.jpg to show it here.
// Leave src undefined to show the J monogram fallback.
const AVATAR_SRC = '/images/avatar.jpg'

const CONTACT = [
  { icon: Mail, label: 'jorikvanruiswijk@gmail.com', href: 'mailto:jorikvanruiswijk@gmail.com' },
  // Update this URL to your own LinkedIn profile:
  { icon: ExternalLink, label: 'LinkedIn', href: 'https://linkedin.com/in/jorikvanruiswijk' },
  { icon: GitBranch, label: 'HalloJo', href: 'https://github.com/HalloJo' },
]

function Avatar() {
  return (
    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/10">
      <Image src={AVATAR_SRC} alt="Jorik van Ruiswijk" fill className="object-cover" />
    </div>
  )
}

interface Props {
  onBack: () => void
}

export function ClosingSection({ onBack }: Props) {
  return (
    <main className="relative z-10 flex h-full flex-col items-center justify-center px-6 py-24">
      {/* Background decoration */}
      <SparkIllustration className="text-accent pointer-events-none absolute top-1/2 right-16 h-48 w-48 -translate-y-1/2 opacity-[0.04]" />

      <div className="w-full max-w-xl">
        {/* Label */}
        <motion.p
          {...fadeUp(0)}
          className="text-accent font-mono text-xs tracking-[0.25em] uppercase"
        >
          04 — Tot slot
        </motion.p>

        {/* Body */}
        <motion.p {...fadeUp(0.2)} className="text-muted mt-7 text-lg leading-relaxed">
          Wat de uitkomst ook is, bedankt voor de tijd, de eerlijke feedback en de tweede kans om
          mijn motivatie op een andere manier over te brengen.
        </motion.p>

        <motion.p {...fadeUp(0.38)} className="text-muted mt-5 text-lg leading-relaxed">
          Ik hoop dat deze experience heeft laten zien wie ik ben, hoe ik denk en hoe ik werk.
        </motion.p>

        {/* Big closing line — the payoff */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.62 }}
          className="mt-10"
        >
          <motion.p
            animate={{ opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
            className="text-accent-gradient text-5xl font-bold tracking-tight sm:text-6xl"
          >
            Hopelijk tot snel!
          </motion.p>
        </motion.div>

        {/* Signature row — avatar + name */}
        <motion.div {...fadeUp(0.9)} className="mt-8 flex items-center gap-3">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: EASE, delay: 1.1 }}
            className="h-px w-8 origin-left bg-white/20"
          />
          <Avatar />
          <span className="text-muted text-sm">Jorik van Ruiswijk</span>
        </motion.div>

        {/* Contact links */}
        <motion.div {...fadeUp(1.0)} className="mt-5 flex flex-wrap items-center gap-5">
          {CONTACT.map(({ icon: Icon, label, href }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group text-muted/60 hover:text-foreground inline-flex items-center gap-1.5 text-xs transition-colors duration-150"
            >
              <Icon
                size={12}
                className="text-muted/40 group-hover:text-accent transition-colors duration-150"
              />
              {label}
            </a>
          ))}
        </motion.div>

        {/* Back nav */}
        <motion.div {...fadeUp(1.15)} className="mt-10">
          <button
            onClick={onBack}
            className="group text-muted hover:text-foreground inline-flex cursor-pointer items-center gap-1.5 text-sm transition-colors duration-200 focus-visible:outline-none"
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            Terug
          </button>
        </motion.div>
      </div>
    </main>
  )
}
