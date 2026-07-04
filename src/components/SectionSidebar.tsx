import { Icon } from './Icon'
import type { SectionDef } from '../types/cv'

interface SectionSidebarProps {
  sections: SectionDef[]
  activeSection: string
  onSelect: (key: string) => void
  onAddSection: () => void
  sectionOrder: string[]
}

export function SectionSidebar({ sections, activeSection, onSelect, onAddSection, sectionOrder }: SectionSidebarProps) {
  const visibleSections = sectionOrder
    .map((key) => sections.find((s) => s.key === key))
    .filter(Boolean) as SectionDef[]

  const activeIndex = visibleSections.findIndex((s) => s.key === activeSection)
  const progress = visibleSections.length > 0 ? Math.round(((activeIndex + 1) / visibleSections.length) * 100) : 0

  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col shrink-0 h-full">
      <div className="p-4 border-b border-slate-100">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Sections</h2>
        <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {visibleSections.map((section) => {
          const isActive = section.key === activeSection
          return (
            <button
              key={section.key}
              type="button"
              onClick={() => onSelect(section.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className={isActive ? 'text-blue-600' : 'text-slate-500'}>
                <Icon name={section.icon as any} size={18} />
              </span>
              <span className="flex-1">{section.label}</span>
              <Icon name="gripVertical" size={14} className="text-slate-300 opacity-0 group-hover:opacity-100" />
            </button>
          )
        })}

        <button
          type="button"
          onClick={onAddSection}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors mt-2"
        >
          <span className="text-slate-500">
            <Icon name="plus" size={18} />
          </span>
          <span className="flex-1">Additional section</span>
        </button>
      </nav>
    </aside>
  )
}
