import { useState, useRef, useMemo, useEffect } from 'react'
import type { CVData, DesignSettings } from '../types/cv'
import { ModernTemplate } from '../templates/ModernTemplate'
import { ClassicTemplate } from '../templates/ClassicTemplate'
import { MinimalistTemplate } from '../templates/MinimalistTemplate'
import { CreativeTemplate } from '../templates/CreativeTemplate'
import {
  ExecutiveTemplate,
  CorporateTemplate,
  CompactTemplate,
  SidebarLeftTemplate,
  MagazineTemplate,
  ElegantTemplate,
  BoldTemplate,
  SwissTemplate,
  InfographicTemplate,
  SimpleTemplate,
  ProfessionalTemplate,
  DynamicTemplate,
  CardsTemplate,
  CenteredTemplate,
  ModernDarkTemplate,
  TimelineTemplate,
} from '../templates/AdditionalTemplates'
import { Icon } from './Icon'

interface PreviewPanelProps {
  cv: CVData
  design: DesignSettings
}

const pageSizeMap: Record<DesignSettings['pageSize'], { width: string; height: string; pxHeight: number }> = {
  A4: { width: '210mm', height: '297mm', pxHeight: 1123 },
  Letter: { width: '8.5in', height: '11in', pxHeight: 1056 },
  Legal: { width: '8.5in', height: '14in', pxHeight: 1344 },
}

function getPageHeightPx(pageSize: DesignSettings['pageSize']): number {
  return pageSizeMap[pageSize].pxHeight
}

export function PreviewPanel({ cv, design }: PreviewPanelProps) {
  const [scale, setScale] = useState(0.75)
  const [pageCount, setPageCount] = useState(1)
  const previewRef = useRef<HTMLDivElement>(null)

  const dynamicStyles = useMemo(() => {
    const { width, height } = pageSizeMap[design.pageSize]
    return `
      :root {
        --page-width: ${width};
        --page-height: ${height};
        --page-size: ${design.pageSize};
      }
      @media print {
        @page {
          size: ${design.pageSize};
          margin: 0;
        }
      }
    `
  }, [design.pageSize])

  useEffect(() => {
    const measure = () => {
      const pageElement = previewRef.current?.querySelector('.cv-page') as HTMLElement | null
      if (!pageElement) return
      const pageHeight = getPageHeightPx(design.pageSize)
      const contentHeight = pageElement.scrollHeight
      const count = Math.max(1, Math.ceil(contentHeight / pageHeight))
      setPageCount(count)
    }
    measure()
    const timeout = setTimeout(measure, 300)
    return () => clearTimeout(timeout)
  }, [cv, design, scale])

  const renderTemplate = () => {
    switch (design.template) {
      case 'classic':
        return <ClassicTemplate cv={cv} design={design} />
      case 'minimalist':
        return <MinimalistTemplate cv={cv} design={design} />
      case 'creative':
        return <CreativeTemplate cv={cv} design={design} />
      case 'executive':
        return <ExecutiveTemplate cv={cv} design={design} />
      case 'corporate':
        return <CorporateTemplate cv={cv} design={design} />
      case 'compact':
        return <CompactTemplate cv={cv} design={design} />
      case 'sidebarLeft':
        return <SidebarLeftTemplate cv={cv} design={design} />
      case 'magazine':
        return <MagazineTemplate cv={cv} design={design} />
      case 'elegant':
        return <ElegantTemplate cv={cv} design={design} />
      case 'bold':
        return <BoldTemplate cv={cv} design={design} />
      case 'swiss':
        return <SwissTemplate cv={cv} design={design} />
      case 'infographic':
        return <InfographicTemplate cv={cv} design={design} />
      case 'simple':
        return <SimpleTemplate cv={cv} design={design} />
      case 'professional':
        return <ProfessionalTemplate cv={cv} design={design} />
      case 'dynamic':
        return <DynamicTemplate cv={cv} design={design} />
      case 'cards':
        return <CardsTemplate cv={cv} design={design} />
      case 'centered':
        return <CenteredTemplate cv={cv} design={design} />
      case 'modernDark':
        return <ModernDarkTemplate cv={cv} design={design} />
      case 'timeline':
        return <TimelineTemplate cv={cv} design={design} />
      case 'modern':
      default:
        return <ModernTemplate cv={cv} design={design} />
    }
  }

  return (
    <div className="preview-panel flex-1 flex flex-col h-full bg-slate-100/50 min-w-0">
      <style>{dynamicStyles}</style>
      {/* Top toolbar */}
      <div className="top-toolbar flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 no-print">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-700">Preview</span>
          <span className="text-[10px] text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded">{design.pageSize}</span>
          {pageCount > 1 && (
            <span className="text-[10px] px-1.5 py-0.5 bg-red-50 text-red-600 rounded whitespace-nowrap font-medium border border-red-100">
              {pageCount} pages
            </span>
          )}
          {pageCount === 1 && (
            <span className="text-[10px] px-1.5 py-0.5 bg-green-50 text-green-600 rounded whitespace-nowrap font-medium border border-green-100">
              1 page
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setScale((s) => Math.max(0.4, s - 0.1))}
            className="btn-secondary px-2"
            title="Zoom out"
          >
            <Icon name="zoomOut" size={16} />
          </button>
          <span className="text-xs text-slate-500 w-12 text-center">{Math.round(scale * 100)}%</span>
          <button
            type="button"
            onClick={() => setScale((s) => Math.min(1.2, s + 0.1))}
            className="btn-secondary px-2"
            title="Zoom in"
          >
            <Icon name="zoomIn" size={16} />
          </button>
        </div>
      </div>

      {/* Preview scroll area */}
      <div ref={previewRef} className="flex-1 overflow-auto p-8 flex justify-center no-print">
        <div
          className="origin-top transition-transform duration-200"
          style={{ transform: `scale(${scale})` }}
        >
          <div className="relative z-10">
            {renderTemplate()}
          </div>
          {pageCount > 1 &&
            Array.from({ length: pageCount - 1 }).map((_, index) => (
              <div
                key={index}
                className="absolute left-0 right-0 pointer-events-none"
                style={{
                  top: `${getPageHeightPx(design.pageSize) * (index + 1)}px`,
                  zIndex: 0,
                  marginTop: '-1px',
                  left: '-8px',
                  right: '-8px',
                }}
              >
                <div className="border-t border-dashed border-red-300 opacity-70" />
                <span className="absolute right-2 -top-2 text-[9px] text-red-500 font-medium bg-red-50 px-1.5 py-0.5 rounded border border-red-100 whitespace-nowrap shadow-sm">
                  End page {index + 1}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Print-only area */}
      <div className="print-only hidden">
        {renderTemplate()}
      </div>
    </div>
  )
}
