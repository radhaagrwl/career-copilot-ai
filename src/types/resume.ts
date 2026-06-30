export interface ResumeExperience {
  title: string
  company: string
  duration: string
  description: string
}

export interface ResumeEducation {
  degree: string
  institution: string
  year: string
}

export interface ResumeProject {
  name: string
  description: string
  technologies: string[]
}

export interface ParsedResume {
  name: string
  email: string | null
  phone: string | null
  linkedin: string | null
  github: string | null
  skills: string[]
  experience: ResumeExperience[]
  education: ResumeEducation[]
  projects: ResumeProject[]
  certifications: string[]
}