'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { LOG_ENTRIES } from '@/data/buildlog'
import type { LogEntry, LogPreview } from '@/types'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

interface Props {
  onNext: () => void
  onBack: () => void
}

// ─── Preview mock UIs ────────────────────────────────────────────────────────

function TrafficLights() {
  return (
    <div className="flex gap-1.5">
      <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
      <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
      <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
    </div>
  )
}

function BrowserPreview({ preview }: { preview: LogPreview }) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/[0.08] bg-black/30">
      <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
        <TrafficLights />
        <div className="flex-1 rounded-md bg-white/[0.04] px-3 py-1 text-center">
          <span className="text-muted/70 font-mono text-xs">
            {preview.meta ?? 'localhost:3000'}
          </span>
        </div>
      </div>
      {preview.src ? (
        <img src={preview.src} alt="" className="w-full object-cover" />
      ) : (
        <div className="flex h-44 flex-col items-center justify-center gap-2">
          <div className="h-1 w-16 rounded-full bg-white/[0.06]" />
          <div className="h-1 w-24 rounded-full bg-white/[0.04]" />
          <div className="mt-3 font-mono text-[10px] text-white/15">screenshot volgt</div>
        </div>
      )}
    </div>
  )
}

function TerminalPreview({ preview }: { preview: LogPreview }) {
  const cmd = preview.meta ?? 'npx create-next-app@latest'
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#0d0d0d]">
      <div className="flex items-center gap-3 border-b border-white/[0.06] px-3 py-2.5">
        <TrafficLights />
        <span className="text-muted/50 font-mono text-xs">zsh</span>
      </div>
      <div className="space-y-1.5 p-4 font-mono text-xs">
        <div>
          <span className="text-accent">~</span>
          <span className="text-white/50"> $ </span>
          <span className="text-white/70">{cmd}</span>
        </div>
        <div className="text-white/30">
          ✓ Would you like to use TypeScript? <span className="text-white/50">Yes</span>
        </div>
        <div className="text-white/30">
          ✓ Would you like to use Tailwind CSS? <span className="text-white/50">Yes</span>
        </div>
        <div className="text-white/30">
          ✓ Would you like to use App Router? <span className="text-white/50">Yes</span>
        </div>
        <div className="mt-2 text-white/20">Creating a new Next.js app in ./rebuilt</div>
        <div className="text-white/20">Installing dependencies...</div>
        <div className="mt-1 text-green-400/60">✓ Done in 4.2s</div>
      </div>
    </div>
  )
}

function CodePreview({ preview }: { preview: LogPreview }) {
  const filename = preview.meta ?? 'index.tsx'
  const lines = [
    { n: 1, t: "'use client'", c: 'text-white/30' },
    { n: 2, t: '', c: '' },
    { n: 3, t: "import { useState } from 'react'", c: 'text-white/35' },
    { n: 4, t: "import { motion } from 'framer-motion'", c: 'text-white/35' },
    { n: 5, t: '', c: '' },
    { n: 6, t: 'export function ExperienceController() {', c: 'text-white/40' },
    { n: 7, t: '  const [section, setSection] = useState(0)', c: 'text-white/35' },
    { n: 8, t: '', c: '' },
    { n: 9, t: '  return (', c: 'text-white/40' },
    { n: 10, t: '    <AnimatePresence mode="wait">', c: 'text-white/30' },
  ]
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#0c0c0e]">
      <div className="flex items-center gap-3 border-b border-white/[0.06] px-3 py-2.5">
        <TrafficLights />
        <div className="rounded bg-white/[0.06] px-2.5 py-0.5">
          <span className="text-muted/70 font-mono text-[10px]">{filename}</span>
        </div>
      </div>
      <div className="p-4">
        {lines.map((l) => (
          <div key={l.n} className="flex gap-4 font-mono text-xs leading-5">
            <span className="w-4 shrink-0 text-right text-white/15 select-none">{l.n}</span>
            <span className={l.c || 'text-transparent'}>{l.t || '​'}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function GitPreview({ preview }: { preview: LogPreview }) {
  const message = preview.meta ?? 'feat: initial commit'
  return (
    <div className="w-full space-y-3">
      <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-muted/60 font-mono text-[10px]">HalloJo/rebuilt</span>
          <span className="font-mono text-[10px] text-white/25">main</span>
        </div>
        <p className="text-foreground/80 mb-3 text-sm font-medium">{message}</p>
        <div className="text-muted/50 font-mono text-[11px]">
          <span className="text-white/30">commit </span>
          <span className="text-accent/60">4d758e5</span>
        </div>
        <div className="mt-3 space-y-1 border-t border-white/[0.06] pt-3 font-mono text-xs">
          <div>
            <span className="text-green-400/60">+</span>
            <span className="text-white/30"> app/page.tsx</span>
          </div>
          <div>
            <span className="text-green-400/60">+</span>
            <span className="text-white/30"> components/experience/LandingHero.tsx</span>
          </div>
          <div>
            <span className="text-green-400/60">+</span>
            <span className="text-white/30"> components/layout/Nav.tsx</span>
          </div>
          <div className="text-white/20"> +12 more files</div>
        </div>
      </div>
    </div>
  )
}

function VercelPreview({ preview }: { preview: LogPreview }) {
  const url = preview.meta ?? 'rebuilt.vercel.app'
  return (
    <div className="w-full space-y-3">
      <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-muted/70 font-mono text-xs">rebuilt</span>
          <span className="rounded-full bg-green-400/10 px-2.5 py-0.5 text-xs font-medium text-green-400">
            ● Ready
          </span>
        </div>
        <div className="space-y-2">
          <div>
            <p className="text-[10px] tracking-widest text-white/20 uppercase">Deployment URL</p>
            <p className="text-foreground/70 mt-0.5 font-mono text-sm">{url}</p>
          </div>
          <div>
            <p className="text-[10px] tracking-widest text-white/20 uppercase">Branch</p>
            <p className="text-foreground/50 mt-0.5 font-mono text-sm">main</p>
          </div>
          <div>
            <p className="text-[10px] tracking-widest text-white/20 uppercase">Duration</p>
            <p className="text-foreground/50 mt-0.5 font-mono text-sm">38s</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function PreviewContent({ entry }: { entry: LogEntry }) {
  const { preview } = entry
  if (preview.src) {
    return (
      <img
        src={preview.src}
        alt={entry.title}
        className="max-h-full w-full rounded-xl object-cover"
      />
    )
  }
  switch (preview.type) {
    case 'browser':
      return <BrowserPreview preview={preview} />
    case 'terminal':
      return <TerminalPreview preview={preview} />
    case 'code':
      return <CodePreview preview={preview} />
    case 'git':
      return <GitPreview preview={preview} />
    case 'vercel':
      return <VercelPreview preview={preview} />
    default:
      return (
        <div className="flex h-full items-center justify-center">
          <span className="font-mono text-xs text-white/20">screenshot volgt</span>
        </div>
      )
  }
}

// ─── Log item ─────────────────────────────────────────────────────────────────

function LogItem({
  entry,
  isActive,
  index,
  onClick,
}: {
  entry: LogEntry
  isActive: boolean
  index: number
  onClick: () => void
}) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: EASE, delay: 0.12 + index * 0.045 }}
      onClick={onClick}
      className="group relative w-full rounded-xl px-4 py-3 text-left focus-visible:outline-none"
    >
      {isActive && (
        <motion.div
          layoutId="log-active-bg"
          className="absolute inset-0 rounded-xl border border-white/[0.07] bg-white/[0.05]"
          transition={{ duration: 0.22, ease: 'easeOut' }}
        />
      )}
      <div className="relative flex items-start gap-3">
        {/* Active dot indicator */}
        <motion.div
          animate={{
            backgroundColor: isActive ? '#ff6b2b' : 'rgba(255,255,255,0.18)',
            scale: isActive ? 1.15 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
        />
        <div className="min-w-0 flex-1">
          <span className="text-muted/60 font-mono text-[11px] tabular-nums">{entry.time}</span>
          <p
            className={`mt-0.5 truncate text-sm font-medium transition-colors duration-150 ${
              isActive ? 'text-foreground' : 'text-foreground/55 group-hover:text-foreground/80'
            }`}
          >
            {entry.title}
          </p>
          {entry.description && (
            <p className="text-muted/50 mt-0.5 truncate text-xs">{entry.description}</p>
          )}
        </div>
      </div>
    </motion.button>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

export function BuildLog({ onNext, onBack }: Props) {
  const [activeId, setActiveId] = useState(LOG_ENTRIES[0].id)
  const activeIndex = LOG_ENTRIES.findIndex((e) => e.id === activeId)
  const active = LOG_ENTRIES[activeIndex]

  const navigate = useCallback(
    (dir: 1 | -1) => {
      const next = activeIndex + dir
      if (next >= 0 && next < LOG_ENTRIES.length) {
        setActiveId(LOG_ENTRIES[next].id)
      }
    },
    [activeIndex]
  )

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        navigate(-1)
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        navigate(1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  return (
    <main className="relative z-10 flex h-full flex-col px-6 py-14 md:px-12">
      {/* Label */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="text-accent font-mono text-xs tracking-[0.25em] uppercase"
      >
        03 — Build Log
      </motion.p>

      {/* Two-panel layout */}
      <div className="mt-5 flex flex-1 flex-col gap-4 overflow-hidden md:flex-row md:gap-6">
        {/* Left: log list */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.1 }}
          className="overflow-y-auto md:w-[35%]"
        >
          <div className="flex flex-col gap-0.5 pb-2">
            {LOG_ENTRIES.map((entry, i) => (
              <LogItem
                key={entry.id}
                entry={entry}
                isActive={entry.id === activeId}
                index={i}
                onClick={() => setActiveId(entry.id)}
              />
            ))}
          </div>
        </motion.div>

        {/* Right: preview panel */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.18 }}
          className="glass-card flex min-h-[220px] flex-1 flex-col overflow-hidden rounded-2xl md:min-h-0"
        >
          {/* Panel header */}
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
            <AnimatePresence mode="wait">
              <motion.span
                key={activeId + '-time'}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="text-muted/70 font-mono text-xs tabular-nums"
              >
                {active.time} — {active.title}
              </motion.span>
            </AnimatePresence>
            <span className="font-mono text-xs text-white/20 tabular-nums">
              {activeIndex + 1} / {LOG_ENTRIES.length}
            </span>
          </div>

          {/* Preview content */}
          <div className="relative flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.008 }}
                transition={{ duration: 0.3, ease: EASE }}
                className={`absolute inset-0 flex items-center justify-center ${active.preview.src ? 'p-3' : 'p-6'}`}
              >
                {active.preview.src ? (
                  <div className="relative h-full w-full overflow-hidden rounded-xl">
                    <Image
                      src={active.preview.src}
                      alt={active.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full max-w-md">
                    <PreviewContent entry={active} />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="mt-5 flex items-center gap-4"
      >
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
        <button
          onClick={onNext}
          className="group focus-visible:ring-accent focus-visible:ring-offset-background text-foreground hover:border-accent/40 hover:shadow-accent/10 inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Volgende
          <ArrowRight
            size={15}
            className="text-accent transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </button>
      </motion.div>
    </main>
  )
}
