'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { CubeIllustration } from '@/components/illustrations/CubeIllustration'
import { ShapesIllustration } from '@/components/illustrations/ShapesIllustration'
import { ConstellationIllustration } from '@/components/illustrations/ConstellationIllustration'
import { MorphIllustration } from '@/components/illustrations/MorphIllustration'
import { FlowIllustration } from '@/components/illustrations/FlowIllustration'
import { ZapIllustration } from '@/components/illustrations/ZapIllustration'
import { ChipIllustration } from '@/components/illustrations/ChipIllustration'
import { FlaskIllustration } from '@/components/illustrations/FlaskIllustration'
import { TrendIllustration } from '@/components/illustrations/TrendIllustration'
import { CompassIllustration } from '@/components/illustrations/CompassIllustration'
import { WarmIllustration } from '@/components/illustrations/WarmIllustration'
import { SparkIllustration } from '@/components/illustrations/SparkIllustration'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

type LineStyle = 'label' | 'heading' | 'body' | 'quote' | 'emphasis'

type Line = {
  text: string
  style: LineStyle
  Illustration?: React.ComponentType<{ className?: string }>
}

type Quality = {
  text: string
  Illustration?: React.ComponentType<{ className?: string }>
}

type Chapter = {
  label?: string
  lines?: Line[]
  qualities?: Quality[]
}

const CHAPTERS: Chapter[] = [
  // 0 — The moment
  {
    lines: [
      { text: '02 — Waarom LeadLogic', style: 'label' },
      { text: 'Toen ik jullie vacature zag...', style: 'heading' },
      { text: 'dacht ik niet:', style: 'body' },
      { text: '"Ik moet een motivatiebrief schrijven."', style: 'quote' },
      { text: 'Ik dacht:', style: 'body' },
      { text: '"Ik wil iets bouwen."', style: 'emphasis', Illustration: CubeIllustration },
    ],
  },
  // 1 — The drive
  {
    lines: [
      { text: 'Dat is hoe ik werk.', style: 'heading' },
      { text: 'Als een idee me enthousiast maakt...', style: 'body' },
      { text: 'wil ik het zo snel mogelijk tastbaar maken.', style: 'body' },
      { text: 'Niet volgende week. Niet volgende maand.', style: 'body' },
      { text: 'Vandaag.', style: 'emphasis' },
    ],
  },
  // 2 — Why LeadLogic
  {
    lines: [
      { text: 'Juist daarom sprak LeadLogic mij aan.', style: 'heading' },
      { text: 'Niet omdat jullie alleen met AI werken.', style: 'body' },
      { text: 'Maar omdat jullie mensen zoeken die bouwen.', style: 'body' },
    ],
  },
  // 3 — The qualities
  {
    label: 'Jullie zoeken mensen die:',
    qualities: [
      { text: 'Experimenteren.', Illustration: ShapesIllustration },
      { text: 'Nieuwsgierig zijn.', Illustration: ConstellationIllustration },
      { text: 'Feedback omzetten in verbetering.', Illustration: MorphIllustration },
      { text: 'En ideeën sneller werkelijkheid maken.', Illustration: FlowIllustration },
    ],
  },
  // 4 — Bridge
  {
    lines: [
      { text: 'Dat is waar ik enthousiast van word.', style: 'heading' },
      {
        text: 'Jullie grijpen de toekomst aan om werk te versnellen en om mensen te laten groeien',
        style: 'body',
      },
      { text: 'Daar wil ik onderdeel van uitmaken.', style: 'emphasis' },
    ],
  },
  // 5 — Why LeadLogic specifically
  {
    label: 'Waarom LeadLogic?',
    qualities: [
      {
        text: 'Omdat geen bedrijf mij zo snel iets heeft willen laten bouwen vanuit niks en in korte tijd.',
        Illustration: ZapIllustration,
      },
      {
        text: 'AI is bij jullie onderdeel van het werk, niet van de marketing. Jullie versnellen werkprocessen, niet de hype. Dat spreekt me aan.',
        Illustration: ChipIllustration,
      },
      {
        text: 'Experimenteren wordt beloond. En daar is ook de ruimte voor. Dat is hoe ik het liefst werk.',
        Illustration: FlaskIllustration,
      },
      {
        text: 'Groei geldt voor klanten én werknemers. Ontwikkeling is wat ik nu al doormaak met het ontwikkelen van deze experience. Dat wil ik blijven doen.',
        Illustration: TrendIllustration,
      },
      {
        text: 'Jullie durven voorop te lopen, maar daar niet arrogant over zijn. Gewoon nuchter blijven bouwen.',
        Illustration: CompassIllustration,
      },
      {
        text: 'Jullie feedback geven, handvatten aanbieden en gewoon eerlijk zijn. To the point, net als ik.',
        Illustration: WarmIllustration,
      },
      {
        text: 'Omdat ik denk dat ik in jullie omgeving het beste uit mezelf kan halen.',
        Illustration: SparkIllustration,
      },
    ],
  },
]

const LINE_STYLES: Record<LineStyle, string> = {
  label: 'font-mono text-xs text-accent tracking-[0.25em] uppercase',
  heading: 'text-3xl font-semibold tracking-tight text-foreground sm:text-4xl',
  body: 'text-lg text-muted',
  quote: 'text-lg italic text-white',
  emphasis: 'text-accent-gradient text-2xl font-semibold sm:text-3xl',
}

interface Props {
  onNext: () => void
  onBack: () => void
}

export function WhyLeadLogic({ onNext, onBack }: Props) {
  const [chapter, setChapter] = useState(0)
  const current = CHAPTERS[chapter]
  const isLast = chapter === CHAPTERS.length - 1
  const lineCount = current.lines?.length ?? current.qualities?.length ?? 0

  function handleNext() {
    if (isLast) onNext()
    else setChapter((c) => c + 1)
  }

  function handleBack() {
    if (chapter > 0) setChapter((c) => c - 1)
    else onBack()
  }

  return (
    <main className="relative z-10 flex h-full flex-col items-center justify-center px-6 py-24">
      <div className="w-full max-w-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={chapter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="space-y-5"
          >
            {/* Section label */}
            {current.label && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="text-accent font-mono text-xs tracking-[0.25em] uppercase"
              >
                {current.label}
              </motion.p>
            )}

            {/* Regular lines */}
            {current.lines?.map((line, i) => (
              <motion.div
                key={line.text}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.11 }}
                className={line.Illustration ? 'flex items-center gap-6' : ''}
              >
                <p className={LINE_STYLES[line.style]}>{line.text}</p>
                {line.Illustration && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.55, ease: EASE, delay: i * 0.11 + 0.15 }}
                    className="shrink-0"
                  >
                    <line.Illustration className="text-accent-light h-20 w-20" />
                  </motion.div>
                )}
              </motion.div>
            ))}

            {/* Qualities chapter */}
            {current.qualities && (
              <>
                {current.qualities.map((q, i) => (
                  <motion.div
                    key={q.text}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.13 }}
                    className="flex items-center gap-5"
                  >
                    <p className="text-foreground flex-1 text-lg font-medium">{q.text}</p>
                    {q.Illustration && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.45, ease: EASE, delay: 0.2 + i * 0.13 }}
                        className="shrink-0"
                      >
                        <q.Illustration className="text-accent h-14 w-14" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          key={`nav-${chapter}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: lineCount * 0.12 + 0.3 }}
          className="mt-10 flex items-center gap-4"
        >
          <button
            onClick={handleBack}
            className="group text-muted hover:text-foreground inline-flex cursor-pointer items-center gap-1.5 text-sm transition-colors duration-200 focus-visible:outline-none"
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            Terug
          </button>

          <button
            onClick={handleNext}
            className="group text-foreground hover:border-accent/40 hover:shadow-accent/10 focus-visible:ring-accent focus-visible:ring-offset-background inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {isLast ? 'Volgende' : 'Volgende'}
            <ArrowRight
              size={15}
              className="text-accent transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </button>
        </motion.div>
      </div>
    </main>
  )
}
