import { Icon } from './Icon'
import { additionalSections } from '../data/sections'

interface AdditionalSectionPickerProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (key: string, title?: string) => void
  existingSections: string[]
}

export function AdditionalSectionPicker({ isOpen, onClose, onAdd, existingSections }: AdditionalSectionPickerProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Additional section</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Add extra sections only if they are relevant to the role you are targeting.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Icon name="x" size={18} />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {additionalSections.map((section) => {
            const isAdded = existingSections.includes(section.key)
            return (
              <button
                key={section.key}
                type="button"
                onClick={() => !isAdded && onAdd(section.key)}
                disabled={isAdded}
                className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                  isAdded
                    ? 'bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed'
                    : 'bg-slate-50 border-slate-100 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isAdded ? 'bg-slate-200 text-slate-500' : 'bg-white text-slate-700 shadow-sm'
                }`}>
                  <Icon name={section.icon as any} size={20} />
                </div>
                <div className="flex-1">
                  <h3 className={`text-sm font-semibold ${isAdded ? 'text-slate-500' : 'text-slate-900'}`}>
                    {section.label}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{section.description}</p>
                </div>
                {isAdded ? (
                  <Icon name="check" size={18} className="text-slate-400" />
                ) : (
                  <Icon name="plus" size={18} className="text-slate-400" />
                )}
              </button>
            )
          })}
        </div>

        <div className="px-6 py-4 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  )
}
