import { useState, useRef, useCallback, useEffect } from 'react'
import { useResumeExtraction } from '@/hooks/useResumeExtraction'
import { useResumeParsing } from '@/hooks/useResumeParsing'

type DragState = 'idle' | 'over' | 'done'

const Profile = () => {
  const [dragState, setDragState] = useState<DragState>('idle')
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { status: extractStatus, result: extractResult, error: extractError, extract, reset: resetExtraction } = useResumeExtraction()
  const { status: parseStatus, result: parseResult, error: parseError, parse, reset: resetParsing } = useResumeParsing()

  useEffect(() => {
    if (extractStatus === 'success' && extractResult) {
      parse(extractResult.fullText)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extractStatus, extractResult])

  const accept = (f: File) => {
    const allowed = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]
    if (allowed.includes(f.type)) {
      setFile(f)
      setDragState('done')

      if (f.type === 'application/pdf') {
        extract(f)
      } else {
        resetExtraction()
        resetParsing()
      }
    }
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragState('idle')
    const f = e.dataTransfer.files[0]
    if (f) accept(f)
  }, [])

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragState('over')
  }

  const onDragLeave = () => setDragState('idle')

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) accept(f)
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const formatType = (mimeType: string) => {
    if (mimeType === 'application/pdf') return 'PDF'
    if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') return 'DOCX'
    return mimeType
  }

  const dropZoneClass = [
    'relative flex flex-col items-center justify-center gap-4 rounded-xl',
    'border-2 border-dashed px-8 py-14 cursor-pointer transition-all select-none',
    dragState === 'over'
      ? 'border-indigo-400 bg-indigo-50'
      : file
      ? 'border-emerald-300 bg-emerald-50'
      : 'border-gray-200 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-50',
  ].join(' ')

  return (
    <div className="min-h-full bg-gray-50">

      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">My Profile</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Upload your resume to power AI-personalised outreach and job matching
          </p>
        </div>
        {file && (
          <button
            onClick={() => { setFile(null); setDragState('idle'); resetExtraction(); resetParsing() }}
            className="text-xs font-medium text-gray-500 hover:text-red-600 transition-colors border border-gray-200 px-3 py-1.5 rounded-lg"
          >
            Remove resume
          </button>
        )}
      </div>

      <div className="px-8 py-8 max-w-3xl mx-auto space-y-5">

        {/* Success message */}
        {file && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-center gap-2.5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-emerald-600 shrink-0">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <p className="text-sm font-medium text-emerald-700">Resume uploaded successfully.</p>
          </div>
        )}

        {/* Resume upload card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Resume</h2>
              <p className="text-xs text-gray-400 mt-0.5">PDF or DOCX only</p>
            </div>
            {file && (
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Uploaded
              </span>
            )}
          </div>

          {/* Drop zone */}
          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onClick={() => inputRef.current?.click()}
            className={dropZoneClass}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.docx"
              className="sr-only"
              onChange={onPick}
            />

            {file ? (
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-7 h-7 text-emerald-600">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <polyline points="9 15 11 17 15 13" />
                </svg>
              </div>
            ) : (
              <div className={[
                'w-14 h-14 rounded-2xl flex items-center justify-center transition-colors',
                dragState === 'over' ? 'bg-indigo-100' : 'bg-gray-100',
              ].join(' ')}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className={[
                    'w-7 h-7 transition-colors',
                    dragState === 'over' ? 'text-indigo-600' : 'text-gray-400',
                  ].join(' ')}
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
            )}

            {file ? (
              <div className="text-center">
                <p className="text-sm font-semibold text-emerald-700">{file.name}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {formatType(file.type)} · {formatSize(file.size)}
                </p>
                <p className="text-xs text-gray-400 mt-3">Click or drop a file to replace</p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-700">
                  {dragState === 'over' ? 'Drop to upload' : 'Drag and drop your resume here'}
                </p>
                <p className="text-xs text-gray-400 mt-1">or click to browse from your computer</p>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <span className="text-xs font-medium text-gray-400 border border-gray-200 bg-white rounded-md px-2 py-0.5">
                    PDF
                  </span>
                  <span className="text-xs font-medium text-gray-400 border border-gray-200 bg-white rounded-md px-2 py-0.5">
                    DOCX
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* File details */}
          {file && (
            <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 divide-y divide-gray-200">
              <div className="flex items-center justify-between px-4 py-2.5">
                <span className="text-xs text-gray-400">File name</span>
                <span className="text-xs font-medium text-gray-700 truncate max-w-[60%]">{file.name}</span>
              </div>
              <div className="flex items-center justify-between px-4 py-2.5">
                <span className="text-xs text-gray-400">File size</span>
                <span className="text-xs font-medium text-gray-700">{formatSize(file.size)}</span>
              </div>
              <div className="flex items-center justify-between px-4 py-2.5">
                <span className="text-xs text-gray-400">File type</span>
                <span className="text-xs font-medium text-gray-700">{formatType(file.type)}</span>
              </div>
              {file.type === 'application/pdf' && (
                <div className="flex items-center justify-between px-4 py-2.5">
                  <span className="text-xs text-gray-400">Text extraction</span>
                  {extractStatus === 'extracting' && (
                    <span className="text-xs font-medium text-indigo-600 flex items-center gap-1.5">
                      <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                        <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      Extracting…
                    </span>
                  )}
                  {extractStatus === 'success' && extractResult && (
                    <span className="text-xs font-medium text-emerald-600">
                      {extractResult.pageCount} page{extractResult.pageCount === 1 ? '' : 's'} read
                    </span>
                  )}
                  {extractStatus === 'error' && (
                    <span className="text-xs font-medium text-red-600">Failed</span>
                  )}
                </div>
              )}
              {file.type !== 'application/pdf' && (
                <div className="flex items-center justify-between px-4 py-2.5">
                  <span className="text-xs text-gray-400">Text extraction</span>
                  <span className="text-xs font-medium text-gray-400">DOCX not yet supported</span>
                </div>
              )}
            </div>
          )}

          {/* Extraction error */}
          {extractStatus === 'error' && extractError && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 flex items-start gap-2.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-red-500 shrink-0 mt-0.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <div>
                <p className="text-sm font-medium text-red-700">Couldn't extract text</p>
                <p className="text-xs text-red-500 mt-0.5">{extractError}</p>
              </div>
            </div>
          )}

          {/* CTA */}
          {file ? (
            <button
              onClick={() => inputRef.current?.click()}
              className="mt-4 w-full py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-medium transition-colors"
            >
              Replace Resume
            </button>
          ) : (
            <button
              onClick={() => inputRef.current?.click()}
              className="mt-4 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors shadow-sm"
            >
              Upload Resume
            </button>
          )}
        </div>

        {/* Extracted Text */}
        {(extractStatus === 'extracting' || extractStatus === 'success') && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-semibold text-gray-900">Extracted Text</h2>
              {extractStatus === 'success' && extractResult && (
                <span className="text-xs text-gray-400">
                  {extractResult.fullText.length.toLocaleString()} characters · {extractResult.pageCount} page{extractResult.pageCount === 1 ? '' : 's'}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-0.5 mb-4">
              Raw text read directly from the PDF.
            </p>

            {extractStatus === 'extracting' && (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <svg className="w-6 h-6 animate-spin text-indigo-500" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                  <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                <p className="text-sm text-gray-500">Reading your resume…</p>
              </div>
            )}

            {extractStatus === 'success' && extractResult && (
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 max-h-96 overflow-y-auto">
                <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">
                  {extractResult.fullText}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* AI parsing status */}
        {parseStatus === 'parsing' && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-3 flex items-center gap-2.5">
            <svg className="w-4 h-4 animate-spin text-indigo-600 shrink-0" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" className="opacity-25" />
              <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <p className="text-sm font-medium text-indigo-700">Analysing your resume with AI…</p>
          </div>
        )}

        {parseStatus === 'error' && parseError && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-2.5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-red-500 shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <div>
              <p className="text-sm font-medium text-red-700">Couldn't parse resume with AI</p>
              <p className="text-xs text-red-500 mt-0.5">{parseError}</p>
            </div>
          </div>
        )}

        {/* Contact Info */}
        {parseStatus === 'success' && parseResult && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Contact Info</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                <p className="text-xs text-gray-400">Name</p>
                <p className="text-sm font-medium text-gray-900 mt-0.5">{parseResult.name}</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                <p className="text-xs text-gray-400">Email</p>
                <p className="text-sm font-medium text-gray-900 mt-0.5">{parseResult.email ?? 'Not found'}</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                <p className="text-xs text-gray-400">Phone</p>
                <p className="text-sm font-medium text-gray-900 mt-0.5">{parseResult.phone ?? 'Not found'}</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                <p className="text-xs text-gray-400">LinkedIn</p>
                <p className="text-sm font-medium text-gray-900 mt-0.5 truncate">{parseResult.linkedin ?? 'Not found'}</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 sm:col-span-2">
                <p className="text-xs text-gray-400">GitHub</p>
                <p className="text-sm font-medium text-gray-900 mt-0.5 truncate">{parseResult.github ?? 'Not found'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Skills */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Skills</h2>

          {parseStatus === 'success' && parseResult && parseResult.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {parseResult.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6 text-gray-400">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M2 12h2m16 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">No skills yet</p>
                <p className="text-xs text-gray-400 mt-1">Upload your resume to extract skills.</p>
              </div>
            </div>
          )}
        </div>

        {/* Experience */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Experience</h2>

          {parseStatus === 'success' && parseResult && parseResult.experience.length > 0 ? (
            <div className="space-y-4">
              {parseResult.experience.map((exp, i) => (
                <div key={i} className="rounded-xl border border-gray-200 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{exp.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-400 shrink-0 whitespace-nowrap">{exp.duration}</span>
                  </div>
                  {exp.description && (
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6 text-gray-400">
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">No experience added</p>
                <p className="text-xs text-gray-400 mt-1">Upload your resume to extract work history.</p>
              </div>
            </div>
          )}
        </div>

        {/* Education */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Education</h2>

          {parseStatus === 'success' && parseResult && parseResult.education.length > 0 ? (
            <div className="space-y-3">
              {parseResult.education.map((edu, i) => (
                <div key={i} className="flex items-start justify-between gap-3 rounded-xl border border-gray-200 p-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{edu.degree}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{edu.institution}</p>
                  </div>
                  <span className="text-xs text-gray-400 shrink-0 whitespace-nowrap">{edu.year}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6 text-gray-400">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">No education added</p>
                <p className="text-xs text-gray-400 mt-1">Upload your resume to extract education details.</p>
              </div>
            </div>
          )}
        </div>

        {/* Projects */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Projects</h2>

          {parseStatus === 'success' && parseResult && parseResult.projects.length > 0 ? (
            <div className="space-y-4">
              {parseResult.projects.map((proj, i) => (
                <div key={i} className="rounded-xl border border-gray-200 p-4">
                  <p className="text-sm font-semibold text-gray-900">{proj.name}</p>
                  {proj.description && (
                    <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{proj.description}</p>
                  )}
                  {proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {proj.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6 text-gray-400">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">No projects added</p>
                <p className="text-xs text-gray-400 mt-1">Upload your resume to extract projects.</p>
              </div>
            </div>
          )}
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Certifications</h2>

          {parseStatus === 'success' && parseResult && parseResult.certifications.length > 0 ? (
            <ul className="space-y-2">
              {parseResult.certifications.map((cert, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm text-gray-700">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-emerald-500 shrink-0">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {cert}
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6 text-gray-400">
                  <circle cx="12" cy="8" r="6" />
                  <path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">No certifications added</p>
                <p className="text-xs text-gray-400 mt-1">Upload your resume to extract certifications.</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Profile