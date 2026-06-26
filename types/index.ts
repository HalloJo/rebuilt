export type TextVariant = 'label' | 'heading' | 'body' | 'emphasis'

export interface StoryLine {
  text: string
  variant: TextVariant
}

export type PreviewType = 'browser' | 'code' | 'terminal' | 'git' | 'vercel' | 'image'

export interface LogPreview {
  type: PreviewType
  src?: string // swap in a real screenshot path — shows <img> instead of the mock
  meta?: string // URL for browser, commit message for git, command for terminal, etc.
}

export interface LogEntry {
  id: string
  time: string
  title: string
  description?: string
  preview: LogPreview
}
