import { useCallback, useState } from 'react'
import { extractTextFromPdf, PdfExtractionError, type ExtractedResume } from '@/utils/pdfExtractor'

export type ExtractionStatus = 'idle' | 'extracting' | 'success' | 'error'

interface UseResumeExtractionReturn {
  status: ExtractionStatus
  result: ExtractedResume | null
  error: string | null
  extract: (file: File) => Promise<void>
  reset: () => void
}

/**
 * Owns the async state (idle / extracting / success / error) around PDF text
 * extraction. Profile.tsx calls `extract(file)` and reads the rest — it never
 * touches pdf.js directly. This is also the seam where an AI parsing step
 * will plug in next: it will consume `result.fullText` once extraction succeeds.
 */
export function useResumeExtraction(): UseResumeExtractionReturn {
  const [status, setStatus] = useState<ExtractionStatus>('idle')
  const [result, setResult] = useState<ExtractedResume | null>(null)
  const [error, setError] = useState<string | null>(null)

  const extract = useCallback(async (file: File) => {
    setStatus('extracting')
    setError(null)
    setResult(null)

    try {
      const extracted = await extractTextFromPdf(file)
      setResult(extracted)
      setStatus('success')
    } catch (err) {
      const message =
        err instanceof PdfExtractionError
          ? err.message
          : 'Something went wrong while reading this PDF. Please try again.'
      setError(message)
      setStatus('error')
    }
  }, [])

  const reset = useCallback(() => {
    setStatus('idle')
    setResult(null)
    setError(null)
  }, [])

  return { status, result, error, extract, reset }
}