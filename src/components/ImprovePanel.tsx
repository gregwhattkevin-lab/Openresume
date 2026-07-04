import type { CVData } from '../types/cv'
import { Icon } from './Icon'

interface ImprovePanelProps {
  cv: CVData
}

export function ImprovePanel({ cv }: ImprovePanelProps) {
  const checks = [
    { label: 'First and last name', ok: !!cv.personalInfo.firstName && !!cv.personalInfo.lastName },
    { label: 'Professional title', ok: !!cv.personalInfo.title },
    { label: 'Contact email', ok: !!cv.personalInfo.email },
    { label: 'Phone number', ok: !!cv.personalInfo.phone },
    { label: 'Location', ok: !!cv.personalInfo.location },
    { label: 'Professional summary', ok: !!cv.personalInfo.summary && cv.personalInfo.summary.length > 40 },
    { label: 'At least one work experience', ok: cv.experiences.length > 0 },
    { label: 'At least one education entry', ok: cv.education.length > 0 },
    { label: 'Skills listed', ok: cv.skills.length > 0 },
  ]

  const completed = checks.filter((c) => c.ok).length
  const total = checks.length

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 min-w-0">
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Improve</h1>
            <p className="text-slate-500">Quick tips to make your resume stronger.</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Resume readiness</h2>
              <span className="text-sm font-medium text-slate-500">
                {completed}/{total}
              </span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.round((completed / total) * 100)}%` }}
              />
            </div>
            <ul className="space-y-3">
              {checks.map((check) => (
                <li key={check.label} className="flex items-center gap-3 text-sm">
                  <Icon
                    name={check.ok ? 'checkCircle2' : 'circle'}
                    size={18}
                    className={check.ok ? 'text-emerald-500' : 'text-slate-300'}
                  />
                  <span className={check.ok ? 'text-slate-700' : 'text-slate-500'}>{check.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">Be specific</h3>
              <p className="text-sm text-blue-800/80">
                Use numbers and results when describing achievements. "Increased sales by 20%" beats "Responsible for sales".
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">Keep it concise</h3>
              <p className="text-sm text-blue-800/80">
                Recruiters scan resumes in seconds. Aim for one page if you have less than 10 years of experience.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">Tailor keywords</h3>
              <p className="text-sm text-blue-800/80">
                Mirror language from the job description to pass automated screening and show relevance.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">Proofread</h3>
              <p className="text-sm text-blue-800/80">
                Typos hurt credibility. Read aloud or ask a friend to review before sending.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
