import type { ParsedResume } from '@/types/resume'

export class ResumeParsingError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message)
    this.name = 'ResumeParsingError'
  }
}

const SYSTEM_PROMPT = `You are a resume parser. You will be given raw text extracted from a PDF resume.
Extract the following fields and return ONLY a single valid JSON object — no markdown fences, no preamble, no explanation.

Required JSON shape:
{
  "name": string,
  "email": string | null,
  "phone": string | null,
  "linkedin": string | null,
  "github": string | null,
  "skills": string[],
  "experience": [{ "title": string, "company": string, "duration": string, "description": string }],
  "education": [{ "degree": string, "institution": string, "year": string }],
  "projects": [{ "name": string, "description": string, "technologies": string[] }],
  "certifications": string[]
}

Rules:
- If a field cannot be found in the text, use null for single values or an empty array for lists.
- "skills" should be a flat deduplicated list of individual skills, not categories.
- "duration" and "year" should be copied as written in the resume (e.g. "Jan 2021 - Present", "2019").
- Do not invent information that is not present in the text.
- Return raw JSON only — your entire response must be parseable with JSON.parse().`

function extractJsonFromResponse(raw: string): string {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
  if (fenced) return fenced[1].trim()

  const firstBrace = raw.indexOf('{')
  const lastBrace = raw.lastIndexOf('}')
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    return raw.slice(firstBrace, lastBrace + 1)
  }

  return raw.trim()
}

function isValidParsedResume(value: unknown): value is ParsedResume {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  return (
    typeof v.name === 'string' &&
    Array.isArray(v.skills) &&
    Array.isArray(v.experience) &&
    Array.isArray(v.education) &&
    Array.isArray(v.projects) &&
    Array.isArray(v.certifications)
  )
}

/**
 * NOTE: Calling the Anthropic API directly from the browser exposes your API
 * key in client-side network requests. This is fine for local development
 * and testing, but before shipping to real users this call should move to a
 * Supabase Edge Function so the key stays server-side.
 */
export async function parseResumeWithAI(resumeText: string): Promise<ParsedResume> {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY

  if (!apiKey) {
    throw new ResumeParsingError(
      'AI parsing is not configured. Add VITE_ANTHROPIC_API_KEY to your .env.local file.',
    )
  }

  let response: Response
  try {
    response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 2048,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: resumeText }],
      }),
    })
  } catch (err) {
    throw new ResumeParsingError('Could not reach the AI service. Check your connection.', err)
  }

  if (!response.ok) {
    const body = await response.text().catch(() => '')
    throw new ResumeParsingError(
      `AI service returned an error (${response.status}). ${body.slice(0, 200)}`,
    )
  }

  const data = await response.json()
  const rawText: string | undefined = data?.content?.[0]?.text

  if (!rawText) {
    throw new ResumeParsingError('The AI returned an empty response.')
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(extractJsonFromResponse(rawText))
  } catch (err) {
    throw new ResumeParsingError('The AI response could not be parsed as JSON.', err)
  }

  if (!isValidParsedResume(parsed)) {
    throw new ResumeParsingError('The AI response was missing required fields.')
  }

  return parsed
}