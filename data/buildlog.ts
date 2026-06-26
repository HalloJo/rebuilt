import type { LogEntry } from '@/types'

export const LOG_ENTRIES: LogEntry[] = [
  {
    id: 'found',
    time: '18-06 | 22:12',
    title: 'LeadLogic vacature tegengekomen',
    description: 'Vibe Coder / Full Stack AI Developer — leadlogic.nl',
    preview: {
      type: 'browser',
      src: '/screenshots/leadlogic.png',
      meta: 'leadlogic.nl/vacatures/full-stack-ai-developer',
    },
  },
  {
    id: 'cursor',
    time: '19-06 | 09:18',
    title: 'Claude Code geinstalleerd',
    description: 'Nieuw Vite project aangemaakt',
    preview: {
      type: 'terminal',
      src: '/screenshots/claude.png',
      meta: 'npx create-next-app@latest rebuilt --typescript',
    },
  },
  {
    id: 'idea',
    time: '19-06 | 09:55',
    title: 'Portfolio opgezet',
    description: 'joriks-vibe.vercel.app',
    preview: { type: 'code', src: '/screenshots/jorik.png', meta: 'ExperienceController.tsx' },
  },
  {
    id: 'proto1',
    time: '19-06 | 10:41',
    title: 'Product #1 - Palet',
    description: 'palet-sigma.vercel.app',
    preview: { type: 'browser', src: '/screenshots/palet.png', meta: 'localhost:3000' },
  },
  {
    id: 'proto2',
    time: '19-06 | 11:24',
    title: 'Product #2 - Covrd',
    description: 'covrd-chi.vercel.app',
    preview: { type: 'browser', src: '/screenshots/covrd.png', meta: 'localhost:3000' },
  },
  {
    id: 'proto3',
    time: '19-06 | 13:08',
    title: 'Product #3 Torched',
    description: 'torched-ashy.vercel.app',
    preview: { type: 'browser', src: '/screenshots/torched.png', meta: 'localhost:3000' },
  },
  {
    id: 'commit',
    time: '19-06 | 21:41',
    title: 'Gepusht naar GitHub',
    description: 'Alles op portfolio updaten',
    preview: {
      type: 'git',
      src: '/screenshots/github.png',
      meta: 'feat: initial cinematic landing experience',
    },
  },
  {
    id: 'deployed',
    time: '19-06 | 15:34',
    title: 'Sollicitatie verstuurd 🎉',
    description: 'Live op Vercel — joriks-vibe.vercel.app',
    preview: { type: 'vercel', meta: 'joriks-vibe.vercel.app' },
  },
  {
    id: 'rebuilt',
    time: '26-06 | 15:34',
    title: 'Rebuilt gemaakt en deployed',
    description: 'Live op Vercel — rebuilt.vercel.app',
    preview: { type: 'vercel', meta: 'rebuilt-vibe.vercel.app' },
  },
]
