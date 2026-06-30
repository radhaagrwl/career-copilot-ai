import { useCallback, useState } from 'react'
import { parseResumeWithAI, ResumeParsingError } from '@/services/resumeParser.service'
import type { ParsedResume } from '@/types/resume'

export type ParsingStatus = 'idle' | 'parsing' | 'success' | 'error'

interface UseResumeParsingReturn {
  status: ParsingStatus
  result: ParsedResume | null
  error: string | null
  parse: (resumeText: string) => Promise<void>
  reset: () => void
}

export function useResumeParsing(): UseResumeParsingReturn {
  const [status, setStatus] = useState<ParsingStatus>('idle')
  const [result, setResult] = useState<ParsedResume | null>(null)
  const [error, setError] = useState<string | null>(null)

  const parse = useCallback(async (resumeText: string) => {
    setStatus('parsing')
    setError(null)
    setResult(null)

    try {
      const parsed = await parseResumeWithAI(resumeText)
      setResult(parsed)
      setStatus('success')
    } catch (err) {
      const message =
        err instanceof ResumeParsingError
          ? err.message
          : 'Something went wrong while parsing your resume. Please try again.'
      setError(message)
      setStatus('error')
    }
  }, [])

  const reset = useCallback(() => {
    setStatus('idle')
    setResult(null)
    setError(null)
  }, [])

  return { status, result, error, parse, reset }
}