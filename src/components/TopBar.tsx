import { useState, useRef, useEffect } from 'react'
import { Icon } from './Icon'

interface TopBarProps {
  activeTab: 'write' | 'design' | 'improve'
  onTabChange: (tab: 'write' | 'design' | 'improve') => void
  progress: number
  onDownload: () => void
  onPrint: () => void
  isGenerating: boolean
  onReset: () => void
  onExport: () => void
  onImport: (data: string) => void
}

export function TopBar({
  activeTab,
  onTabChange,
  progress,
  onDownload,
  onPrint,
  isGenerating,
  onReset,
  onExport,
  onImport,
}: TopBarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleImportClick = () => {
    fileInputRef.current?.click()
    setMenuOpen(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      onImport(content)
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 shrink-0 z-20">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
          <Icon name="fileText" size={18} />
        </div>
        <span className="font-bold text-slate-800 hidden sm:inline">CV Builder</span>
      </div>

      {/* Center: Tabs */}
      <nav className="flex items-center bg-slate-100 rounded-lg p-1">
        <button
          type="button"
          onClick={() => onTabChange('write')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'write'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Icon name="penLine" size={16} />
          Write
        </button>
        <button
          type="button"
          onClick={() => onTabChange('design')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'design'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Icon name="palette" size={16} />
          Design
        </button>
        <button
          type="button"
          onClick={() => onTabChange('improve')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'improve'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Icon name="sparkles" size={16} />
          Improve
        </button>
      </nav>

      {/* Right: Progress & Actions */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2">
          <span className="text-2xl">😊</span>
          <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm font-medium text-slate-700">{progress}%</span>
        </div>

        <button
          type="button"
          onClick={onPrint}
          className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <Icon name="printer" size={16} />
          Print
        </button>

        <button
          type="button"
          onClick={onDownload}
          disabled={isGenerating}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-colors shadow-sm"
        >
          <Icon name="download" size={16} />
          {isGenerating ? 'Generating...' : 'Download'}
        </button>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
            title="More actions"
          >
            <Icon name="moreHorizontal" size={20} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-50">
              <button
                type="button"
                onClick={() => {
                  onExport()
                  setMenuOpen(false)
                }}
                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <Icon name="upload" size={16} />
                Export JSON
              </button>
              <button
                type="button"
                onClick={handleImportClick}
                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <Icon name="download" size={16} />
                Import JSON
              </button>
              <div className="border-t border-slate-100 my-1" />
              <button
                type="button"
                onClick={() => {
                  onReset()
                  setMenuOpen(false)
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <Icon name="rotateCcw" size={16} />
                Reset
              </button>
            </div>
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />
    </header>
  )
}
