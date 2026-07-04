import type { DesignSettings } from '../types/cv'

const templates: { key: DesignSettings['template']; label: string }[] = [
  { key: 'modern', label: 'Modern' },
  { key: 'classic', label: 'Classic' },
  { key: 'minimalist', label: 'Minimalist' },
  { key: 'creative', label: 'Creative' },
  { key: 'executive', label: 'Executive' },
  { key: 'corporate', label: 'Corporate' },
  { key: 'compact', label: 'Compact' },
  { key: 'sidebarLeft', label: 'Sidebar Left' },
  { key: 'magazine', label: 'Magazine' },
  { key: 'elegant', label: 'Elegant' },
  { key: 'bold', label: 'Bold' },
  { key: 'swiss', label: 'Swiss' },
  { key: 'infographic', label: 'Infographic' },
  { key: 'simple', label: 'Simple' },
  { key: 'professional', label: 'Professional' },
  { key: 'dynamic', label: 'Dynamic' },
  { key: 'cards', label: 'Cards' },
  { key: 'centered', label: 'Centered' },
  { key: 'modernDark', label: 'Modern Dark' },
  { key: 'timeline', label: 'Timeline' },
]

const colors = [
  '#1e5359',
  '#2563eb',
  '#7c3aed',
  '#db2777',
  '#dc2626',
  '#ea580c',
  '#16a34a',
  '#0891b2',
  '#4338ca',
  '#171717',
]

interface DesignPanelProps {
  design: DesignSettings
  setDesign: React.Dispatch<React.SetStateAction<DesignSettings>>
}

export function DesignPanel({ design, setDesign }: DesignPanelProps) {
  const update = <K extends keyof DesignSettings>(key: K, value: DesignSettings[K]) => {
    setDesign((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 min-w-0">
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-2xl mx-auto space-y-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Design</h1>
            <p className="text-slate-500">Customize the look and feel of your resume.</p>
          </div>

          {/* Template */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Template</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {templates.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => update('template', t.key)}
                  className={`px-3 py-2.5 text-sm font-medium rounded-lg border transition-colors text-left ${
                    design.template === t.key
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </section>

          {/* Color */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Primary color</h2>
            <div className="flex flex-wrap gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => update('primaryColor', color)}
                  className={`w-10 h-10 rounded-full border-2 transition-transform ${
                    design.primaryColor === color ? 'border-slate-900 scale-110' : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
              <input
                type="color"
                value={design.primaryColor}
                onChange={(e) => update('primaryColor', e.target.value)}
                className="w-10 h-10 p-0 border-0 rounded-full overflow-hidden cursor-pointer"
                title="Custom color"
              />
            </div>
          </section>

          {/* Typography */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Typography</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="editor-label">Font family</label>
                <select
                  value={design.fontFamily}
                  onChange={(e) => update('fontFamily', e.target.value as DesignSettings['fontFamily'])}
                  className="editor-input"
                >
                  <option value="inter">Inter / Sans</option>
                  <option value="playfair">Playfair / Serif</option>
                  <option value="georgia">Georgia / Serif</option>
                </select>
              </div>
              <div>
                <label className="editor-label">Font size</label>
                <select
                  value={design.fontSize}
                  onChange={(e) => update('fontSize', e.target.value as DesignSettings['fontSize'])}
                  className="editor-input"
                >
                  <option value="small">Small</option>
                  <option value="normal">Normal</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>
          </section>

          {/* Layout */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Layout</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="editor-label">Spacing</label>
                <select
                  value={design.spacing}
                  onChange={(e) => update('spacing', e.target.value as DesignSettings['spacing'])}
                  className="editor-input"
                >
                  <option value="compact">Compact</option>
                  <option value="normal">Normal</option>
                  <option value="spacious">Spacious</option>
                </select>
              </div>
              <div>
                <label className="editor-label">Page size</label>
                <select
                  value={design.pageSize}
                  onChange={(e) => update('pageSize', e.target.value as DesignSettings['pageSize'])}
                  className="editor-input"
                >
                  <option value="A4">A4</option>
                  <option value="Letter">Letter</option>
                  <option value="Legal">Legal</option>
                </select>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
