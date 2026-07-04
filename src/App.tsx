import { useState, useEffect, useCallback, useMemo } from 'react'
import type { CVData, DesignSettings, AppState, SectionDef } from './types/cv'
import { defaultCVData, defaultDesignSettings } from './data/defaultData'
import { baseSections, additionalSections } from './data/sections'
import { TopBar } from './components/TopBar'
import { SectionSidebar } from './components/SectionSidebar'
import { SectionEditor } from './components/SectionEditor'
import { PreviewPanel } from './components/PreviewPanel'
import { DesignPanel } from './components/DesignPanel'
import { ImprovePanel } from './components/ImprovePanel'
import { ReorderSectionsModal } from './components/ReorderSectionsModal'
import { AdditionalSectionPicker } from './components/AdditionalSectionPicker'
import { generateId } from './utils/helpers'
import html2pdf from 'html2pdf.js'
import './App.css'

const STORAGE_KEY = 'editor-curriculo-data-v3'

function loadState(): AppState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved) as AppState
      return {
        cv: { ...defaultCVData, ...parsed.cv },
        design: { ...defaultDesignSettings, ...parsed.design },
      }
    }
  } catch {
    // ignore parse errors
  }
  return { cv: defaultCVData, design: defaultDesignSettings }
}

function saveState(state: AppState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore storage errors
  }
}

export default function App() {
  const [state, setState] = useState<AppState>(loadState)
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState<'write' | 'design' | 'improve'>('write')
  const [activeSection, setActiveSection] = useState<string>('personal')
  const [isReorderOpen, setIsReorderOpen] = useState(false)
  const [isAdditionalOpen, setIsAdditionalOpen] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      saveState(state)
    }
  }, [state, isLoaded])

  useEffect(() => {
    if (!state.cv.sectionOrder.includes(activeSection)) {
      setActiveSection(state.cv.sectionOrder[0] || 'personal')
    }
  }, [state.cv.sectionOrder, activeSection])

  const setCv = useCallback((updater: React.SetStateAction<CVData>) => {
    setState((prev) => ({
      ...prev,
      cv: typeof updater === 'function' ? updater(prev.cv) : updater,
    }))
  }, [])

  const setDesign = useCallback((updater: React.SetStateAction<DesignSettings>) => {
    setState((prev) => ({
      ...prev,
      design: typeof updater === 'function' ? updater(prev.design) : updater,
    }))
  }, [])

  const handleReset = useCallback(() => {
    if (confirm('Are you sure you want to reset your resume to the default data? Unsaved changes will be lost.')) {
      setState({ cv: defaultCVData, design: defaultDesignSettings })
      setActiveSection('personal')
    }
  }, [])

  const handleExport = useCallback(() => {
    const dataStr = JSON.stringify(state, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `resume-${state.cv.personalInfo.firstName.toLowerCase()}-${state.cv.personalInfo.lastName.toLowerCase()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, [state])

  const handleImport = useCallback((data: string) => {
    try {
      const parsed = JSON.parse(data) as AppState
      if (!parsed.cv || !parsed.design) {
        throw new Error('Invalid format')
      }
      setState({
        cv: { ...defaultCVData, ...parsed.cv },
        design: { ...defaultDesignSettings, ...parsed.design },
      })
      setActiveSection('personal')
      alert('Resume imported successfully.')
    } catch {
      alert('Import error: the file format is not correct.')
    }
  }, [])

  const visibleSections = useMemo<SectionDef[]>(() => {
    const baseMap = new Map(baseSections.map((s) => [s.key, s]))
    const additionalMap = new Map(additionalSections.map((s) => [s.key, s]))
    return state.cv.sectionOrder
      .map((key) => {
        if (baseMap.has(key)) return baseMap.get(key)!
        if (additionalMap.has(key)) return additionalMap.get(key)!
        const custom = state.cv.customSections.find((s) => s.key === key)
        if (custom) {
          return { key, label: custom.title, icon: 'fileText', description: '' } as SectionDef
        }
        return null
      })
      .filter(Boolean) as SectionDef[]
  }, [state.cv.sectionOrder, state.cv.customSections])

  const progress = useMemo(() => {
    const p = state.cv.personalInfo
    const required = [
      p.firstName,
      p.lastName,
      p.title,
      p.email,
      p.phone,
      p.location,
      p.summary,
    ]
    const filled = required.filter((v) => v && v.trim().length > 0).length
    const bonus = (state.cv.experiences.length > 0 ? 1 : 0) + (state.cv.education.length > 0 ? 1 : 0)
    return Math.min(100, Math.round(((filled + bonus) / 9) * 100))
  }, [state.cv])

  const handleAddSection = useCallback(
    (key: string) => {
      if (key === 'custom') {
        const newKey = `custom-${generateId()}`
        setCv((prev) => ({
          ...prev,
          sectionOrder: [...prev.sectionOrder, newKey],
          customSections: [
            ...prev.customSections,
            { id: generateId(), key: newKey, title: 'Custom section', items: [] },
          ],
        }))
        setActiveSection(newKey)
      } else if (!state.cv.sectionOrder.includes(key)) {
        setCv((prev) => ({ ...prev, sectionOrder: [...prev.sectionOrder, key] }))
        setActiveSection(key)
      }
      setIsAdditionalOpen(false)
    },
    [setCv, state.cv.sectionOrder]
  )

  const handleReorder = useCallback(
    (newOrder: string[]) => {
      setCv((prev) => ({ ...prev, sectionOrder: newOrder }))
    },
    [setCv]
  )

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  const handleDownloadPDF = useCallback(async () => {
    setIsGenerating(true)
    let wrapper: HTMLDivElement | null = null
    try {
      const element = document.querySelector('.cv-page') as HTMLElement
      if (!element) {
        alert('No resume found to download.')
        return
      }

      const clone = element.cloneNode(true) as HTMLElement
      clone.style.transform = 'none'
      clone.style.margin = '0 auto'
      clone.style.boxShadow = 'none'

      wrapper = document.createElement('div')
      wrapper.style.position = 'fixed'
      wrapper.style.top = '0'
      wrapper.style.left = '0'
      wrapper.style.width = '100%'
      wrapper.style.height = '100%'
      wrapper.style.opacity = '0'
      wrapper.style.pointerEvents = 'none'
      wrapper.style.zIndex = '-9999'
      wrapper.style.overflow = 'auto'
      wrapper.appendChild(clone)
      document.body.appendChild(wrapper)

      await new Promise((resolve) => requestAnimationFrame(resolve))

      const format = state.design.pageSize.toLowerCase()
      const filename = `resume-${state.cv.personalInfo.firstName.toLowerCase()}-${state.cv.personalInfo.lastName.toLowerCase()}.pdf`

      const opt = {
        margin: 0,
        filename,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          windowWidth: 794,
        },
        jsPDF: {
          unit: 'mm',
          format,
          orientation: 'portrait' as const,
        },
        pagebreak: {
          mode: ['css', 'legacy'] as const,
          before: [],
          after: [],
          avoid: ['section', 'h1', 'h2', 'h3', 'li', '.cv-page'],
        },
      }

      await html2pdf().set(opt).from(clone).save()
    } catch (error) {
      console.error('PDF generation error:', error)
      alert('Error generating PDF. Try using Print as an alternative.')
    } finally {
      if (wrapper && wrapper.parentNode) {
        document.body.removeChild(wrapper)
      }
      setIsGenerating(false)
    }
  }, [state.cv.personalInfo, state.design.pageSize])

  const activeIndex = visibleSections.findIndex((s) => s.key === activeSection)
  const handleNext = useCallback(() => {
    if (activeIndex < visibleSections.length - 1) {
      setActiveSection(visibleSections[activeIndex + 1].key)
    }
  }, [activeIndex, visibleSections])
  const handleBack = useCallback(() => {
    if (activeIndex > 0) {
      setActiveSection(visibleSections[activeIndex - 1].key)
    }
  }, [activeIndex, visibleSections])

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500">
        Loading editor...
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50">
      <TopBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        progress={progress}
        onDownload={handleDownloadPDF}
        onPrint={handlePrint}
        isGenerating={isGenerating}
        onReset={handleReset}
        onExport={handleExport}
        onImport={handleImport}
      />

      <div className="flex-1 flex overflow-hidden">
        {activeTab === 'write' && (
          <>
            <SectionSidebar
              sections={visibleSections}
              activeSection={activeSection}
              onSelect={setActiveSection}
              onAddSection={() => setIsAdditionalOpen(true)}
              sectionOrder={state.cv.sectionOrder}
            />
            <SectionEditor
              cv={state.cv}
              setCv={setCv}
              activeSection={activeSection}
              sections={visibleSections}
              onNext={handleNext}
              onBack={handleBack}
              onOpenReorder={() => setIsReorderOpen(true)}
            />
          </>
        )}

        {activeTab === 'design' && (
          <DesignPanel design={state.design} setDesign={setDesign} />
        )}

        {activeTab === 'improve' && <ImprovePanel cv={state.cv} />}

        <PreviewPanel cv={state.cv} design={state.design} />
      </div>

      <ReorderSectionsModal
        isOpen={isReorderOpen}
        onClose={() => setIsReorderOpen(false)}
        sections={visibleSections}
        sectionOrder={state.cv.sectionOrder}
        onReorder={handleReorder}
      />

      <AdditionalSectionPicker
        isOpen={isAdditionalOpen}
        onClose={() => setIsAdditionalOpen(false)}
        onAdd={handleAddSection}
        existingSections={state.cv.sectionOrder}
      />
    </div>
  )
}
