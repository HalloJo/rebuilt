'use client'

import { useEffect, useState } from 'react'

const BORN_AT = new Date('2026-06-25T20:13:29+02:00')

function formatUptime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  if (days > 0) {
    return `${days}d ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export function Nav() {
  const [uptime, setUptime] = useState('')

  useEffect(() => {
    const tick = () => setUptime(formatUptime(Date.now() - BORN_AT.getTime()))
    const init = setTimeout(tick, 0)
    const id = setInterval(tick, 1000)
    return () => {
      clearTimeout(init)
      clearInterval(id)
    }
  }, [])

  return (
    <header className="bg-background/80 fixed top-0 right-0 left-0 z-50 border-b border-white/6 backdrop-blur-xl">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-6 px-6 md:grid md:grid-cols-3 md:justify-normal md:gap-0">
        {/* Left — hidden on mobile */}
        <span className="text-muted hidden font-mono text-xs tracking-[0.15em] uppercase md:block">
          Built by Jorik van Ruiswijk
        </span>

        {/* Centre — J mark */}
        <div className="border-accent/30 text-accent flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-bold md:mx-auto">
          J
        </div>

        {/* Right — live timer */}
        <div className="flex items-center gap-2 md:justify-end">
          <span className="relative flex size-1.5">
            <span className="bg-accent absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" />
            <span className="bg-accent relative inline-flex size-1.5 rounded-full" />
          </span>
          <span className="text-muted font-mono text-xs tabular-nums">Live since {uptime}</span>
        </div>
      </nav>
    </header>
  )
}
