import { Icon } from './Icon'
import type { SectionDef } from '../types/cv'
import { useState, useEffect } from 'react'

interface ReorderSectionsModalProps {
  isOpen: boolean
  onClose: () => void
  sections: SectionDef[]
  sectionOrder: string[]
  onReorder: (newOrder: string[]) => void
}

export function ReorderSectionsModal({ isOpen, onClose, sections, sectionOrder, onReorder }: ReorderSectionsModalProps) {
  const [order, setOrder] = useState<string[]>(sectionOrder)

  useEffect(() => {
    if (isOpen) {
      setOrder([...sectionOrder])
    }
  }, [isOpen, sectionOrder])

  if (!isOpen) return null

  const visibleSections = order
    .map((key) => sections.find((s) => s.key === key))
    .filter(Boolean) as SectionDef[]

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= order.length) return
    const newOrder = [...order]
    const [moved] = newOrder.splice(index, 1)
    newOrder.splice(newIndex, 0, moved)
    setOrder(newOrder)
  }

  const handleSave = () => {
    onReorder(order)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Reorder sections</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Icon name="x" size={18} />
          </button>
        </div>

        <div className="p-4 space-y-2 max-h-[60vh] overflow-y-auto">
          {visibleSections.map((section, index) => (
            <div
              key={section.key}
              className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-100 rounded-lg"
            >
              <Icon name="gripVertical" size={16} className="text-slate-400" />
              <Icon name={section.icon as any} size={18} className="text-slate-500" />
              <span className="flex-1 text-sm font-medium text-slate-700">{section.label}</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveItem(index, 'up')}
                  disabled={index === 0}
                  className="p-1.5 text-slate-500 hover:bg-white hover:shadow-sm rounded disabled:opacity-30 transition-colors"
                >
                  <Icon name="chevronUp" size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(index, 'down')}
                  disabled={index === order.length - 1}
                  className="p-1.5 text-slate-500 hover:bg-white hover:shadow-sm rounded disabled:opacity-30 transition-colors"
                >
                  <Icon name="chevronDown" size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Save order
          </button>
        </div>
      </div>
    </div>
  )
}
