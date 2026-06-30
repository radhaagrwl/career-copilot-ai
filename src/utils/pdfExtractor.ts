import * as pdfjsLib from 'pdfjs-dist'
import type { TextItem } from 'pdfjs-dist/types/src/display/api'

/**
 * Worker setup — pdf.js parses PDFs off the main thread.
 * Loaded from a CDN matching the installed pdfjs-dist version so we don't
 * have to manage a local worker file or Vite asset copy step.
 */
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`

export interface ExtractedPage {
  pageNumber: number
  text: string
}

export interface ExtractedResume {
  fullText: string
  pages: ExtractedPage[]
  pageCount: number
}

/**
 * Custom error type so callers (UI) can distinguish "this isn't a valid PDF"
 * from "the PDF is valid but has no extractable text" from generic failures.
 */
export class PdfExtractionError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message)
    this.name = 'PdfExtractionError'
  }
}

/**
 * Extracts all readable text from a PDF File, page by page.
 * Pure function: takes a File, returns structured text. No side effects,
 * no UI concerns — safe to reuse from anywhere (resume parsing, future
 * AI agents, tests, etc).
 */
export async function extractTextFromPdf(file: File): Promise<ExtractedResume> {
  let arrayBuffer: ArrayBuffer
  try {
    arrayBuffer = await file.arrayBuffer()
  } catch (err) {
    throw new PdfExtractionError('Could not read the file from disk.', err)
  }

  let pdf
  try {
    pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
  } catch (err) {
    throw new PdfExtractionError(
      'This file could not be opened as a PDF. It may be corrupted or password-protected.',
      err,
    )
  }

  const pages: ExtractedPage[] = []

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    try {
      const page = await pdf.getPage(pageNumber)
      const content = await page.getTextContent()

      const pageText = content.items
        .filter((item): item is TextItem => 'str' in item)
        .map((item) => item.str)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim()

      pages.push({ pageNumber, text: pageText })
    } catch (err) {
      // Don't let one bad page kill the whole extraction — record it as empty
      // and keep going, so a 10-page resume with one corrupt page still works.
      pages.push({ pageNumber, text: '' })
      console.warn(`Failed to extract text from page ${pageNumber}`, err)
    }
  }

  const fullText = pages.map((p) => p.text).join('\n\n').trim()

  if (!fullText) {
    throw new PdfExtractionError(
      'No readable text was found in this PDF. It may be a scanned image rather than a text-based document.',
    )
  }

  return { fullText, pages, pageCount: pdf.numPages }
}